'use client'

import { useState } from "react";

interface Tab {
  id: string;
  label: string;
  content: React.ReactNode;
}

interface ProductTabsProps {
  tabs: Tab[];
}

export default function ProductTabs({ tabs }: ProductTabsProps) {
  const [active, setActive] = useState(tabs[0].id);
  const activeTab = tabs.find((t) => t.id === active)!;

  return (
    <div>
      {/* Tab nav */}
      <div className="flex border-b border-outline-variant/40 overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            id={`tab-${tab.id}`}
            onClick={() => setActive(tab.id)}
            role="tab"
            aria-selected={active === tab.id}
            aria-controls={`panel-${tab.id}`}
            className={`px-6 py-4 font-body text-label-md tracking-widest uppercase whitespace-nowrap border-b-2 transition-all duration-200 ${
              active === tab.id
                ? "border-sacred-gold text-sacred-gold"
                : "border-transparent text-on-surface-variant hover:text-on-surface"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab panel */}
      <div
        id={`panel-${active}`}
        role="tabpanel"
        className="py-8 font-body text-body-md text-on-surface-variant leading-relaxed"
      >
        {activeTab.content}
      </div>
    </div>
  );
}
