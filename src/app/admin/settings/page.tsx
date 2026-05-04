'use client';

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";

export default function SettingsPage() {
  const supabase = createClient();
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState("");

  const [form, setForm] = useState({
    announcements: [
      { text: "", link: "" },
      { text: "", link: "" },
      { text: "", link: "" }
    ],
    announcement_active: true,
  });

  useEffect(() => {
    fetchSettings();
  }, []);

  async function fetchSettings() {
    const { data } = await supabase.from("settings").select("*").eq("id", 1).single();
    if (data) {
      let messages = [{ text: "", link: "" }];
      try {
        if (data.announcement_text && data.announcement_text.startsWith("[")) {
          messages = JSON.parse(data.announcement_text);
        } else if (data.announcement_text) {
          messages = [{ text: data.announcement_text, link: data.announcement_link || "" }];
        }
      } catch (e) {
        messages = [{ text: data.announcement_text, link: data.announcement_link || "" }];
      }
      
      // Ensure we have exactly 3 slots for the UI
      while (messages.length < 3) messages.push({ text: "", link: "" });
      if (messages.length > 3) messages = messages.slice(0, 3);

      setForm({
        announcements: messages,
        announcement_active: data.announcement_active,
      });
    }
    setIsLoading(false);
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setForm((f) => ({ ...f, [name]: type === "checkbox" ? checked : value }));
  };

  const handleAnnouncementChange = (index: number, field: 'text' | 'link', value: string) => {
    const newAnnouncements = [...form.announcements];
    newAnnouncements[index][field] = value;
    setForm(f => ({ ...f, announcements: newAnnouncements }));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setMessage("");

    // Filter out empty messages
    const validMessages = form.announcements.filter(a => a.text.trim() !== "");
    const jsonString = JSON.stringify(validMessages);

    const { error } = await supabase
      .from("settings")
      .update({
        announcement_text: validMessages.length > 0 ? jsonString : "",
        announcement_link: "", // Legacy column, no longer directly used
        announcement_active: form.announcement_active,
      })
      .eq("id", 1);

    setIsSaving(false);
    if (error) {
      setMessage("❌ Failed to update settings.");
    } else {
      setMessage("✅ Settings updated successfully!");
      setTimeout(() => setMessage(""), 3000);
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-headline-lg text-on-background">Store Settings</h1>
        <p className="font-body text-body-md text-on-surface-variant mt-2">Manage global configurations and announcements.</p>
      </div>

      {isLoading ? (
        <div className="py-20 text-center">Loading settings...</div>
      ) : (
        <div className="bg-white border border-outline-variant/40 p-8 rounded shadow-sm max-w-2xl">
          <h2 className="font-display text-2xl text-on-background mb-6 border-b border-outline-variant/30 pb-4">Announcement Bar</h2>
          
          {message && (
            <div className={`mb-6 p-4 font-body text-sm border ${message.includes("❌") ? "border-error/40 bg-error-container/30 text-on-error-container" : "border-forest-sage/40 bg-forest-sage/10 text-forest-sage"}`}>
              {message}
            </div>
          )}

          <form onSubmit={handleSave} className="space-y-6">
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="announcement_active"
                name="announcement_active"
                checked={form.announcement_active}
                onChange={handleChange}
                className="w-5 h-5 accent-sacred-gold"
              />
              <label htmlFor="announcement_active" className="font-body font-bold text-on-background">
                Enable Announcement Bar
              </label>
            </div>

            {form.announcements.map((ann, index) => (
              <div key={index} className="space-y-4 pt-4 border-t border-outline-variant/30">
                <h3 className="font-body font-bold text-on-surface-variant">Message {index + 1}</h3>
                <div>
                  <label className="font-body text-label-sm tracking-widest uppercase text-on-surface-variant block mb-2">
                    Announcement Text
                  </label>
                  <input
                    type="text"
                    value={ann.text}
                    onChange={(e) => handleAnnouncementChange(index, 'text', e.target.value)}
                    placeholder="e.g. Free Shipping on Orders Above ₹999"
                    className="input-brand w-full"
                    required={index === 0 && form.announcement_active}
                  />
                </div>

                <div>
                  <label className="font-body text-label-sm tracking-widest uppercase text-on-surface-variant block mb-2">
                    Link URL (Optional)
                  </label>
                  <input
                    type="text"
                    value={ann.link}
                    onChange={(e) => handleAnnouncementChange(index, 'link', e.target.value)}
                    placeholder="e.g. /shop or https://..."
                    className="input-brand w-full"
                  />
                </div>
              </div>
            ))}

            <div className="pt-4 border-t border-outline-variant/30">
              <button
                type="submit"
                disabled={isSaving}
                className="btn-primary w-full py-4 disabled:opacity-70"
              >
                {isSaving ? "Saving..." : "Save Settings"}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
