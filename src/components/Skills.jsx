import { skills } from "../content.js";
import Reveal from "./Reveal.jsx";

export default function Skills() {
  return (
    <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {skills.map((group, i) => (
        <Reveal key={group.group} delay={i * 0.05}>
          <div className="h-full rounded-xl border border-line bg-surface/40 p-5">
            <p className="font-mono text-[11px] tracking-widest text-accent uppercase">
              {group.group}
            </p>
            <ul className="mt-3 space-y-1.5">
              {group.items.map((item) => (
                <li key={item} className="text-sm text-chalk/85">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      ))}
    </div>
  );
}
