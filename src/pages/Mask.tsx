import { useState } from 'react';
import { storage } from '../utils/storage';

function Mask() {
  const [sessionId] = useState<string | null>(() => storage.getSessionId());

  return (
    <main className="min-h-screen bg-[#F8F7F4]">
      <div className="mx-auto flex min-h-screen max-w-3xl items-center justify-center px-6">
        <div className="text-center">
          <p className="mb-3 text-sm font-medium tracking-[0.2em] text-[#68708A]">
            01 — MASK
          </p>

          <h1 className="text-4xl font-semibold text-[#172033]">
            What do you show?
          </h1>

          <p className="mt-4 text-[#68708A]">
            Let's look at the version of you that others usually see.
          </p>

          {sessionId && (
            <div className="mt-8 inline-flex items-center gap-2 rounded-full border border-[#DCDAD2] bg-white px-4 py-1.5 text-xs text-[#68708A]">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              <span>Active Session:</span>
              <span className="font-mono text-[#172033]">{sessionId}</span>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

export default Mask;