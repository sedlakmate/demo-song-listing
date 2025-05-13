import { useState } from 'react';

export function SongModal({
  open,
  onClose,
  onSubmit,
}: {
  open: boolean;
  onClose: () => void;
  // eslint-disable-next-line no-unused-vars
  onSubmit: (_: { name: string; artist: string; file: File }) => void;
}) {
  const [form, setForm] = useState({
    name: '',
    artist: '',
    file: null as File | null,
  });

  return (
    <>
      <input
        type="checkbox"
        id="song-modal"
        className="modal-toggle"
        checked={open}
        onChange={onClose}
      />
      <div className="modal">
        <div className="modal-box relative">
          <button
            onClick={() => {
              setForm({ name: '', artist: '', file: null });
              onClose();
            }}
            className="btn btn-sm btn-circle btn-ghost absolute top-2 right-2"
          >
            ✕
          </button>
          <h3 className="mb-4 text-lg font-bold">Add New Song</h3>

          <fieldset className="space-y-4">
            <div>
              <label className="label">
                <span className="label-text">Song Title</span>
              </label>
              <input
                type="text"
                className="input input-bordered w-full"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
            </div>

            <div>
              <label className="label">
                <span className="label-text">Artist</span>
              </label>
              <input
                type="text"
                className="input input-bordered w-full"
                value={form.artist}
                onChange={(e) => setForm({ ...form, artist: e.target.value })}
              />
            </div>

            <div>
              <label className="label">
                <span className="label-text">Album Cover</span>
              </label>
              <input
                type="file"
                accept="image/*"
                className="file-input file-input-bordered w-full"
                onChange={(e) => setForm({ ...form, file: e.target.files?.[0] ?? null })}
              />
            </div>
          </fieldset>

          <div className="modal-action">
            <button
              className="btn btn-primary"
              onClick={() => {
                const coverImage = form.file;
                if (coverImage === null) {
                  // Submit button is not active unless file is provided. This branch should never be reached.
                  console.warn('File is null');
                } else {
                  onSubmit({ ...form, file: coverImage });
                  setForm({ name: '', artist: '', file: null });
                }
              }}
              disabled={!form.name || !form.artist || form.file === null}
            >
              Add Song
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
