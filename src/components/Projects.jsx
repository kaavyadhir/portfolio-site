import { motion } from "motion/react";
import { projects } from "../content.js";
import Reveal from "./Reveal.jsx";

function ProjectCard({ project, delay }) {
  return (
    <Reveal delay={delay}>
      <motion.article
        whileHover={{ y: -4 }}
        transition={{ type: "spring", stiffness: 300, damping: 24 }}
        className="flex h-full flex-col rounded-2xl border border-line bg-surface/40 p-5 transition-colors hover:border-accent/35 sm:p-7"
      >
        <h3 className="text-xl font-semibold tracking-tight sm:text-2xl">
          {project.name}
        </h3>
        <p className="mt-2 text-chalk/85 text-balance">{project.line}</p>

        {project.stats.length > 0 && (
          <div className="mt-5 flex flex-wrap gap-6 border-y border-line py-4">
            {project.stats.map((s) => (
              <div key={s.label}>
                <p className="tabular font-mono text-lg font-semibold text-chalk">
                  {s.value}
                </p>
                <p className="mt-0.5 text-xs text-fog">{s.label}</p>
              </div>
            ))}
          </div>
        )}

        <ul className="mt-5 space-y-3">
          {project.points.map((point) => (
            <li
              key={point.slice(0, 24)}
              className="flex gap-3 text-sm leading-relaxed text-fog"
            >
              <span aria-hidden="true" className="mt-2 h-px w-4 shrink-0 bg-accent/60" />
              {point}
            </li>
          ))}
        </ul>

        <ul className="mt-6 flex flex-wrap gap-1.5">
          {project.stack.map((tech) => (
            <li
              key={tech}
              className="rounded-md border border-line bg-raise/50 px-2.5 py-1 font-mono text-xs text-fog"
            >
              {tech}
            </li>
          ))}
        </ul>

        <div className="mt-6 flex flex-wrap gap-2 pt-1">
          {project.live && (
            <a
              href={project.live}
              target="_blank"
              rel="noreferrer"
              className="rounded-lg border border-accent/40 bg-accent/10 px-4 py-2 text-sm font-medium text-accent transition-colors hover:bg-accent/20"
            >
              {project.liveLabel ?? "Live"} ↗
            </a>
          )}
          <a
            href={project.repo}
            target="_blank"
            rel="noreferrer"
            className="rounded-lg border border-line bg-surface px-4 py-2 text-sm font-medium text-chalk transition-colors hover:border-accent/50"
          >
            Source
          </a>
        </div>
      </motion.article>
    </Reveal>
  );
}

export default function Projects() {
  return (
    <div className="mt-6 grid gap-6 lg:grid-cols-2">
      {projects.map((project, i) => (
        <ProjectCard key={project.name} project={project} delay={i * 0.08} />
      ))}
    </div>
  );
}
