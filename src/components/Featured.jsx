import { featured } from "../content.js";
import Reveal from "./Reveal.jsx";
import DecisionDemo from "./DecisionDemo.jsx";

function Stat({ value, label }) {
  return (
    <div>
      <p className="tabular font-mono text-xl font-semibold text-chalk">
        {value}
      </p>
      <p className="mt-0.5 text-xs text-fog">{label}</p>
    </div>
  );
}

export default function Featured() {
  return (
    <div className="rounded-2xl border border-line bg-surface/40 p-5 sm:p-8">
      <Reveal>
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-70" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
          </span>
          <p className="font-mono text-xs tracking-widest text-accent uppercase">
            {featured.kicker}
          </p>
        </div>

        <h3 className="mt-4 text-2xl font-semibold tracking-tight sm:text-3xl">
          {featured.name}
        </h3>
        <p className="mt-2 text-lg text-chalk/85 text-balance">
          {featured.line}
        </p>

        <div className="mt-6 flex flex-wrap gap-2">
          <a
            href={featured.live}
            target="_blank"
            rel="noreferrer"
            className="rounded-lg bg-accent px-5 py-2.5 text-sm font-semibold text-ink transition-all hover:-translate-y-0.5 hover:bg-accent/90"
          >
            Open the live demo ↗
          </a>
          <a
            href={featured.repo}
            target="_blank"
            rel="noreferrer"
            className="rounded-lg border border-line bg-surface px-5 py-2.5 text-sm font-medium text-chalk transition-all hover:-translate-y-0.5 hover:border-accent/50"
          >
            Source
          </a>
        </div>

        <div className="mt-7 grid grid-cols-2 gap-5 border-y border-line py-5 sm:grid-cols-4">
          {featured.stats.map((s) => (
            <Stat key={s.label} {...s} />
          ))}
        </div>

        <div className="mt-6 max-w-3xl space-y-4">
          {featured.body.map((paragraph) => (
            <p key={paragraph.slice(0, 24)} className="leading-relaxed text-fog">
              {paragraph}
            </p>
          ))}
        </div>

        <ul className="mt-6 flex flex-wrap gap-1.5">
          {featured.stack.map((tech) => (
            <li
              key={tech}
              className="rounded-md border border-line bg-raise/50 px-2.5 py-1 font-mono text-xs text-fog"
            >
              {tech}
            </li>
          ))}
        </ul>
      </Reveal>

      <Reveal delay={0.1} className="mt-10">
        <p className="mb-3 text-sm font-medium text-chalk">
          Try it here — this is the pair the whole design exists for:
        </p>
        <DecisionDemo />
      </Reveal>
    </div>
  );
}
