'use client';

import { type Song } from '../types/song';
import { useEffect, useState } from 'react';
import { sanitizeUrl } from '../utils/sanitize-url';
import Image from 'next/image';

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
          <div key={song.id} className="carousel-item flex justify-center">
            <div className="card card-side bg-base-200 w-full max-w-3xl shadow-xl">
              <figure className="w-1/3 min-w-[100px]">
                <Image
                  src={sanitizeUrl(`${host}/${song.imageUrl}`)}
                  alt={song.name}
                  width={300}
                  height={300}
                  unoptimized
                  className="h-full w-full object-cover"
                />
              </figure>
              <div className="card-body">
                <h2 className="card-title">{song.name}</h2>
                <p>{song.artist}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
