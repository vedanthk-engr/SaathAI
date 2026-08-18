'use client';

import React from 'react';
import { CheckCircle2, Loader2, Circle, Sparkles, Cpu } from 'lucide-react';

export interface AIStep {
  id: string;
  label: string;
  status: 'idle' | 'active' | 'completed';
  estTime?: string;
}

interface AIGenerationStatusProps {
  steps: AIStep[];
  currentStepIndex: number;
}

export default function AIGenerationStatus({ steps, currentStepIndex }: AIGenerationStatusProps) {
  return (
    <div className="p-6 rounded-2xl bg-stone-900 text-white shadow-xl border border-stone-800 space-y-6 font-sans">
      <div className="flex items-center justify-between border-b border-stone-800 pb-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-terracotta to-saffron flex items-center justify-center text-white">
            <Cpu className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <h3 className="font-serif font-semibold text-lg text-white flex items-center gap-2">
              Haath AI Engine Active
            </h3>
            <p className="text-xs text-stone-400">Voice-to-Listing Multi-Agent Pipeline</p>
          </div>
        </div>
        <span className="text-xs font-mono px-3 py-1 rounded-badge bg-terracotta/20 text-saffron border border-terracotta/30">
          Step {Math.min(currentStepIndex + 1, steps.length)} of {steps.length}
        </span>
      </div>

      {/* Vertical Steps */}
      <div className="space-y-4 relative before:absolute before:left-4 before:top-2 before:bottom-2 before:w-0.5 before:bg-stone-800">
        {steps.map((step, idx) => {
          const isDone = step.status === 'completed';
          const isActive = step.status === 'active';

          return (
            <div key={step.id} className="relative flex items-center gap-4 group z-10">
              <div className="flex-shrink-0">
                {isDone ? (
                  <div className="w-8 h-8 rounded-full bg-emerald-500/20 border border-emerald-500 text-emerald-400 flex items-center justify-center">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                ) : isActive ? (
                  <div className="w-8 h-8 rounded-full bg-terracotta/20 border border-terracotta text-saffron flex items-center justify-center animate-spin">
                    <Loader2 className="w-5 h-5" />
                  </div>
                ) : (
                  <div className="w-8 h-8 rounded-full bg-stone-800 border border-stone-700 text-stone-500 flex items-center justify-center">
                    <Circle className="w-4 h-4" />
                  </div>
                )}
              </div>

              <div className="flex-1 flex items-center justify-between">
                <span className={`text-sm font-medium ${isDone ? 'text-emerald-400' : isActive ? 'text-white font-semibold' : 'text-stone-500'}`}>
                  {step.label}
                </span>
                {step.estTime && (
                  <span className="text-[11px] font-mono text-stone-500">
                    {step.estTime}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
