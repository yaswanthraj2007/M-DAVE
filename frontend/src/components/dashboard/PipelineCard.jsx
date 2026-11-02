import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { cn } from "../../lib/utils";

export default function PipelineCard({
  eyebrow,
  title,
  eyebrowClassName,
  hoverBorderClassName,
  description,
  buttonLabel,
  buttonTo = "#",
  buttonClassName,
  children,
}) {
  return (
    <section
      className={cn(
        "group w-full rounded-2xl border border-white/10 bg-zinc-900/60 p-6 transition-colors duration-300 sm:p-8",
        hoverBorderClassName
      )}
    >
      <header className="mb-6">
        <p className={cn("text-xs font-semibold uppercase tracking-widest", eyebrowClassName)}>
          {eyebrow}
        </p>
        <h2 className="mt-1 text-xl font-bold text-zinc-200 sm:text-2xl">{title}</h2>
      </header>

      {/* Top: beam diagram (always visible, fixed height so expansion never shifts it) */}
      <div className="relative">{children}</div>

      {/* Bottom: expandable passage */}
      <div
        className="grid grid-rows-[0fr] overflow-hidden opacity-0 transition-all duration-500 ease-in-out group-hover:mt-6 group-hover:grid-rows-[1fr] group-hover:opacity-100 group-focus-within:mt-6 group-focus-within:grid-rows-[1fr] group-focus-within:opacity-100"
      >
        <div className="overflow-hidden">
          <p className="w-full text-base leading-relaxed text-white sm:text-lg">
            {description}
          </p>
          <div className="mt-5 flex justify-end">
            <Link
              to={buttonTo}
              className={cn(
                "inline-flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-semibold transition",
                buttonClassName
              )}
            >
              {buttonLabel} <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
