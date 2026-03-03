"use client";

import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { Announcement } from "@/lib/types";

const BANNER_KEY = "soc_banner_dismissed_v1";

export default function EventsBanner({
  announcement,
}: {
  announcement: Announcement | null;
}) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!announcement) return;
    const dismissed = localStorage.getItem(BANNER_KEY);
    if (dismissed !== announcement.id) {
      setVisible(true);
    }
  }, [announcement]);

  if (!visible || !announcement) return null;

  function dismiss() {
    localStorage.setItem(BANNER_KEY, announcement!.id);
    setVisible(false);
  }

  return (
    <div className="bg-black text-white font-mono text-sm py-2.5 px-4 flex items-center gap-4 border-b-2 border-black">
      <p className="flex-1 text-center">
        {announcement.message}
        {announcement.cta_url && (
          <a
            href={announcement.cta_url}
            className="ml-2 underline decoration-wavy underline-offset-2 hover:text-yellow-300 transition-colors"
          >
            Learn More →
          </a>
        )}
      </p>
      <button
        onClick={dismiss}
        aria-label="Dismiss banner"
        className="shrink-0 hover:opacity-60 transition-opacity"
      >
        <X size={16} />
      </button>
    </div>
  );
}
