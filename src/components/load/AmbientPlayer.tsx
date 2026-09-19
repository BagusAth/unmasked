import React, { useState, useEffect, useRef } from 'react';
import { Headphones, Play, Pause, Volume2, Timer, Waves } from 'lucide-react';

const SOUND_TRACKS = [
  { id: 'forest', name: 'Hutan Pinus & Danau', type: 'pink' },
  { id: 'rain', name: 'Rintik Jendela', type: 'rain' },
  { id: 'stream', name: 'Gemercik Sungai', type: 'stream' }
];

export function AmbientPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeTrack, setActiveTrack] = useState(SOUND_TRACKS[0]);
  const [volume, setVolume] = useState(65);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const noiseNodeRef = useRef<AudioNode | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);

  useEffect(() => {
    if (isPlaying) {
      startAmbientAudio();
    } else {
      stopAmbientAudio();
    }
    return () => {
      stopAmbientAudio();
    };
  }, [isPlaying, activeTrack]);

  useEffect(() => {
    if (gainNodeRef.current && audioCtxRef.current) {
      gainNodeRef.current.gain.setTargetAtTime(volume / 100 * 0.15, audioCtxRef.current.currentTime, 0.1);
    }
  }, [volume]);

  const startAmbientAudio = () => {
    try {
      if (!audioCtxRef.current) {
        const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        audioCtxRef.current = new AudioCtx();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      const bufferSize = ctx.sampleRate * 2;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;

      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        b0 = 0.99886 * b0 + white * 0.0555179;
        b1 = 0.99332 * b1 + white * 0.0750759;
        b2 = 0.96900 * b2 + white * 0.1538520;
        b3 = 0.86650 * b3 + white * 0.3104856;
        b4 = 0.55000 * b4 + white * 0.5329522;
        b5 = -0.7616 * b5 - white * 0.0168980;
        data[i] = b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362;
        data[i] *= 0.11;
        b6 = white * 0.115926;
      }

      const noise = ctx.createBufferSource();
      noise.buffer = buffer;
      noise.loop = true;

      const filter = ctx.createBiquadFilter();
      filter.type = activeTrack.type === 'rain' ? 'bandpass' : 'lowpass';
      filter.frequency.value = activeTrack.type === 'rain' ? 800 : activeTrack.type === 'stream' ? 1200 : 500;

      const gainNode = ctx.createGain();
      gainNode.gain.setValueAtTime(volume / 100 * 0.12, ctx.currentTime);

      noise.connect(filter);
      filter.connect(gainNode);
      gainNode.connect(ctx.destination);

      noise.start();
      noiseNodeRef.current = noise;
      gainNodeRef.current = gainNode;
    } catch (e) {
      console.log('Audio Context initialization note:', e);
    }
  };

  const stopAmbientAudio = () => {
    if (noiseNodeRef.current) {
      try {
        (noiseNodeRef.current as AudioBufferSourceNode).stop();
      } catch (e) { /* ignore */ }
      noiseNodeRef.current = null;
    }
  };

  return (
    <section className="my-8 w-full">
      <div className="border border-[#E2E8F0] rounded-[20px] p-5 sm:p-7 shadow-[0_4px_20px_2px_rgba(30,41,59,0.04),0_12px_32px_4px_rgba(74,107,93,0.05)] overflow-hidden bg-white">
        <div className="flex items-center justify-between gap-3 mb-5 pb-3 border-b border-[#F1F5F9]">
          <div className="flex items-center gap-2.5">
            <span className="w-8 h-8 rounded-full bg-[#E8EFEA] text-[#4A6B5D] flex items-center justify-center">
              <Waves size={18} />
            </span>
            <div>
              <h2 className="text-base text-[#1E293B] font-semibold">Melodi Penenang Pikiran</h2>
              <p className="text-xs text-[#64748B]">Frekuensi ambient 432 Hz untuk menjernihkan batin</p>
            </div>
          </div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E8EFEA] text-[#4A6B5D] text-xs font-semibold">
            <Headphones size={14} />
            {isPlaying ? 'Sedang Diputar' : 'Siap Diputar'}
          </span>
        </div>

        <div className="rounded-xl p-5 border border-[#E2E8F0] flex flex-col gap-4 bg-[#F8F9FA]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="w-11 h-11 rounded-full bg-[#4A6B5D] hover:bg-[#3D584C] text-white flex items-center justify-center shadow-sm transition-transform active:scale-95 shrink-0 cursor-pointer"
                title={isPlaying ? 'Jeda' : 'Putar'}
              >
                {isPlaying ? <Pause size={20} /> : <Play size={20} className="ml-0.5" />}
              </button>
              <div>
                <h3 className="text-sm sm:text-base text-[#1E293B] font-semibold">{activeTrack.name}</h3>
                <p className="text-xs text-[#64748B] flex items-center gap-1.5 mt-0.5">
                  <span className={`inline-block w-2 h-2 rounded-full ${isPlaying ? 'bg-[#4A6B5D] animate-ping' : 'bg-gray-300'}`} />
                  <span>Looping Tenang ∞</span>
                  <span className="text-[#CBD5E1]">•</span>
                  <span>Gelombang Alpha 432 Hz</span>
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 self-end sm:self-auto">
              <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-full border border-[#E2E8F0] text-[#64748B]">
                <Volume2 size={16} className="text-[#4A6B5D]" />
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={volume}
                  onChange={(e) => setVolume(Number(e.target.value))}
                  className="w-16 sm:w-20 accent-[#4A6B5D] h-1.5 bg-[#E2E8F0] rounded-lg cursor-pointer"
                />
              </div>
              <div className="px-3 py-1.5 rounded-full bg-white text-[#64748B] border border-[#E2E8F0] text-xs font-medium flex items-center gap-1">
                <Timer size={14} />
                <span>30m</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl px-4 py-3 border border-[#E2E8F0] flex flex-col gap-2">
            <div className="flex items-center justify-between text-xs text-[#64748B] font-mono">
              <span className="flex items-center gap-1.5 text-[#4A6B5D] font-medium">
                <Waves size={14} />
                Suara Rileks Lembut
              </span>
              <span>{isPlaying ? '04:18 / ∞' : '00:00 / ∞'}</span>
            </div>

            <div className="h-10 w-full flex items-center justify-between gap-1 px-1">
              {[18, 26, 34, 22, 38, 30, 36, 20, 28, 36, 40, 32, 24, 34, 38, 26, 16, 28, 32, 18].map((h, i) => (
                <span
                  key={i}
                  className={`flex-1 rounded-full transition-all duration-300 ${isPlaying ? 'bg-[#4A6B5D]' : 'bg-[#CBD5E1]'}`}
                  style={{
                    height: isPlaying ? `${h}px` : '6px',
                    opacity: isPlaying ? 0.4 + (i % 5) * 0.15 : 0.4
                  }}
                />
              ))}
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
            <span className="text-xs text-[#64748B]">Pilihan suasana:</span>
            <div className="flex items-center gap-2">
              {SOUND_TRACKS.map((track) => (
                <button
                  key={track.id}
                  onClick={() => setActiveTrack(track)}
                  className={`px-3 py-1 rounded-full text-xs font-medium transition-colors cursor-pointer ${
                    activeTrack.id === track.id
                      ? 'bg-[#E8EFEA] text-[#4A6B5D] border border-[#4A6B5D]/30 font-semibold'
                      : 'bg-white text-[#64748B] hover:text-[#1E293B] border border-[#E2E8F0]'
                  }`}
                >
                  {track.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
