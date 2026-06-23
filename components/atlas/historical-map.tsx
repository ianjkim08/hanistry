"use client";

import "mapbox-gl/dist/mapbox-gl.css";

import { AnimatePresence, motion } from "framer-motion";
import mapboxgl, { type MapLayerMouseEvent } from "mapbox-gl";
import { useEffect, useMemo, useRef, useState } from "react";
import type { Feature } from "geojson";
import { MapPinned } from "lucide-react";
import { getEraFeatureCollection, type Era } from "@/data/history";

type HistoricalMapProps = {
  era: Era;
  selectedStateId: string | null;
  onSelectState: (stateId: string) => void;
};

const sourceId = "hanistry-regions";
const fillLayerId = "hanistry-regions-fill";
const lineLayerId = "hanistry-regions-line";

export function HistoricalMap({ era, selectedStateId, onSelectState }: HistoricalMapProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const popupRef = useRef<mapboxgl.Popup | null>(null);
  const [ready, setReady] = useState(false);
  const [mapFailed, setMapFailed] = useState(false);
  const token = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;
  const collection = useMemo(() => getEraFeatureCollection(era.id), [era.id]);

  useEffect(() => {
    if (!token || !containerRef.current || mapRef.current) return;

    setMapFailed(false);
    setReady(false);
    const loadFallbackTimer = window.setTimeout(() => {
      if (!mapRef.current || !mapRef.current.loaded()) {
        mapRef.current?.remove();
        mapRef.current = null;
        setMapFailed(true);
      }
    }, 5000);

    mapboxgl.accessToken = token;
    const map = new mapboxgl.Map({
      container: containerRef.current,
      style: "mapbox://styles/mapbox/dark-v11",
      center: [127.8, 38.2],
      zoom: 5.2,
      pitch: 18,
      bearing: -8,
      attributionControl: false
    });

    map.addControl(new mapboxgl.NavigationControl({ showCompass: false }), "bottom-right");
    map.addControl(new mapboxgl.AttributionControl({ compact: true }), "bottom-left");
    mapRef.current = map;

    // Mapbox can measure the container too early in responsive layouts.
    // Keep it synced so the canvas fills the full atlas panel after deploy.
    const resizeObserver = new ResizeObserver(() => {
      map.resize();
    });
    resizeObserver.observe(containerRef.current);
    window.requestAnimationFrame(() => map.resize());

    const handleClick = (event: MapLayerMouseEvent) => {
      const feature = event.features?.[0] as Feature | undefined;
      const properties = feature?.properties as { stateId?: string; name?: string; capital?: string; color?: string } | undefined;
      if (!properties?.stateId) return;

      onSelectState(properties.stateId);
      popupRef.current?.remove();
      popupRef.current = new mapboxgl.Popup({ closeButton: false, offset: 18 })
        .setLngLat(event.lngLat)
        .setHTML(
          `<div style="min-width:180px"><strong style="font-size:14px">${properties.name}</strong><p style="margin:6px 0 0;color:rgba(239,246,244,.68);font-size:12px">Capital: ${properties.capital}</p></div>`
        )
        .addTo(map);
    };

    map.on("load", () => {
      map.addSource(sourceId, {
        type: "geojson",
        data: collection
      });

      map.addLayer({
        id: fillLayerId,
        type: "fill",
        source: sourceId,
        paint: {
          "fill-color": ["get", "color"],
          "fill-opacity": 0.36
        }
      });

      map.addLayer({
        id: lineLayerId,
        type: "line",
        source: sourceId,
        paint: {
          "line-color": ["get", "color"],
          "line-opacity": 0.95,
          "line-width": ["case", ["==", ["get", "stateId"], selectedStateId ?? ""], 4, 2]
        }
      });

      window.clearTimeout(loadFallbackTimer);
      map.resize();
      setReady(true);

      // Layer-specific events must be registered only after the layer exists.
      map.on("click", fillLayerId, handleClick);
      map.on("mouseenter", fillLayerId, () => {
        map.getCanvas().style.cursor = "pointer";
      });
      map.on("mouseleave", fillLayerId, () => {
        map.getCanvas().style.cursor = "";
      });
    });

    map.on("error", () => {
      window.clearTimeout(loadFallbackTimer);
      popupRef.current?.remove();
      map.remove();
      mapRef.current = null;
      setMapFailed(true);
    });

    return () => {
      window.clearTimeout(loadFallbackTimer);
      resizeObserver.disconnect();
      popupRef.current?.remove();
      if (mapRef.current === map) {
        map.remove();
        mapRef.current = null;
      }
    };
  }, [collection, onSelectState, selectedStateId, token]);

  useEffect(() => {
    const map = mapRef.current;
    if (!map || !ready) return;

    const source = map.getSource(sourceId) as mapboxgl.GeoJSONSource | undefined;
    source?.setData(collection);
    map.setPaintProperty(lineLayerId, "line-width", ["case", ["==", ["get", "stateId"], selectedStateId ?? ""], 4, 2]);
    popupRef.current?.remove();
  }, [collection, ready, selectedStateId]);

  if (!token || mapFailed) {
    return (
      <FallbackMap
        era={era}
        selectedStateId={selectedStateId}
        onSelectState={onSelectState}
        reason={mapFailed ? "Mapbox could not load. Check your Vercel token, URL restrictions, and redeploy." : undefined}
      />
    );
  }

  return (
    <div className="relative h-[68dvh] min-h-[32rem] min-w-0 w-full overflow-hidden border border-line bg-ink xl:h-[calc(100dvh-7rem)] xl:min-h-[42rem]">
      {!ready ? (
        <div className="absolute inset-0">
          <FallbackMapCanvas era={era} selectedStateId={selectedStateId} onSelectState={onSelectState} />
        </div>
      ) : null}
      <div
        ref={containerRef}
        className={`absolute inset-0 h-full w-full transition-opacity duration-500 ${ready ? "opacity-100" : "pointer-events-none opacity-0"}`}
      />
      <MapOverlay era={era} />
    </div>
  );
}

