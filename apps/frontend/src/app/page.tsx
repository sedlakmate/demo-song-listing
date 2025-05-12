'use client';

import { useEffect, useState } from 'react';
import { type Song } from '../types/song';
import { sanitizeUrl } from '../utils/sanitize-url';
import { SongCard } from './components/SongCard';
import { SongModal } from './components/SongModal';
import { addSong } from '../api/add-song';
import { deleteSongById } from '../api/delete-song';
import { ErrorMessage } from './components/ErrorMessage';

export default function HomePage() {
  const [songs, setSongs] = useState<Song[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setModalOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const host = process.env.NEXT_PUBLIC_API_HOST || 'http://localhost:3001';

  useEffect(() => {
    fetch(sanitizeUrl(`${host}/songs`))
      .then((res) => res.json())
      .then((data) => setSongs(data))
      .catch((err) => console.error('Failed to load songs:', err))
      .finally(() => setLoading(false));
  }, []);

  const handleAddSong = async (formData: { name: string; artist: string; file: File }) => {
    try {
      const newSong = await addSong(formData);
      setSongs((prev) => [...prev, newSong]);
      setModalOpen(false);
    } catch (err) {
      console.error(err);
      setError((err as Error).message);
    }
  };

  if (loading) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <span className="loading loading-spinner loading-xl text-primary" />
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between px-4">
        <h1 className="text-primary m-4 mb-2 text-3xl font-bold">List of songs</h1>
        <button onClick={() => setModalOpen(true)} className="btn btn-circle btn-outline">
          <svg
            className="h-6 w-6"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 5v14M5 12h14"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </div>
      <div className="carousel carousel-vertical flex-1 space-y-4 overflow-y-auto px-4">
        {songs.map((song) => (
          <SongCard
            key={song.id}
            song={song}
            onDelete={async () => {
              try {
                await deleteSongById(song.id);
                setSongs((prev) => prev.filter((s) => s.id !== song.id));
              } catch (err) {
                console.error(err);
                setError((err as Error).message);
              }
            }}
            onEdit={() => {
              alert(`Edit song "${song.name}"`);
            }}
          />
        ))}
      </div>
      <SongModal open={isModalOpen} onClose={() => setModalOpen(false)} onSubmit={handleAddSong} />
      {error && <ErrorMessage error={error} onClose={() => setError(null)} />}
    </div>
  );
}
