'use client'

import { useState, useEffect } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

export default function AddressesPage() {
  const router = useRouter();
  const supabase = createClient();
  const [addresses, setAddresses] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    label: "Home",
    full_name: "",
    phone: "",
    line1: "",
    line2: "",
    city: "",
    state: "",
    pincode: "",
  });

  useEffect(() => {
    fetchAddresses();
  }, []);

  async function fetchAddresses() {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      router.push("/account/login");
      return;
    }

    const { data } = await supabase
      .from("addresses")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });

    if (data) setAddresses(data);
    setIsLoading(false);
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    // If it's the first address, make it default
    const is_default = addresses.length === 0;

    const { error } = await supabase.from("addresses").insert({
      ...form,
      user_id: user.id,
      is_default,
    });

    if (!error) {
      setShowForm(false);
      setForm({ label: "Home", full_name: "", phone: "", line1: "", line2: "", city: "", state: "", pincode: "" });
      fetchAddresses();
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this address?")) return;
    await supabase.from("addresses").delete().eq("id", id);
    fetchAddresses();
  };

  return (
    <div className="bg-surface min-h-screen">
      <section className="bg-surface-container py-12 border-b border-outline-variant/30">
        <div className="container-brand flex items-center justify-between">
          <div>
            <p className="font-body text-label-sm tracking-[0.25em] uppercase text-sacred-gold mb-1">My Account</p>
            <h1 className="font-display text-headline-xl text-on-background">Saved Addresses</h1>
          </div>
          <Link href="/account" className="font-body text-label-sm text-on-surface-variant hover:text-sacred-gold transition-colors">
            ← Back to Account
          </Link>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-brand max-w-4xl mx-auto">
          {isLoading ? (
            <div className="text-center py-20">Loading addresses...</div>
          ) : (
            <div className="space-y-8">
              <div className="flex justify-end">
                <button 
                  onClick={() => setShowForm(!showForm)}
                  className="btn-primary px-6 py-3"
                >
                  {showForm ? "Cancel" : "+ Add New Address"}
                </button>
              </div>

              {showForm && (
                <div className="bg-white border border-outline-variant/40 p-8">
                  <h2 className="font-display text-headline-md mb-6">Add New Address</h2>
                  <form onSubmit={handleSave} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="font-body text-label-sm tracking-widest uppercase text-on-surface-variant block mb-2">Label</label>
                        <select name="label" value={form.label} onChange={handleChange} className="input-brand w-full">
                          <option value="Home">Home</option>
                          <option value="Work">Work</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="font-body text-label-sm tracking-widest uppercase text-on-surface-variant block mb-2">Full Name</label>
                        <input name="full_name" value={form.full_name} onChange={handleChange} required className="input-brand w-full" />
                      </div>
                      <div>
                        <label className="font-body text-label-sm tracking-widest uppercase text-on-surface-variant block mb-2">Phone</label>
                        <input name="phone" value={form.phone} onChange={handleChange} required className="input-brand w-full" />
                      </div>
                    </div>
                    <div>
                      <label className="font-body text-label-sm tracking-widest uppercase text-on-surface-variant block mb-2">Address Line 1</label>
                      <input name="line1" value={form.line1} onChange={handleChange} required className="input-brand w-full" />
                    </div>
                    <div>
                      <label className="font-body text-label-sm tracking-widest uppercase text-on-surface-variant block mb-2">Address Line 2</label>
                      <input name="line2" value={form.line2} onChange={handleChange} className="input-brand w-full" />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div>
                        <label className="font-body text-label-sm tracking-widest uppercase text-on-surface-variant block mb-2">City</label>
                        <input name="city" value={form.city} onChange={handleChange} required className="input-brand w-full" />
                      </div>
                      <div>
                        <label className="font-body text-label-sm tracking-widest uppercase text-on-surface-variant block mb-2">State</label>
                        <input name="state" value={form.state} onChange={handleChange} required className="input-brand w-full" />
                      </div>
                      <div>
                        <label className="font-body text-label-sm tracking-widest uppercase text-on-surface-variant block mb-2">Pincode</label>
                        <input name="pincode" value={form.pincode} onChange={handleChange} required className="input-brand w-full" />
                      </div>
                    </div>
                    <button type="submit" className="btn-dark w-full py-4">Save Address</button>
                  </form>
                </div>
              )}

              {addresses.length === 0 && !showForm ? (
                <div className="text-center py-20 bg-white border border-outline-variant/40">
                  <p className="text-4xl mb-4">📍</p>
                  <p className="font-display text-headline-md text-on-background mb-2">No addresses saved</p>
                  <p className="font-body text-body-md text-on-surface-variant">Add an address for faster checkout.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {addresses.map((addr) => (
                    <div key={addr.id} className="bg-white border border-outline-variant/40 p-6 relative">
                      {addr.is_default && (
                        <span className="absolute top-6 right-6 font-body text-[10px] tracking-widest uppercase bg-sacred-gold text-white px-2 py-1 rounded-sm">Default</span>
                      )}
                      <p className="font-body text-label-sm tracking-widest uppercase text-sacred-gold mb-4">{addr.label}</p>
                      <p className="font-body font-bold text-on-background text-lg">{addr.full_name}</p>
                      <p className="font-body text-on-surface-variant mt-2">{addr.line1}</p>
                      {addr.line2 && <p className="font-body text-on-surface-variant">{addr.line2}</p>}
                      <p className="font-body text-on-surface-variant">{addr.city}, {addr.state} {addr.pincode}</p>
                      <p className="font-body text-on-surface-variant mt-2">📞 {addr.phone}</p>
                      
                      <div className="mt-6 pt-4 border-t border-outline-variant/30 flex gap-4">
                        <button onClick={() => handleDelete(addr.id)} className="font-body text-sm text-error hover:underline">Delete</button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
