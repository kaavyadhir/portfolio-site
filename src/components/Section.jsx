import Reveal from "./Reveal.jsx";

/** A titled band of the page, with a consistent heading treatment. */
export default function Section({ id, label, title, children, className = "" }) {
  return (
    <section id={id} className={`scroll-mt-24 py-16 sm:py-24 ${className}`}>
      <div className="shell">
        <Reveal>
          <div className="mb-8 flex items-baseline gap-4">
            <span className="font-mono text-[11px] tracking-widest text-accent uppercase">
              {label}
            </span>
            <span aria-hidden="true" className="h-px flex-1 bg-line" />
          </div>
          {title && (
            <h2 className="max-w-2xl text-2xl font-semibold tracking-tight text-balance sm:text-4xl">
              {title}
            </h2>
          )}
        </Reveal>
        {children}
      </div>
    </section>
  );
}
