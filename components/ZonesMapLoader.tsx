"use client";

import dynamic from "next/dynamic";

const ZonesMap = dynamic(() => import("@/components/ZonesMap").then((mod) => mod.ZonesMap), {
  ssr: false,
  loading: () => (
    <div className="flex h-[300px] w-full items-center justify-center rounded-lg bg-brand-mist sm:h-[400px]">
      <p className="text-sm font-semibold text-slate-500">Chargement de la carte…</p>
    </div>
  )
});

export function ZonesMapLoader() {
  return <ZonesMap />;
}
