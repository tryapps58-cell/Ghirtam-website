import { createClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";

import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

// Service role client — bypasses RLS so we can write orders if needed
function getAdminClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { autoRefreshToken: false, persistSession: false } }
  );
}

function generateOrderNumber(): string {
  const date = new Date();
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  const random = Math.floor(1000 + Math.random() * 9000);
  return `GHR-${y}${m}${d}-${random}`;
}

export async function POST(request: NextRequest) {
  try {
    const cookieStore = await cookies();
    const authClient = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return cookieStore.getAll();
          },
        },
      }
    );

    const { data: { user } } = await authClient.auth.getUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized. You must be logged in to place an order." }, { status: 401 });
    }

    const body = await request.json();
    const { items, address, payment_method, subtotal, shipping_fee, total } = body;

    // Validate required fields
    if (!items?.length || !address || !payment_method) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const supabase = getAdminClient();
    const orderNumber = generateOrderNumber();

    // Insert order
    const { data: order, error: orderError } = await supabase
      .from("orders")
      .insert({
        order_number: orderNumber,
        user_id: user.id,
        payment_method,
        payment_status: payment_method === "cod" ? "unpaid" : "pending",
        status: "confirmed",
        subtotal,
        shipping_fee,
        total,
        shipping_address: address,
        currency: "INR",
      })
      .select()
      .single();

    if (orderError) {
      console.error("Order insert error:", orderError);
      return NextResponse.json({ error: orderError.message }, { status: 500 });
    }

    // Insert order items
    const orderItems = items.map((item: {
      product: { slug: string; name: string; images: string[] };
      variant: { sku: string; size: string; price: number };
      quantity: number;
    }) => ({
      order_id: order.id,
      product_id: item.product.slug,
      product_name: item.product.name,
      variant_size: item.variant.size,
      sku: item.variant.sku,
      quantity: item.quantity,
      unit_price: item.variant.price,
      total_price: item.variant.price * item.quantity,
      image_url: item.product.images[0] ?? null,
    }));

    const { error: itemsError } = await supabase.from("order_items").insert(orderItems);

    if (itemsError) {
      console.error("Order items insert error:", itemsError);
      // Order was created — still return success but log the items failure
    }

    return NextResponse.json({ orderNumber, orderId: order.id }, { status: 201 });
  } catch (err) {
    console.error("Checkout API error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
