export async function deleteSongById(id: string): Promise<void> {
  const host = process.env.NEXT_PUBLIC_API_HOST || 'http://localhost:3001';
  const res = await fetch(`${host}/songs/${id}`, { method: 'DELETE' });
  if (!res.ok) {
    throw new Error(`Failed to delete song: ${res.status}`);
  }
}
