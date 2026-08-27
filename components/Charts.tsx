import React from 'react';

/* Hand-rolled SVG charts. No charting dependency: the site already draws its own
   SVG (Logos.tsx), the palette is fixed, and a bar chart is less code than the
   wrapper a library would need. Everything scales with viewBox so it stays sharp
   and responsive without a resize observer. */

const NEON = {
  cyan: '#06b6d4',
  pink: '#ec4899',
  green: '#10b981',
  purple: '#8b5cf6',
  grid: '#1f2937',
  axis: '#374151',
  text: '#9ca3af',
  faint: '#4b5563',
};

export interface Bar {
  label: string;
  value: number;
  color?: string;
  note?: string;
}

interface BarChartProps {
  bars: Bar[];
  unit?: string;
  /** Optional dashed reference line, e.g. a published figure to compare against. */
  reference?: { value: number; label: string };
  /** Decimal places for value labels. */
  precision?: number;
  /** Lower is better — flips the implied "good" direction in the caption. */
  lowerIsBetter?: boolean;
  height?: number;
}

export const BarChart: React.FC<BarChartProps> = ({
  bars, unit = '', reference, precision = 2, height = 260,
}) => {
  const W = 720;
  const padL = 132, padR = 64, padT = 16, padB = 34;
  const plotW = W - padL - padR;
  const plotH = height - padT - padB;
  const max = Math.max(...bars.map(b => b.value), reference?.value ?? 0) * 1.18;
  const rowH = plotH / bars.length;
  const barH = Math.min(26, rowH * 0.52);
  const x = (v: number) => padL + (v / max) * plotW;

  return (
    <svg viewBox={`0 0 ${W} ${height}`} className="w-full h-auto" role="img">
      {[0, 0.25, 0.5, 0.75, 1].map(t => (
        <line key={t} x1={padL + t * plotW} x2={padL + t * plotW} y1={padT} y2={padT + plotH}
              stroke={NEON.grid} strokeWidth="1" />
      ))}
      {[0, 0.5, 1].map(t => (
        <text key={t} x={padL + t * plotW} y={height - 10} fill={NEON.faint}
              fontSize="11" fontFamily="JetBrains Mono, monospace" textAnchor="middle">
          {(max * t).toFixed(precision)}
        </text>
      ))}

      {reference && (
        <>
          <line x1={x(reference.value)} x2={x(reference.value)} y1={padT} y2={padT + plotH}
                stroke={NEON.pink} strokeWidth="1.5" strokeDasharray="4 4" />
          <text x={x(reference.value) + 6} y={padT + 12} fill={NEON.pink}
                fontSize="10" fontFamily="JetBrains Mono, monospace">
            {reference.label}
          </text>
        </>
      )}

      {bars.map((b, i) => {
        const cy = padT + i * rowH + rowH / 2;
        const w = Math.max(2, x(b.value) - padL);
        return (
          <g key={b.label}>
            <text x={padL - 12} y={cy + 4} fill={NEON.text} fontSize="12"
                  fontFamily="JetBrains Mono, monospace" textAnchor="end">
              {b.label}
            </text>
            <rect x={padL} y={cy - barH / 2} width={w} height={barH} rx="2"
                  fill={b.color ?? NEON.cyan} opacity="0.85" />
            <text x={padL + w + 8} y={cy + 4} fill="#e5e7eb" fontSize="12"
                  fontFamily="JetBrains Mono, monospace">
              {b.value.toFixed(precision)}{unit}
            </text>
            {b.note && (
              <text x={padL + w + 8} y={cy + 17} fill={NEON.faint} fontSize="10"
                    fontFamily="JetBrains Mono, monospace">
                {b.note}
              </text>
            )}
          </g>
        );
      })}
      <line x1={padL} x2={padL} y1={padT} y2={padT + plotH} stroke={NEON.axis} strokeWidth="1" />
    </svg>
  );
};

export interface StackRow {
  label: string;
  segments: { name: string; value: number; color: string }[];
}

/** Grouped bars for comparing several measurements per model (load / warm-up / steady). */
export const GroupedBarChart: React.FC<{ rows: StackRow[]; unit?: string; height?: number }> = ({
  rows, unit = 's', height = 300,
}) => {
  const W = 720;
  const padL = 132, padR = 60, padT = 30, padB = 34;
  const plotW = W - padL - padR;
  const plotH = height - padT - padB;
  const all = rows.flatMap(r => r.segments.map(s => s.value));
  const max = Math.max(...all) * 1.15;
  const rowH = plotH / rows.length;
  const legend = rows[0]?.segments ?? [];

  return (
    <svg viewBox={`0 0 ${W} ${height}`} className="w-full h-auto" role="img">
      {legend.map((s, i) => (
        <g key={s.name}>
          <rect x={padL + i * 130} y={4} width="10" height="10" rx="2" fill={s.color} />
          <text x={padL + i * 130 + 16} y={13} fill={NEON.text} fontSize="11"
                fontFamily="JetBrains Mono, monospace">{s.name}</text>
        </g>
      ))}
      {[0, 0.25, 0.5, 0.75, 1].map(t => (
        <line key={t} x1={padL + t * plotW} x2={padL + t * plotW} y1={padT} y2={padT + plotH}
              stroke={NEON.grid} strokeWidth="1" />
      ))}
      {[0, 0.5, 1].map(t => (
        <text key={t} x={padL + t * plotW} y={height - 10} fill={NEON.faint} fontSize="11"
              fontFamily="JetBrains Mono, monospace" textAnchor="middle">
          {(max * t).toFixed(1)}{unit}
        </text>
      ))}
      {rows.map((r, ri) => {
        const n = r.segments.length;
        const bh = Math.min(14, (rowH * 0.7) / n);
        const top = padT + ri * rowH + (rowH - bh * n - 4 * (n - 1)) / 2;
        return (
          <g key={r.label}>
            <text x={padL - 12} y={padT + ri * rowH + rowH / 2 + 4} fill={NEON.text} fontSize="12"
                  fontFamily="JetBrains Mono, monospace" textAnchor="end">{r.label}</text>
            {r.segments.map((s, si) => {
              const w = Math.max(2, (s.value / max) * plotW);
              const y = top + si * (bh + 4);
              return (
                <g key={s.name}>
                  <rect x={padL} y={y} width={w} height={bh} rx="2" fill={s.color} opacity="0.85" />
                  <text x={padL + w + 6} y={y + bh - 1} fill="#d1d5db" fontSize="10"
                        fontFamily="JetBrains Mono, monospace">{s.value}{unit}</text>
                </g>
              );
            })}
          </g>
        );
      })}
      <line x1={padL} x2={padL} y1={padT} y2={padT + plotH} stroke={NEON.axis} strokeWidth="1" />
    </svg>
  );
};

export const Figure: React.FC<{ caption: string; children: React.ReactNode; number?: number }> = ({
  caption, children, number,
}) => (
  <figure className="my-10 rounded-lg border border-gray-800 bg-neon-card/60 p-5 overflow-x-auto">
    {children}
    <figcaption className="mt-4 text-sm text-gray-500 leading-relaxed border-t border-gray-800 pt-3">
      {number !== undefined && (
        <span className="text-neon-cyan font-mono mr-2">Fig. {number}</span>
      )}
      {caption}
    </figcaption>
  </figure>
);

export { NEON };
