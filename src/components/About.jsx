import { education, achievements } from "../content.js";
import Reveal from "./Reveal.jsx";

export default function About() {
  return (
    <div className="mt-6 grid gap-6 lg:grid-cols-2">
      <Reveal>
        <div className="h-full rounded-xl border border-line bg-surface/40 p-6">
          <p className="font-mono text-[11px] tracking-widest text-accent uppercase">
            Education
          </p>
          <ul className="mt-5 space-y-5">
            {education.map((item) => (
              <li key={item.school}>
                <p className="font-medium text-chalk">{item.school}</p>
                <p className="mt-1 text-sm text-chalk/80">{item.detail}</p>
                <p className="tabular mt-1 font-mono text-xs text-fog">
                  {item.meta}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </Reveal>

      <Reveal delay={0.08}>
        <div className="h-full rounded-xl border border-line bg-surface/40 p-6">
          <p className="font-mono text-[11px] tracking-widest text-accent uppercase">
            Achievements
          </p>
          <ul className="mt-5 space-y-4">
            {achievements.map((item) => (
              <li key={item} className="flex gap-3 text-sm text-chalk/85">
                <span
                  aria-hidden="true"
                  className="mt-2 h-px w-4 shrink-0 bg-accent/60"
                />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </Reveal>
    </div>
  );
}
