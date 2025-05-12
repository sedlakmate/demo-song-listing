'use client';

import { type Song } from '../types/song';
import { useEffect, useState } from 'react';
import { sanitizeUrl } from '../utils/sanitize-url';
import { SongCard } from './components/songCard';

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

  if (loading) return <div className="mt-10 text-center">Loading songs...</div>;

  return (
    <div className="flex h-full flex-col">
      <h1 className="text-primary mb-2 p-4 text-3xl font-bold">List of songs</h1>
      <div className="carousel carousel-vertical flex-1 space-y-4 overflow-y-auto px-4">
        {songs.map((song) => (
          <SongCard key={song.id} song={song} />
        ))}
      </div>
    </div>
  );
}
