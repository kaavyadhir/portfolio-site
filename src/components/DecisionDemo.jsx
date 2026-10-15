import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { demo } from "../content.js";
import useCountUp from "../hooks/useCountUp.js";

const statusStyle = {
  met: "border-accent/40 bg-accent/10 text-accent",
  unknown: "border-warn/40 bg-warn/10 text-warn",
  not_met: "border-red-400/40 bg-red-400/10 text-red-300",
};

const statusLabel = {
  met: "met",
  unknown: "unknown",
  not_met: "not met",
};

function Criterion({ criterion, index }) {
  return (
    <li className="flex items-start justify-between gap-3 border-b border-line/70 py-3 last:border-0">
      <span className="flex gap-2.5 text-sm text-chalk/90">
        <span className="font-mono text-xs text-fog">{index + 1}</span>
        {criterion.text}
      </span>

      {/* The chip is keyed by status, so changing status swaps the chip
          rather than recolouring it — the movement is what you notice. */}
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={criterion.status}
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 6 }}
          transition={{ duration: 0.25 }}
          className={`shrink-0 rounded-full border px-2.5 py-0.5 font-mono text-[11px] ${statusStyle[criterion.status]}`}
        >
          {statusLabel[criterion.status]}
        </motion.span>
      </AnimatePresence>
    </li>
  );
}

export default function DecisionDemo() {
  // true  = the supervised-diet sentence has been removed
  const [removed, setRemoved] = useState(false);

  const state = removed ? demo.states.escalate : demo.states.approve;
  const warn = state.tone === "warn";

  const confidence = useCountUp(state.confidence);

  return (
    <div className="overflow-hidden rounded-2xl border border-line bg-surface">
      {/* ---- header ---- */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line bg-raise/60 px-5 py-3">
        <div className="min-w-0">
          <p className="font-mono text-[11px] tracking-wider text-fog uppercase">
            Governing policy
          </p>
          <p className="truncate text-sm text-chalk">{demo.policy}</p>
        </div>
        <div className="text-right">
          <p className="font-mono text-[11px] tracking-wider text-fog uppercase">
            Request
          </p>
          <p className="text-sm text-chalk">{demo.request}</p>
        </div>
      </div>

      <div className="grid gap-px bg-line md:grid-cols-2">
        {/* ---- left: the note ---- */}
        <div className="bg-surface p-5">
          <p className="mb-3 font-mono text-[11px] tracking-wider text-fog uppercase">
            Clinical note
          </p>

          <p className="text-sm leading-relaxed text-chalk/85">
            {demo.note.before}

            <motion.span
              animate={{
                opacity: removed ? 0.35 : 1,
                color: removed ? "var(--color-fog)" : "var(--color-chalk)",
              }}
              transition={{ duration: 0.35 }}
              className={removed ? "line-through decoration-warn/70" : ""}
            >
              {demo.note.toggled}
            </motion.span>

            {demo.note.after}
          </p>

          <label className="mt-6 flex cursor-pointer items-center gap-3 rounded-lg border border-line bg-raise/50 p-3 transition-colors hover:border-accent/40">
            <input
              type="checkbox"
              checked={removed}
              onChange={(e) => setRemoved(e.target.checked)}
              className="peer sr-only"
            />
            <span className="relative h-5 w-9 shrink-0 rounded-full bg-line transition-colors peer-checked:bg-warn/70">
              <motion.span
                animate={{ left: removed ? 18 : 2 }}
                transition={{ type: "spring", stiffness: 500, damping: 32 }}
                className="absolute top-0.5 h-4 w-4 rounded-full bg-chalk"
                style={{ left: 2 }}
              />
            </span>
            <span className="text-sm text-chalk/90">{demo.toggleLabel}</span>
          </label>
        </div>

        {/* ---- right: the evaluation ---- */}
        <div className="bg-surface p-5">
          <p className="mb-3 font-mono text-[11px] tracking-wider text-fog uppercase">
            Criteria
          </p>

          <ul className="mb-5">
            {state.criteria.map((criterion, i) => (
              <Criterion key={criterion.text} criterion={criterion} index={i} />
            ))}
          </ul>

          {/* confidence */}
          <div className="mb-4">
            <div className="mb-1.5 flex items-baseline justify-between">
              <span className="font-mono text-[11px] tracking-wider text-fog uppercase">
                Confidence
              </span>
              <span
                className={`tabular font-mono text-2xl font-semibold transition-colors duration-500 ${
                  warn ? "text-warn" : "text-accent"
                }`}
              >
                {confidence}%
              </span>
            </div>

            <div className="h-1.5 overflow-hidden rounded-full bg-line">
              <motion.div
                animate={{ width: `${state.confidence}%` }}
                transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                className={`h-full rounded-full transition-colors duration-500 ${
                  warn ? "bg-warn" : "bg-accent"
                }`}
              />
            </div>

            <p className="tabular mt-2 font-mono text-[11px] text-fog">
              {state.resolved} criteria resolved
            </p>
          </div>

          {/* verdict */}
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={state.verdict}
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.3 }}
              className={`rounded-lg border px-4 py-3 ${
                warn
                  ? "border-warn/40 bg-warn/10"
                  : "border-accent/40 bg-accent/10"
              }`}
            >
              <p
                className={`font-mono text-sm font-semibold tracking-wide ${
                  warn ? "text-warn" : "text-accent"
                }`}
              >
                {state.verdict}
              </p>
              <p className="mt-1.5 text-sm leading-relaxed text-chalk/80">
                {state.explain}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <p className="border-t border-line bg-raise/40 px-5 py-3 text-xs leading-relaxed text-fog">
        One sentence leaves the note and the verdict changes — not because the
        model grew less certain, but because a criterion became undocumented.
        Unknown is not a denial.
      </p>
    </div>
  );
}
