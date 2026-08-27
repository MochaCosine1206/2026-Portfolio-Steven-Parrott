import React from 'react';
import { ArrowLeft, ExternalLink, Calendar } from 'lucide-react';
import { BarChart, GroupedBarChart, Figure, NEON } from './Charts';

export interface Article {
  slug: string;
  title: string;
  standfirst: string;
  date: string;
  readingTime: string;
  tags: string[];
  body: React.FC;
}

const P: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <p className="text-gray-300 leading-[1.85] mb-6">{children}</p>
);

const H: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <h3 className="text-2xl font-bold text-white mt-14 mb-5 tracking-tight">{children}</h3>
);

const Pull: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <p className="my-8 border-l-4 border-neon-pink pl-5 text-lg text-gray-200 leading-relaxed">
    {children}
  </p>
);

const Code: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <pre className="my-8 overflow-x-auto rounded-lg border border-gray-800 bg-black/60 p-4">
    <code className="font-mono text-sm text-gray-300 whitespace-pre">{children}</code>
  </pre>
);

const Table: React.FC<{ head: string[]; rows: (string | number)[][] }> = ({ head, rows }) => (
  <div className="my-8 overflow-x-auto rounded-lg border border-gray-800">
    <table className="w-full text-sm font-mono">
      <thead>
        <tr className="bg-neon-card">
          {head.map(h => (
            <th key={h} className="px-4 py-3 text-left text-gray-400 font-normal whitespace-nowrap">{h}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((r, i) => (
          <tr key={i} className="border-t border-gray-800">
            {r.map((c, j) => (
              <td key={j} className={`px-4 py-3 whitespace-nowrap ${j === 0 ? 'text-gray-300' : 'text-gray-400'}`}>{c}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

/* ---------------------------------------------------------------- article */

const TTSBody: React.FC = () => (
  <>
    <P>
      Kokoro-82M synthesises speech on an Apple M5 Pro at a real-time factor of <strong className="text-white">0.034</strong> —
      about 29 times faster than the audio plays. The figures published for the same model on an
      NVIDIA A100 and an RTX 3090 sit around 0.03. For this model, on this workload, a laptop is
      doing what a datacenter GPU does.
    </P>
    <P>
      That is a narrow claim and I want to keep it narrow. It says nothing about training, nothing
      about batch throughput, and nothing about models an order of magnitude larger. But it is
      measured, it is reproducible, and as far as I can find nobody has published it.
    </P>

    <H>Measuring the wrong thing</H>
    <P>
      Most local-inference comparisons report wall-clock latency: how many seconds to synthesise a
      sentence. That number is not comparable between models, and I had been making the mistake
      myself. Given the same input text, Kokoro produced 3.55 seconds of audio and Qwen3-TTS
      produced 4.40 seconds — the models simply speak at different rates. Comparing their latencies
      directly rewards whichever one talks faster.
    </P>
    <P>
      Real-time factor divides synthesis time by the duration of the audio actually produced, so it
      survives that difference. The harness therefore reads the length of every generated waveform
      rather than assuming it. So what happens when you measure the two models properly?
    </P>

    <Figure number={1} caption="Real-time factor, lower is better. The dashed line is the published Kokoro figure for an A100 and an RTX 3090. Measured on an M5 Pro, 6 runs per model, first run discarded as cold.">
      <BarChart
        precision={3}
        reference={{ value: 0.03, label: 'A100 / RTX 3090 ≈ 0.03' }}
        bars={[
          { label: 'Kokoro-82M', value: 0.034, color: NEON.green, note: '29.3× realtime' },
          { label: 'Qwen3-TTS 0.6B', value: 0.171, color: NEON.cyan, note: '5.9× realtime' },
        ]}
      />
    </Figure>

    <H>What the laptop matched</H>
    <P>
      Kokoro lands at 0.034 against a published 0.03. The gap is inside the noise of two different
      measurement setups, so the honest reading is not "the M5 Pro beats an A100" — it is that for
      an 82M-parameter model the GPU stops being the constraint. The work is small enough that
      unified memory and twenty GPU cores are sufficient, and the accelerator's advantage has
      nowhere to express itself.
    </P>
    <P>
      Qwen3-TTS at 0.171 is roughly five times slower, and that is the trade rather than a defect.
      Kokoro offers eight languages and a fixed set of built-in voices. Qwen3-TTS offers eighty-plus
      languages and clones a voice from a few seconds of reference audio. Paying 5× in latency to
      speak in someone's voice, in a language Kokoro does not support, is a reasonable price.
    </P>
    <Pull>
      The interesting result is not that one model is faster. It is that the faster one has already
      collapsed the distance to a datacenter GPU, and the slower one is slower for reasons that have
      nothing to do with hardware.
    </Pull>

    <H>Where the time actually goes</H>
    <P>
      Steady-state latency also hides something. These two models have opposite cost profiles, and
      which one hurts depends entirely on how the process is used.
    </P>

    <Figure number={2} caption="Load, first synthesis, and steady-state per model. Kokoro is cheap to load and expensive on first use; Qwen3-TTS is the reverse. A benchmark reporting only steady state would show neither.">
      <GroupedBarChart
        rows={[
          { label: 'Kokoro-82M', segments: [
            { name: 'model load', value: 0.14, color: NEON.purple },
            { name: 'first synth', value: 3.60, color: NEON.pink },
            { name: 'steady state', value: 0.12, color: NEON.green },
          ]},
          { label: 'Qwen3-TTS 0.6B', segments: [
            { name: 'model load', value: 2.41, color: NEON.purple },
            { name: 'first synth', value: 0.83, color: NEON.pink },
            { name: 'steady state', value: 0.97, color: NEON.green },
          ]},
        ]}
      />
    </Figure>

    <P>
      Kokoro loads in 0.14 seconds and then spends 3.6 seconds on its first synthesis. Qwen3-TTS
      takes 2.4 seconds to load and is warm after 0.83. If you spawn a process per request, Kokoro's
      profile is punishing and the published steady-state number is a fiction. If you hold a
      long-lived process — which is what an application does — it disappears entirely.
    </P>
    <P>
      This is the practical reason the harness reports load, first-run, and steady-state separately
      rather than averaging them into one figure. The average would have been true and useless.
    </P>

    <Table
      head={['Model', 'Quant', 'Load', 'First', 'Steady', 'Audio', 'RTF', '×realtime']}
      rows={[
        ['Kokoro-82M', 'bf16', '0.14s', '3.60s', '0.122s', '3.55s', '0.034', '29.3×'],
        ['Qwen3-TTS 12Hz 0.6B Base', '4-bit', '2.41s', '0.83s', '0.969s', '4.40s', '0.171', '5.9×'],
      ]}
    />

    <H>The number that went stale</H>
    <P>
      In April I measured Kokoro on this same machine, with this same sentence, at 0.80 seconds
      average and an 18.7 second warm-up. Today the same model on the same hardware runs at 0.122
      seconds with a 3.6 second warm-up. Nothing about the machine changed. The library did.
    </P>
    <P>
      That is a 6.5× improvement in steady state and 5× in warm-up, arriving entirely from work
      other people did upstream between April and August. It also means my April write-up was
      wrong within four months of being written, and would have gone on being quoted if I had
      published the table without the harness that produced it.
    </P>

    <Figure number={3} caption="Kokoro-82M steady-state synthesis, same hardware and same input sentence, four months apart. The hardware did not change; mlx-audio did.">
      <BarChart
        unit="s"
        precision={3}
        bars={[
          { label: 'April 2026', value: 0.800, color: NEON.faint },
          { label: 'August 2026', value: 0.122, color: NEON.green, note: '6.5× faster' },
        ]}
      />
    </Figure>

    <Pull>
      A local-inference benchmark has a shelf life measured in months. Publish the harness or do not
      publish the numbers.
    </Pull>

    <H>What I did not measure</H>
    <P>
      Two models is not a survey. The <code className="font-mono text-neon-cyan text-sm">mlx-speech</code> library
      ships nine more TTS families — Fish S2 Pro, VibeVoice, LongCat, OpenMOSS, Step-Audio-EditX,
      DramaBox and others — and publishes no performance data at all. I have not run them here
      because each is a multi-gigabyte download, not because they are uninteresting. The harness
      takes a <code className="font-mono text-neon-cyan text-sm">--models</code> list, so adding
      them is a download rather than new code.
    </P>
    <P>
      The comparison I most want and do not have is MLX against Core ML. A Core ML implementation
      of Kokoro is reported to produce 30 seconds of speech in 379 milliseconds on a Mac Studio,
      and claimed to be twice as fast as MLX on the same hardware. If that holds on the M5 Pro it
      would put Kokoro comfortably past any published GPU figure. I have the machine to settle it
      and have not yet done so.
    </P>
    <P>
      I should also be clear about the sample. Six runs per model on one sentence in one language,
      with the first discarded as cold, on a machine that was otherwise idle. Variance across the
      warm runs was real — Qwen ranged from 0.75 to 1.01 seconds. The RTF figures are stable enough
      to compare models by, and not precise enough to rank two models within ten percent of each
      other.
    </P>

    <H>Running it yourself</H>
    <P>
      The harness is about a hundred lines and lives with the results it produced. It takes any
      model that <code className="font-mono text-neon-cyan text-sm">mlx-audio</code> can load.
    </P>
    <Code>{`uv run --python 3.12 --with mlx-audio --with 'misaki[en,ja,zh,ko]' \\
  bench/tts_bench.py --runs 8 --json results.json`}</Code>
    <P>
      If your numbers differ from mine, the interesting question is which of us has the quieter
      machine — and after April, which of us ran it more recently.
    </P>
  </>
);

export const ARTICLES: Article[] = [
  {
    slug: 'local-tts-apple-silicon',
    title: 'A laptop matched an A100 at text-to-speech',
    standfirst:
      'Kokoro-82M runs at RTF 0.034 on an Apple M5 Pro, against a published ~0.03 on datacenter GPUs. Measuring it properly turned out to be most of the work.',
    date: '2026-08-27',
    readingTime: '6 min',
    tags: ['Local inference', 'MLX', 'Apple Silicon', 'Benchmarks'],
    body: TTSBody,
  },
];

/* ---------------------------------------------------------------- views */

export const WritingIndex: React.FC<{ onOpen: (slug: string) => void }> = ({ onOpen }) => (
  <section id="writing" className="relative z-10 px-6 md:px-12 max-w-7xl mx-auto py-16">
    <h2 className="text-3xl font-bold mb-2 flex items-center gap-3">
      <span className="text-neon-cyan font-mono text-2xl">#</span> Writing
    </h2>
    <p className="text-gray-500 mb-10 max-w-2xl">
      Measurements, mostly. Each piece ships the harness that produced its numbers.
    </p>
    <div className="grid gap-5">
      {ARTICLES.map(a => (
        <button
          key={a.slug}
          onClick={() => onOpen(a.slug)}
          className="group text-left rounded-lg border border-gray-800 bg-neon-card/50 p-6 transition-colors hover:border-neon-cyan/50"
        >
          <div className="flex items-center gap-3 text-xs font-mono text-gray-500 mb-3">
            <Calendar size={13} />
            <span>{a.date}</span>
            <span className="text-gray-700">·</span>
            <span>{a.readingTime}</span>
          </div>
          <h3 className="text-xl font-bold text-white mb-2 group-hover:text-neon-cyan transition-colors">
            {a.title}
          </h3>
          <p className="text-gray-400 leading-relaxed mb-4">{a.standfirst}</p>
          <div className="flex flex-wrap gap-2">
            {a.tags.map(t => (
              <span key={t} className="px-2 py-1 text-xs font-mono rounded bg-black/40 border border-gray-800 text-gray-500">
                {t}
              </span>
            ))}
          </div>
        </button>
      ))}
    </div>
  </section>
);

export const ArticleView: React.FC<{ article: Article; onBack: () => void }> = ({ article, onBack }) => {
  const Body = article.body;
  return (
    <article className="relative z-10 px-6 md:px-12 max-w-3xl mx-auto py-16">
      <button
        onClick={onBack}
        className="inline-flex items-center gap-2 text-sm font-mono text-gray-500 hover:text-neon-cyan transition-colors mb-10"
      >
        <ArrowLeft size={15} /> back
      </button>

      <div className="flex items-center gap-3 text-xs font-mono text-gray-500 mb-4">
        <Calendar size={13} />
        <span>{article.date}</span>
        <span className="text-gray-700">·</span>
        <span>{article.readingTime}</span>
      </div>
      <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-5 leading-[1.1]">
        {article.title}
      </h1>
      <p className="text-xl text-gray-400 leading-relaxed mb-10 border-l-4 border-neon-pink pl-5">
        {article.standfirst}
      </p>
      <div className="h-px bg-gray-800 mb-10" />

      <Body />

      <div className="mt-16 pt-8 border-t border-gray-800 flex flex-wrap gap-4">
        <a
          href="https://github.com/MochaCosine1206/orchestra"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 text-sm font-mono text-gray-400 hover:text-neon-cyan transition-colors"
        >
          More work on GitHub <ExternalLink size={14} />
        </a>
      </div>
    </article>
  );
};
