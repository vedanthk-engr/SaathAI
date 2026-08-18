'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Mic, Square, Play, Pause, RefreshCw, CheckCircle, Volume2, Sparkles } from 'lucide-react';

interface VoiceRecorderProps {
  onRecordingComplete: (audioBlob: Blob, base64Audio: string) => void;
  maxDurationSeconds?: number;
  label?: string;
}

export default function VoiceRecorder({
  onRecordingComplete,
  maxDurationSeconds = 60,
  label = "Record voice description in your mother tongue"
}: VoiceRecorderProps) {
  const [status, setStatus] = useState<'idle' | 'recording' | 'recorded' | 'uploading'>('idle');
  const [timer, setTimer] = useState(0);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const timerIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      audioChunksRef.current = [];

      // Web Audio API setup for live waveform visualization
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      const audioCtx = new AudioCtx();
      const analyser = audioCtx.createAnalyser();
      analyser.fftSize = 64;
      const source = audioCtx.createMediaStreamSource(stream);
      source.connect(analyser);

      audioCtxRef.current = audioCtx;
      analyserRef.current = analyser;

      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        const url = URL.createObjectURL(blob);
        setAudioUrl(url);
        setStatus('recorded');
        
        // Convert to base64
        const reader = new FileReader();
        reader.readAsDataURL(blob);
        reader.onloadend = () => {
          const base64data = reader.result as string;
          onRecordingComplete(blob, base64data);
        };

        // Stop media stream tracks
        stream.getTracks().forEach(track => track.stop());
        if (audioCtxRef.current) audioCtxRef.current.close();
      };

      mediaRecorder.start(100);
      setStatus('recording');
      setTimer(0);

      timerIntervalRef.current = setInterval(() => {
        setTimer((prev) => {
          if (prev >= maxDurationSeconds - 1) {
            stopRecording();
            return maxDurationSeconds;
          }
          return prev + 1;
        });
      }, 1000);

      drawWaveform();
    } catch (err) {
      console.error('Error accessing microphone:', err);
      alert('Could not access microphone. Please allow microphone permissions or use audio fallback.');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && status === 'recording') {
      mediaRecorderRef.current.stop();
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    }
  };

  const drawWaveform = () => {
    if (!canvasRef.current || !analyserRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const analyser = analyserRef.current;

    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    const render = () => {
      if (!ctx) return;
      analyser.getByteFrequencyData(dataArray);

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const barWidth = (canvas.width / bufferLength) * 1.5;
      let x = 0;

      for (let i = 0; i < bufferLength; i++) {
        const barHeight = (dataArray[i] / 255) * canvas.height;
        ctx.fillStyle = '#C17D3C';
        ctx.beginPath();
        ctx.roundRect(x, canvas.height - barHeight, barWidth - 2, barHeight, 4);
        ctx.fill();
        x += barWidth;
      }

      animationFrameRef.current = requestAnimationFrame(render);
    };

    render();
  };

  const togglePlayback = () => {
    if (!audioRef.current || !audioUrl) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const resetRecording = () => {
    setStatus('idle');
    setAudioUrl(null);
    setTimer(0);
    setIsPlaying(false);
  };

  useEffect(() => {
    return () => {
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    };
  }, []);

  return (
    <div className="p-6 rounded-2xl bg-white border-2 border-stone-200 shadow-sm space-y-4 font-sans">
      <div className="flex items-center justify-between">
        <label className="text-sm font-semibold text-stone-800 flex items-center gap-2">
          <Mic className="w-4 h-4 text-terracotta" />
          {label}
        </label>
        <span className="text-xs font-mono px-2.5 py-1 rounded-badge bg-stone-100 text-stone-600">
          {timer}s / {maxDurationSeconds}s
        </span>
      </div>

      {/* Recording Control Panel */}
      {status === 'idle' && (
        <button
          type="button"
          onClick={startRecording}
          className="w-full py-8 rounded-xl bg-parchment border-2 border-dashed border-terracotta/40 hover:border-terracotta hover:bg-terracotta/5 transition-all group flex flex-col items-center justify-center gap-3 cursor-pointer"
        >
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-terracotta to-saffron flex items-center justify-center text-white shadow-terracotta-glow group-hover:scale-110 transition-transform">
            <Mic className="w-8 h-8" />
          </div>
          <div className="text-center">
            <p className="font-medium text-stone-800 text-base">Tap to Start Voice Recording</p>
            <p className="text-xs text-stone-500 mt-0.5">Speak naturally in Hindi, Maithili, Tamil, Bengali, etc.</p>
          </div>
        </button>
      )}

      {status === 'recording' && (
        <div className="p-6 rounded-xl bg-terracotta/5 border border-terracotta/30 flex flex-col items-center gap-4">
          <div className="flex items-center gap-2 text-terracotta font-semibold animate-pulse text-sm">
            <span className="w-3 h-3 rounded-full bg-red-500 animate-ping" />
            Recording Live Audio... Speak now
          </div>

          <canvas ref={canvasRef} width={280} height={40} className="w-full max-w-xs" />

          <button
            type="button"
            onClick={stopRecording}
            className="px-6 py-2.5 rounded-full bg-red-600 hover:bg-red-700 text-white font-medium text-sm flex items-center gap-2 shadow-md transition-all"
          >
            <Square className="w-4 h-4 fill-current" />
            Stop Recording
          </button>
        </div>
      )}

      {status === 'recorded' && audioUrl && (
        <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 space-y-3">
          <div className="flex items-center justify-between text-xs text-emerald-700 font-medium bg-emerald-50 px-3 py-2 rounded-lg border border-emerald-200">
            <span className="flex items-center gap-1.5">
              <CheckCircle className="w-4 h-4 text-emerald-600" /> Voice recording captured successfully ({timer}s)
            </span>
            <Sparkles className="w-4 h-4 text-emerald-600" />
          </div>

          <audio
            ref={audioRef}
            src={audioUrl}
            onEnded={() => setIsPlaying(false)}
            className="hidden"
          />

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={togglePlayback}
              className="flex-1 py-2.5 px-4 rounded-lg bg-terracotta hover:bg-terracotta-600 text-white font-medium text-sm flex items-center justify-center gap-2 transition-all shadow-sm"
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              {isPlaying ? "Pause Audio" : "Listen to Recording"}
            </button>

            <button
              type="button"
              onClick={resetRecording}
              className="p-2.5 rounded-lg border border-stone-300 text-stone-600 hover:bg-stone-100 transition-colors"
              title="Re-record"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
