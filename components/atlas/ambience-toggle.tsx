"use client";

import { useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";

export function AmbienceToggle() {
  const [enabled, setEnabled] = useState(false);
  const contextRef = useRef<AudioContext | null>(null);
  const nodesRef = useRef<{ gain: GainNode; oscillators: OscillatorNode[] } | null>(null);
  const stop = () => {
    nodesRef.current?.gain.gain.linearRampToValueAtTime(0, nodesRef.current.gain.context.currentTime + 0.4);
    window.setTimeout(() => { nodesRef.current?.oscillators.forEach((oscillator) => oscillator.stop()); nodesRef.current = null; }, 450);
  };
  const toggle = async () => {
    if (enabled) { stop(); setEnabled(false); return; }
    const AudioContextCtor = window.AudioContext || (window as typeof window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!AudioContextCtor) return;
    const context = contextRef.current ?? new AudioContextCtor();
    contextRef.current = context;
    await context.resume();
    const gain = context.createGain();
    gain.gain.value = 0.0001;
    gain.connect(context.destination);
    const oscillators = [130.81, 196, 261.63].map((frequency) => { const oscillator = context.createOscillator(); oscillator.frequency.value = frequency; oscillator.type = "sine"; oscillator.connect(gain); oscillator.start(); return oscillator; });
    gain.gain.exponentialRampToValueAtTime(0.018, context.currentTime + 0.6);
    nodesRef.current = { gain, oscillators };
    setEnabled(true);
  };
  return <button type="button" onClick={toggle} className="grid h-10 w-10 place-items-center border border-line text-muted transition-colors hover:border-paper/30 hover:text-paper" title={enabled ? "Mute ambience" : "Play ambience"} aria-label={enabled ? "Mute ambience" : "Play ambience"}>{enabled ? <Volume2 size={17} strokeWidth={1.6} /> : <VolumeX size={17} strokeWidth={1.6} />}</button>;
}
