import { useState } from "react";
import {
  IconCertificate,
  IconCheck,
  IconCopy,
  IconDownload,
  IconDroplet,
  IconTrash,
} from "@tabler/icons-react";
import Modal from "./Modal";
import { formatDate } from "@/lib/format";
import { downloadAsset } from "@/lib/download";

export default function AssetPreviewDialog({ asset, open, onClose, onDelete }) {
  const [copied, setCopied] = useState(false);

  const copyHash = async () => {
    try {
      await navigator.clipboard.writeText(asset.sha256);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      /* clipboard unavailable */
    }
  };

  const rows = asset
    ? [
        ["Created", formatDate(asset.createdAt)],
        ["Resolution", `${asset.width} × ${asset.height}`],
        ["File size", `${asset.sizeMB.toFixed(2)} MB`],
      ]
    : [];

  return (
    <Modal open={open && Boolean(asset)} onClose={onClose} className="max-w-4xl">
      {asset && (
        <div className="grid md:grid-cols-[3fr_2fr]">
          <div className="bg-zinc-950">
            <img src={asset.src} alt={asset.name} className="mx-auto max-h-[80vh] w-full object-contain" />
          </div>

          <div className="flex flex-col gap-5 p-6">
            <div>
              <h2 className="pr-8 text-lg font-bold text-zinc-200">{asset.name}</h2>
              <div className="mt-3 flex flex-wrap gap-2">
                {asset.watermarked && (
                  <span className="inline-flex items-center gap-1 rounded-full border border-red-500/40 bg-red-500/10 px-3 py-1 text-xs font-medium text-red-400">
                    <IconDroplet className="size-3.5" /> Watermarked
                  </span>
                )}
                {asset.c2pa && (
                  <span className="inline-flex items-center gap-1 rounded-full border border-red-500/40 bg-red-500/10 px-3 py-1 text-xs font-medium text-red-400">
                    <IconCertificate className="size-3.5" /> C2PA signed
                  </span>
                )}
              </div>
            </div>

            <dl className="space-y-3 text-sm">
              {rows.map(([label, value]) => (
                <div key={label} className="flex justify-between gap-4">
                  <dt className="text-zinc-500">{label}</dt>
                  <dd className="text-right text-zinc-300">{value}</dd>
                </div>
              ))}
            </dl>

            <div>
              <p className="text-sm text-zinc-500">SHA-256</p>
              <div className="mt-1 flex items-center gap-2 rounded-lg border border-white/10 bg-zinc-950/60 p-2">
                <code className="min-w-0 flex-1 truncate text-xs text-zinc-400">{asset.sha256}</code>
                <button
                  type="button"
                  onClick={copyHash}
                  aria-label="Copy hash"
                  className="shrink-0 text-zinc-400 transition hover:text-red-400"
                >
                  {copied ? <IconCheck className="size-4" /> : <IconCopy className="size-4" />}
                </button>
              </div>
            </div>

            <div className="mt-auto flex gap-3 pt-2">
              <button
                type="button"
                onClick={() => downloadAsset(asset)}
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg bg-red-500 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-red-400"
              >
                <IconDownload className="size-4" /> Download
              </button>
              <button
                type="button"
                onClick={() => onDelete(asset)}
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/15 px-4 py-2.5 text-sm font-semibold text-zinc-300 transition hover:border-red-500/50 hover:text-red-400"
              >
                <IconTrash className="size-4" /> Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </Modal>
  );
}