// Server Component — no 'use client' needed
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

export default async function AnnouncementBar() {
  const supabase = await createClient();
  const { data: settings } = await supabase.from("settings").select("*").eq("id", 1).single();

  if (!settings || !settings.announcement_active || !settings.announcement_text) {
    return null;
  }

  let messages: { text: string, link: string }[] = [];
  try {
    if (settings.announcement_text.startsWith("[")) {
      messages = JSON.parse(settings.announcement_text);
    } else {
      messages = [{ text: settings.announcement_text, link: settings.announcement_link || "" }];
    }
  } catch (e) {
    messages = [{ text: settings.announcement_text, link: settings.announcement_link || "" }];
  }

  if (messages.length === 0) return null;

  // Duplicate the array of messages enough times to cover ultrawide screens
  // We use 4 here so that even with 1 message it covers the screen without stretching too wide (which makes it too fast)
  const repeatedMessages = Array(4).fill(messages).flat();

  const RepeatedContent = () => (
    <div className="flex items-center shrink-0">
      {repeatedMessages.map((item, i) => (
        <div key={i} className="flex items-center">
          {item.link ? (
            <Link href={item.link} className="font-body text-label-md tracking-widest hover:text-sacred-gold transition-colors whitespace-nowrap px-8">
              {item.text}
            </Link>
          ) : (
            <span className="font-body text-label-md tracking-widest whitespace-nowrap px-8">
              {item.text}
            </span>
          )}
          <span className="text-sacred-gold/50 text-[10px]">✦</span>
        </div>
      ))}
    </div>
  );

  return (
    <div
      className="bg-earth-brown text-primary-fixed-dim w-full z-50 relative overflow-hidden flex items-center"
      style={{ height: "40px" }}
      role="banner"
      aria-label="Announcements"
    >
      <div className="flex w-max animate-marquee hover:[animation-play-state:paused] [animation-duration:60s] will-change-transform [transform:translateZ(0)] antialiased">
        <RepeatedContent />
        <RepeatedContent />
      </div>
    </div>
  );
}
