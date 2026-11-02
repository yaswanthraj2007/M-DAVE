import { forwardRef } from "react";
import { cn } from "../../lib/utils";

const PipelineNode = forwardRef(function PipelineNode(
  { icon: Icon, label, className, iconClassName, size = "md" },
  ref
) {
  const sizes = {
    md: "size-14 sm:size-16",
    lg: "size-18 sm:size-20",
  };

  return (
    <div className="flex flex-col items-center gap-2">
      <div
        ref={ref}
        className={cn(
          "z-10 flex items-center justify-center rounded-full border-2 bg-zinc-950 p-3 shadow-[0_0_20px_-12px_rgba(0,0,0,0.8)]",
          sizes[size],
          className
        )}
      >
        <Icon className={cn("size-full", iconClassName)} />
      </div>
      <span className="max-w-24 text-center text-[11px] font-medium leading-tight text-zinc-400 sm:text-xs">
        {label}
      </span>
    </div>
  );
});

export default PipelineNode;
