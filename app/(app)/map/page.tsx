"use client";

import { useState } from "react";
import {
  Map as LeafletMap,
  MapTileLayer,
  MapZoomControl,
  MapLayers,
  MapMarker,
  MapPopup,
} from "@/components/ui/map";
import { AddressSearch, type AddressResult } from "@/components/app/maps/AddressSearch";
import { RadiusSelector } from "@/components/app/maps/RadiusSelector";

export default function MapPage() {
  const [selectedAddress, setSelectedAddress] = useState<AddressResult | null>(null);
  const [radius, setRadius] = useState<number>(10);

  // Default center (Pimpri, Maharashtra based on your location)
  const defaultCenter: [number, number] = [18.6298, 73.7997];
  const center: [number, number] = selectedAddress 
    ? [selectedAddress.lat, selectedAddress.lng] 
    : defaultCenter;

  return (
    <div className="flex h-screen flex-col">
      {/* Header with controls */}
      <div className="border-b bg-background p-4">
        <div className="mx-auto max-w-7xl space-y-4">
          <h1 className="text-2xl font-bold">Explore Map</h1>
          
          {/* Address Search */}
          <AddressSearch
            value={selectedAddress}
            onChange={setSelectedAddress}
            placeholder="Search for a location..."
            className="max-w-2xl"
          />

          {/* Radius Selector */}
          <div className="max-w-2xl">
            <label className="mb-2 block text-sm font-medium">
              Search Radius
            </label>
            <RadiusSelector value={radius} onChange={setRadius} />
          </div>
        </div>
      </div>

      {/* Map */}
      <div className="flex-1">
        <MapLayers>
          <LeafletMap center={center} zoom={selectedAddress ? 14 : 12}>
            <MapTileLayer />
            <MapZoomControl />
            
            {/* Show marker if address is selected */}
            {selectedAddress && (
              <MapMarker
                position={[selectedAddress.lat, selectedAddress.lng]}
                icon={
                  <div className="flex h-10 w-10 items-center justify-center rounded-full border-[3px] border-white bg-gradient-to-br from-primary to-primary/80 shadow-lg">
                    <div className="h-3 w-3 rounded-full bg-white" />
                  </div>
                }
                iconAnchor={[20, 20]}
              >
                <MapPopup>
                  <div className="space-y-2">
                    <h3 className="font-semibold">Selected Location</h3>
                    <p className="text-sm text-muted-foreground">
                      {selectedAddress.address}
                    </p>
                    {selectedAddress.city && (
                      <p className="text-xs text-muted-foreground">
                        {selectedAddress.city}
                      </p>
                    )}
                  </div>
                </MapPopup>
              </MapMarker>
            )}
          </LeafletMap>
        </MapLayers>
      </div>
    </div>
  );
}