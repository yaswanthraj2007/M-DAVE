import { IconDownload, IconTrash } from "@tabler/icons-react";
import { formatDate } from "@/lib/format";
import { downloadAsset } from "@/lib/download";

export default function AssetCard({ asset, onOpen, onDelete }) {
  return (
    <article className="group relative overflow-hidden rounded-2xl border border-white/10 bg-zinc-900/60 transition-colors hover:border-red-500/40">
      <button type="button" onClick={() => onOpen(asset)} className="block w-full text-left">
        <div className="aspect-3/4 w-full overflow-hidden bg-zinc-800">
          <img
            src={asset.src}
            alt={asset.name}
            loading="lazy"
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          />
        </div>
        <div className="p-4">
          <p className="truncate text-sm font-semibold text-zinc-200">{asset.name}</p>
          <p className="mt-1 text-xs text-zinc-500">{formatDate(asset.createdAt)}</p>
        </div>
      </button>

      <div className="absolute right-2 top-2 flex gap-2 opacity-0 transition group-hover:opacity-100 group-focus-within:opacity-100">
        <button
          type="button"
          onClick={() => downloadAsset(asset)}
          aria-label={`Download ${asset.name}`}
          className="rounded-lg bg-zinc-950/80 p-2 text-zinc-200 backdrop-blur transition hover:text-red-400"
        >
          <IconDownload className="size-4" />
        </button>
        <button
          type="button"
          onClick={() => onDelete(asset)}
          aria-label={`Delete ${asset.name}`}
          className="rounded-lg bg-zinc-950/80 p-2 text-zinc-200 backdrop-blur transition hover:text-red-400"
        >
          <IconTrash className="size-4" />
        </button>
      </div>
    </article>
  );
}
