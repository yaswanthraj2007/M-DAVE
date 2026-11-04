import Modal from "./Modal";

export default function DeleteDialog({ asset, open, onCancel, onConfirm }) {
  return (
    <Modal open={open && Boolean(asset)} onClose={onCancel} className="max-w-md">
      {asset && (
        <div className="p-6">
          <h2 className="text-lg font-bold text-zinc-200">Delete this asset?</h2>
          <p className="mt-2 text-sm text-zinc-400">
            <span className="font-medium text-zinc-300">{asset.name}</span> will be permanently
            removed. This can&apos;t be undone.
          </p>
          <div className="mt-6 flex justify-end gap-3">
            <button
              type="button"
              onClick={onCancel}
              className="rounded-lg border border-white/15 px-4 py-2 text-sm font-semibold text-zinc-300 transition hover:bg-white/5"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={() => onConfirm(asset)}
              className="rounded-lg bg-red-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-400"
            >
              Delete
            </button>
          </div>
        </div>
      )}
    </Modal>
  );
}