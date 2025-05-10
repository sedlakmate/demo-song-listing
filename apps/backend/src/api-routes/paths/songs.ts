import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";

interface Song {
  id: string;
  name: string;
  artist: string;
}

// Simple in-memory storage
const songs: Song[] = [];

export default {
  // GET /songs
  async getSongs(req: Request, res: Response) {
    res.json(songs);
  },

  // POST /songs
  async addSong(req: Request, res: Response) {
    const { name, artist } = req.body;

    if (!name || !artist) {
      return res.status(400).json({ message: "Name and artist are required." });
    }

    const newSong: Song = {
      id: uuidv4(),
      name,
      artist,
    };

    songs.push(newSong);
    res.status(201).json(newSong);
  },

  // DELETE /songs/:id
  async deleteSong(req: Request, res: Response) {
    const { id } = req.params;
    const index = songs.findIndex((song) => song.id === id);

    if (index === -1) {
      return res.status(404).json({ message: "Song not found." });
    }

    songs.splice(index, 1);
    res.status(204).send();
  },
};
