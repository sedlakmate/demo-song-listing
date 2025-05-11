import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import { getSongsArray, setSongsArray, Song } from "../../index";

// TODO: move logic to a service layer
module.exports = {
  async get(req: Request, res: Response) {
    const songs = getSongsArray();
    res.json(songs);
  },

  async post(req: Request, res: Response) {
    const { name, artist } = req.body;
    if (!name || !artist) {
      return res.status(400).json({ message: "Name and artist are required." });
    }
    const newSong: Song = { id: uuidv4(), name, artist };
    const songs = getSongsArray();
    songs.push(newSong);
    setSongsArray(songs);
    res.status(201).json(newSong);
  },
};
