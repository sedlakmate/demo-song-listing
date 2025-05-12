"use client";

import { type Song } from "../types/song";
import { useEffect, useState } from "react";
import { sanitizeUrl } from "../utils/sanitize-url";
import Image from "next/image";

export default function HomePage() {
  const host = process.env.NEXT_PUBLIC_API_HOST || "http://localhost:3001";
  const [songs, setSongs] = useState<Song[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(sanitizeUrl(`${host}/songs`))
      .then((res) => res.json())
      .then((data) => setSongs(data))
      .catch((err) => console.error("Failed to load songs:", err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="text-center mt-10">Loading songs...</div>;

  return (
    <div>
      <h1 className="text-3xl font-bold text-primary mb-5">List of songs</h1>
      <div className="carousel carousel-vertical w-full p-4 space-x-4 bg-neutral rounded-box">
        {songs.map((song) => (
          <div key={song.id} className="carousel-item w-full max-w-2xl m-2">
            <div className="card card-side bg-base-100 shadow-xl w-full">
              <figure className="w-1/3 min-w-[100px]">
                <Image
                  src={sanitizeUrl(`${host}/${song.imageUrl}`)}
                  alt={song.name}
                  width={100}
                  height={100}
                  unoptimized
                  className="object-cover w-full h-full"
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
