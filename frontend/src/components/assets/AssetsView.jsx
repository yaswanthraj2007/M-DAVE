import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { IconArrowLeft, IconPhoto, IconSearch, IconSparkles } from "@tabler/icons-react";
import { MOCK_ASSETS } from "@/data/mockAssets";
import AssetCard from "@/components/assets/AssetCard";
import AssetPreviewDialog from "@/components/assets/AssetPreviewDialog";
import DeleteDialog from "@/components/assets/DeleteDialog";
import { cn } from "@/lib/utils";

const NewGenerationLink = () => (
  <Link
    to="/generate"
    className="inline-flex items-center gap-2 rounded-lg bg-red-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-400"
  >
    <IconSparkles className="size-4" /> New generation
  </Link>
);

export default function AssetsView({ embedded = false }) {
  // TODO: replace with GET /api/assets when the backend is ready
  const [assets, setAssets] = useState(MOCK_ASSETS);
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("newest");
  const [preview, setPreview] = useState({ asset: null, open: false });
  const [del, setDel] = useState({ asset: null, open: false });

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return assets
      .filter((a) => a.name.toLowerCase().includes(q))
      .sort((a, b) =>
        sort === "newest"
          ? new Date(b.createdAt) - new Date(a.createdAt)
          : new Date(a.createdAt) - new Date(b.createdAt)
      );
  }, [assets, query, sort]);

  const openPreview = (asset) => setPreview({ asset, open: true });
  const closePreview = () => setPreview((p) => ({ ...p, open: false }));

  const requestDelete = (asset) => {
    closePreview();
    setDel({ asset, open: true });
  };
  const cancelDelete = () => setDel((d) => ({ ...d, open: false }));
  const confirmDelete = (asset) => {
    // TODO: await axios.delete(`/api/assets/${asset.id}`)
    setAssets((prev) => prev.filter((a) => a.id !== asset.id));
    cancelDelete();
  };

  return (
    <div>
      {!embedded && (
        <div className="flex items-center justify-between">
          <Link
            to="/dashboard"
            className="inline-flex items-center gap-2 text-sm text-zinc-400 transition hover:text-red-500"
          >
            <IconArrowLeft className="size-4" /> Back to dashboard
          </Link>
          <NewGenerationLink />
        </div>
      )}

      <header
        className={cn(
          "flex flex-wrap items-end justify-between gap-4",
          !embedded && "mt-6"
        )}
      >
        <div>
          <h1 className="text-3xl font-bold text-zinc-200 sm:text-4xl">Assets</h1>
          <p className="mt-2 max-w-2xl text-sm text-zinc-400 sm:text-base">
            Every image you generate is saved here, watermarked and C2PA-signed.
          </p>
        </div>
        {embedded && <NewGenerationLink />}
      </header>

      {/* Toolbar */}
      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full sm:max-w-xs">
          <IconSearch className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-zinc-500" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search assets"
            className="w-full rounded-lg border border-white/10 bg-zinc-900/60 py-2 pl-9 pr-3 text-sm text-zinc-200 outline-none transition placeholder:text-zinc-500 focus:border-red-500/60"
          />
        </div>

        <div className="flex items-center justify-between gap-4 sm:justify-end">
          <p className="text-sm text-zinc-500">
            {visible.length} {visible.length === 1 ? "asset" : "assets"}
          </p>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            aria-label="Sort assets"
            className="rounded-lg border border-white/10 bg-zinc-900/60 px-3 py-2 text-sm text-zinc-200 outline-none [color-scheme:dark] focus:border-red-500/60"
          >
            <option value="newest">Newest first</option>
            <option value="oldest">Oldest first</option>
          </select>
        </div>
      </div>

      {/* Grid / empty states */}
      {visible.length > 0 ? (
        <section className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {visible.map((asset) => (
            <AssetCard key={asset.id} asset={asset} onOpen={openPreview} onDelete={requestDelete} />
          ))}
        </section>
      ) : (
        <section className="mt-6 flex flex-col items-center rounded-2xl border border-dashed border-white/15 bg-zinc-900/60 px-6 py-20 text-center">
          <IconPhoto className="size-10 text-zinc-600" />
          {assets.length === 0 ? (
            <>
              <h2 className="mt-4 text-lg font-semibold text-zinc-200">No assets yet</h2>
              <p className="mt-1 max-w-sm text-sm text-zinc-400">
                Images you generate will show up here.
              </p>
              <Link
                to="/generate"
                className="mt-6 inline-flex items-center gap-2 rounded-lg bg-red-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-400"
              >
                <IconSparkles className="size-4" /> Generate your first image
              </Link>
            </>
          ) : (
            <>
              <h2 className="mt-4 text-lg font-semibold text-zinc-200">No matches</h2>
              <p className="mt-1 text-sm text-zinc-400">Try a different search term.</p>
            </>
          )}
        </section>
      )}

      <AssetPreviewDialog
        asset={preview.asset}
        open={preview.open}
        onClose={closePreview}
        onDelete={requestDelete}
      />
      <DeleteDialog
        asset={del.asset}
        open={del.open}
        onCancel={cancelDelete}
        onConfirm={confirmDelete}
      />
    </div>
  );
}