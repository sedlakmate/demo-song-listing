'use client';

import { type Song } from '../types/song';
import { useEffect, useState } from 'react';
import { sanitizeUrl } from '../utils/sanitize-url';
import { SongCard } from './components/songCard';
import { deleteSongById } from '../utils/delete-song';

export default function HomePage() {
  const host = process.env.NEXT_PUBLIC_API_HOST || 'http://localhost:3001';
  const [songs, setSongs] = useState<Song[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(sanitizeUrl(`${host}/songs`))
      .then((res) => res.json())
      .then((data) => setSongs(data))
      .catch((err) => console.error('Failed to load songs:', err))
      .finally(() => setLoading(false));
  }, []);

  if (loading)
    return (
      <div className="flex h-full w-full items-center justify-center">
        <span className="loading loading-spinner loading-xl text-primary" />
      </div>
    );

  return (
    <div className="flex h-full flex-col">
      <h1 className="text-primary mb-2 p-4 text-3xl font-bold">List of songs</h1>
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
                alert('Failed to delete song');
              }
            }}
            onEdit={() => {
              alert(`Edit song "${song.name}"`);
            }}
          />
        ))}
      </div>
    </div>
  );
}
