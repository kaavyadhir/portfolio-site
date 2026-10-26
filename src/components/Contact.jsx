import { person } from "../content.js";
import Reveal from "./Reveal.jsx";
import EmailButton from "./EmailButton.jsx";

export default function Contact() {
  return (
    <Reveal>
      <div className="rounded-2xl border border-line bg-surface/40 p-6 text-center sm:p-12">
        <h2 className="text-2xl font-semibold tracking-tight sm:text-4xl">
          Looking for a 2027 software engineering role.
        </h2>
        <p className="mx-auto mt-4 max-w-xl leading-relaxed text-fog">
          Backend, data or applied AI — particularly anywhere a decision has to
          be explainable after the fact. The fastest way to reach me is email.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
          <EmailButton variant="solid" />
          <a
            href={person.linkedin}
            target="_blank"
            rel="noreferrer"
            className="rounded-lg border border-line bg-surface px-5 py-2.5 text-sm font-medium text-chalk transition-all hover:-translate-y-0.5 hover:border-accent/50"
          >
            LinkedIn ↗
          </a>
          <a
            href={person.github}
            target="_blank"
            rel="noreferrer"
            className="rounded-lg border border-line bg-surface px-5 py-2.5 text-sm font-medium text-chalk transition-all hover:-translate-y-0.5 hover:border-accent/50"
          >
            GitHub ↗
          </a>
        </div>
      </div>
    </Reveal>
  );
}
