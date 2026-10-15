import { motion } from "motion/react";
import { person } from "../content.js";

const rise = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.15 } },
};

const contacts = [
  { href: person.github, label: "GitHub" },
  { href: person.linkedin, label: "LinkedIn" },
  { href: person.resume, label: "Résumé" },
  { href: `mailto:${person.email}`, label: "Email" },
];

export default function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-[88svh] items-center overflow-hidden pt-28 pb-20"
    >
      {/* A single soft teal wash behind the name. No particles, no gimmicks. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 left-1/2 h-[34rem] w-[46rem] -translate-x-1/2 rounded-full bg-accent/10 blur-[120px]"
      />

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="shell relative"
      >
        <motion.p
          variants={rise}
          className="mb-6 font-mono text-xs tracking-widest text-accent uppercase"
        >
          Software engineer
        </motion.p>

        <motion.h1
          variants={rise}
          className="max-w-3xl text-4xl leading-[1.05] font-semibold tracking-tight text-balance sm:text-6xl md:text-7xl"
        >
          {person.name}
        </motion.h1>

        <motion.p
          variants={rise}
          className="mt-6 max-w-2xl text-xl leading-snug text-chalk/90 text-balance sm:text-2xl"
        >
          {person.tagline}
        </motion.p>

        <motion.p
          variants={rise}
          className="mt-5 max-w-xl text-base leading-relaxed text-fog"
        >
          {person.blurb}
        </motion.p>

        <motion.div variants={rise} className="mt-9 flex flex-wrap gap-2">
          {contacts.map((c) => (
            <a
              key={c.label}
              href={c.href}
              target={c.href.startsWith("mailto:") ? undefined : "_blank"}
              rel="noreferrer"
              className="group rounded-lg border border-line bg-surface/60 px-4 py-2 text-sm text-chalk transition-all hover:-translate-y-0.5 hover:border-accent/50 hover:bg-raise"
            >
              {c.label}
              <span className="ml-1.5 inline-block text-fog transition-transform group-hover:translate-x-0.5 group-hover:text-accent">
                ↗
              </span>
            </a>
          ))}
        </motion.div>
      </motion.div>

      <motion.a
        href="#work"
        aria-label="Scroll to work"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 text-fog transition-colors hover:text-accent sm:block"
      >
        <motion.span
          animate={{ y: [0, 7, 0] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
          className="block font-mono text-xs"
        >
          ↓
        </motion.span>
      </motion.a>
    </section>
  );
}
