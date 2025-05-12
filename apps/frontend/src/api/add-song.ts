import { Song } from '../types/song';

export async function addSong(song: { name: string; artist: string; file: File }): Promise<Song> {
  const host = process.env.NEXT_PUBLIC_API_HOST || 'http://localhost:3001';

  const formData = new FormData();
  formData.append('name', song.name);
  formData.append('artist', song.artist);
  formData.append('image', song.file);

  const res = await fetch(`${host}/songs`, {
    method: 'POST',
    body: formData,
  });

  if (!res.ok) {
    const msg = await res.text();
    throw new Error(`Failed to add song: ${res.status} — ${msg}`);
  }

  return res.json();
}