function MapOverlay({ era }: { era: Era }) {
  return (
    <div className="pointer-events-none absolute left-4 top-4 border border-line bg-ink/90 px-4 py-3 backdrop-blur-md">
      <p className="font-mono text-[0.65rem] uppercase tracking-[0.14em] text-accent">Active layer</p>
      <p className="mt-1 font-display text-2xl text-paper">{era.name}</p>
    </div>
  );
}

function FallbackMap({
  era,
  selectedStateId,
  onSelectState,
  reason
}: {
  era: Era;
  selectedStateId: string | null;
  onSelectState: (stateId: string) => void;
  reason?: string;
}) {
  return (
    <div className="relative h-[68dvh] min-h-[32rem] min-w-0 w-full overflow-hidden border border-line bg-ink xl:h-[calc(100dvh-7rem)] xl:min-h-[42rem]">
      <FallbackMapCanvas era={era} selectedStateId={selectedStateId} onSelectState={onSelectState} />
      <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-accent/10 to-transparent" />
      <MapOverlay era={era} />

      <div className="absolute bottom-4 left-4 right-4 flex items-center gap-3 border border-line bg-ink/90 p-3 text-sm text-muted backdrop-blur-md">
        <MapPinned size={17} strokeWidth={1.5} className="text-accent" />
        {reason ?? "Add `NEXT_PUBLIC_MAPBOX_TOKEN` locally or in Vercel for the live Mapbox layer."}
      </div>
    </div>
  );
}

function FallbackMapCanvas({
  era,
  selectedStateId,
  onSelectState
}: {
  era: Era;
  selectedStateId: string | null;
  onSelectState: (stateId: string) => void;
}) {
  return (
    <>
      <div className="absolute inset-0 opacity-60 [background-image:linear-gradient(rgba(237,240,232,.07)_1px,transparent_1px),linear-gradient(90deg,rgba(237,240,232,.07)_1px,transparent_1px)] [background-size:48px_48px]" />
      <svg viewBox="0 0 620 620" className="absolute inset-0 h-full w-full">
        <path
          d="M336 71 C430 117 471 196 454 291 C438 378 391 480 299 536 C235 493 199 424 203 334 C207 237 245 148 336 71 Z"
          fill="rgba(239,246,244,0.04)"
          stroke="rgba(239,246,244,0.18)"
        />
        <AnimatePresence mode="wait">
          <motion.g
            key={era.id}
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.03 }}
            transition={{ duration: 0.35 }}
          >
            {era.states.map((state, index) => {
              const selected = selectedStateId === state.id || (!selectedStateId && index === 0);
              const shapes = fallbackShapes[era.id] ?? fallbackShapes.joseon;
              return (
                <g
                  key={state.id}
                  role="button"
                  tabIndex={0}
                  onClick={() => onSelectState(state.id)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" || event.key === " ") onSelectState(state.id);
                  }}
                  className="cursor-pointer outline-none"
                >
                  <path
                    d={shapes[index % shapes.length]}
                    fill={state.color}
                    fillOpacity={selected ? 0.58 : 0.34}
                    stroke={state.color}
                    strokeWidth={selected ? 4 : 2}
                    className="transition hover:opacity-90"
                  />
                </g>
              );
            })}
          </motion.g>
        </AnimatePresence>
      </svg>
    </>
  );
}

const fallbackShapes: Record<string, string[]> = {
  gojoseon: ["M246 170 C324 96 432 155 448 253 C383 263 308 288 237 335 C195 284 201 214 246 170 Z"],
  "three-kingdoms": [
    "M247 113 C353 66 459 158 451 282 C391 275 331 281 274 310 C231 253 219 174 247 113 Z",
    "M206 327 C267 293 322 311 339 376 C306 418 260 447 201 453 C171 405 172 360 206 327 Z",
    "M349 338 C411 308 471 328 493 388 C467 458 417 501 329 512 C319 443 328 386 349 338 Z"
  ],
  "unified-silla": [
    "M225 262 C306 205 419 244 464 345 C443 441 381 507 293 537 C231 479 201 394 225 262 Z",
    "M253 91 C384 60 492 131 504 261 C430 246 349 241 260 267 C225 205 219 146 253 91 Z"
  ],
  goryeo: ["M250 104 C365 74 462 166 459 310 C456 416 385 502 294 541 C220 475 189 384 208 277 C221 202 234 151 250 104 Z"],
  joseon: ["M262 75 C385 77 471 170 458 305 C449 414 383 505 293 546 C216 480 185 382 207 273 C226 176 245 113 262 75 Z"],
  occupation: ["M262 75 C385 77 471 170 458 305 C449 414 383 505 293 546 C216 480 185 382 207 273 C226 176 245 113 262 75 Z"],
  modern: [
    "M262 75 C374 82 453 167 455 292 C393 286 328 301 258 330 C220 242 224 154 262 75 Z",
    "M258 330 C328 301 393 286 455 292 C447 413 382 506 293 546 C224 485 194 415 205 350 C222 345 239 338 258 330 Z"
  ]
};
