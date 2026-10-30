"use client";

import React, { useState, useEffect } from "react";
import { Ga4EventPayload } from "@/types/tracking.type";

export default function DataLayerInspector() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [events, setEvents] = useState<Ga4EventPayload[]>([]);
  const [selectedEventIndex, setSelectedEventIndex] = useState<number | null>(null);

  useEffect(() => {
    const handleUpdate = () => {
      if (typeof window !== "undefined" && Array.isArray(window.dataLayer)) {
        const gaEvents = (window.dataLayer as Ga4EventPayload[]).filter(
          (item) => item && typeof item === "object" && typeof item.event === "string"
        );
        setEvents([...gaEvents]);
      }
    };

    handleUpdate();
    window.addEventListener("ga4_datalayer_change", handleUpdate);
    return () => window.removeEventListener("ga4_datalayer_change", handleUpdate);
  }, []);

  const handleToggleOpen = () => {
    setIsOpen((prev) => !prev);
    if (!isOpen && events.length > 0) {
      setSelectedEventIndex(events.length - 1);
    }
  };

  const handleSelectEvent = (index: number) => {
    setSelectedEventIndex(index);
  };

  const handleClearEvents = () => {
    if (typeof window !== "undefined") {
      window.dataLayer = [];
      setEvents([]);
      setSelectedEventIndex(null);
    }
  };

  return (
    <div className="fixed bottom-6 left-6 z-50 font-sans">
      {!isOpen ? (
        <button
          type="button"
          onClick={handleToggleOpen}
          aria-label="Buka GA4 DataLayer Inspector"
          className="flex items-center gap-2 px-3.5 py-2 rounded-full bg-zinc-900/90 hover:bg-zinc-900 text-white text-xs font-bold shadow-xl backdrop-blur-md border border-white/15 transition-transform active:scale-95"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>GA4 dataLayer</span>
          <span className="px-1.5 py-0.2 rounded-full bg-blue-600 text-white text-[10px]">
            {events.length}
          </span>
        </button>
      ) : (
        <div className="w-[340px] sm:w-[420px] max-h-[500px] rounded-2xl bg-zinc-950/95 text-white border border-white/20 shadow-2xl flex flex-col overflow-hidden backdrop-blur-xl animate-in fade-in slide-in-from-bottom-2">
          <div className="p-3.5 border-b border-white/10 flex items-center justify-between bg-white/5">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <h4 className="text-xs font-black uppercase tracking-wider text-white">
                GA4 dataLayer Inspector
              </h4>
              <span className="text-[10px] bg-blue-600/60 px-1.5 py-0.5 rounded text-white font-mono">
                {events.length} event
              </span>
            </div>
            <div className="flex items-center gap-2">
              {events.length > 0 && (
                <button
                  type="button"
                  onClick={handleClearEvents}
                  className="text-[10px] text-zinc-400 hover:text-white transition-colors"
                >
                  Clear
                </button>
              )}
              <button
                type="button"
                onClick={handleToggleOpen}
                aria-label="Tutup inspector"
                className="text-zinc-400 hover:text-white p-1 rounded-md transition-colors"
              >
                ✕
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-hidden grid grid-cols-12 min-h-[260px] max-h-[380px]">
            <div className="col-span-5 border-r border-white/10 overflow-y-auto p-2 space-y-1">
              {events.length === 0 ? (
                <div className="py-8 text-center text-[11px] text-zinc-500">
                  Belum ada event terkirim
                </div>
              ) : (
                events.map((ev, idx) => {
                  const isSelected = selectedEventIndex === idx;
                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleSelectEvent(idx)}
                      className={`w-full text-left p-2 rounded-lg text-xs transition-colors truncate block ${
                        isSelected
                          ? "bg-blue-600 text-white font-bold"
                          : "hover:bg-white/10 text-zinc-300"
                      }`}
                    >
                      <div className="flex items-center gap-1.5">
                        <span className="text-[10px] opacity-70 font-mono">#{idx + 1}</span>
                        <span className="truncate">{ev.event}</span>
                      </div>
                    </button>
                  );
                })
              )}
            </div>

            <div className="col-span-7 p-3 overflow-y-auto bg-black/40">
              {selectedEventIndex !== null && events[selectedEventIndex] ? (
                <div className="space-y-2">
                  <div className="flex items-center justify-between pb-1.5 border-b border-white/10">
                    <span className="text-[10px] uppercase font-bold text-emerald-400">
                      Event: {events[selectedEventIndex].event}
                    </span>
                    <span className="text-[10px] text-zinc-400 font-mono">
                      #{selectedEventIndex + 1}
                    </span>
                  </div>
                  <pre className="text-[10px] font-mono text-zinc-300 whitespace-pre-wrap leading-tight break-all">
                    {JSON.stringify(events[selectedEventIndex], null, 2)}
                  </pre>
                </div>
              ) : (
                <div className="h-full flex items-center justify-center text-center text-xs text-zinc-500">
                  Pilih event di samping untuk melihat payload GA4
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
