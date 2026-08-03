"use client";

import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const BUKAVU_POSITION: [number, number] = [-2.5083, 28.8608];

const bukavuIcon = L.divIcon({
  className: "",
  html: `
    <svg width="30" height="42" viewBox="0 0 30 42" xmlns="http://www.w3.org/2000/svg">
      <path d="M15 0C6.716 0 0 6.716 0 15c0 11.25 15 27 15 27s15-15.75 15-27C30 6.716 23.284 0 15 0z" fill="#0B3558"/>
      <circle cx="15" cy="15" r="6.5" fill="#F2B705"/>
    </svg>
  `,
  iconSize: [30, 42],
  iconAnchor: [15, 42],
  popupAnchor: [0, -38]
});

type ZonesMapProps = {
  zoom?: number;
  popupText?: string;
};

export function ZonesMap({
  zoom = 7,
  popupText = "DDC RDC — Siège social, Bukavu, Sud-Kivu"
}: ZonesMapProps) {
  return (
    <MapContainer
      center={BUKAVU_POSITION}
      zoom={zoom}
      scrollWheelZoom={false}
      className="h-[300px] w-full rounded-lg sm:h-[400px]"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={BUKAVU_POSITION} icon={bukavuIcon}>
        <Popup>{popupText}</Popup>
      </Marker>
    </MapContainer>
  );
}
