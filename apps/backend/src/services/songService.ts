import { v4 as uuidv4 } from "uuid";

// TODO: used automated tool like https://openapi-ts.dev/introduction
export interface Song {
  id: string;
  name: string;
  artist: string;
  imageUrl?: string;
}

// TODO: use persistent storage like a database
// In-memory storage
const songs: Song[] = [];

export const SongService = {
  getAll: (): Song[] => {
    return songs;
  },

  create: (name: string, artist: string, imageUrl?: string): Song => {
    const newSong: Song = { id: uuidv4(), name, artist, imageUrl };
    songs.push(newSong);
    return newSong;
  },

  delete: (id: string): boolean => {
    const index = songs.findIndex((song) => song.id === id);
    if (index === -1) return false;
    songs.splice(index, 1);
    return true;
  },
};
