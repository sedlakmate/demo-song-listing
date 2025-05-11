import { Request, Response } from "express";
import { SongService } from "../../services/songService";

module.exports = {
  async get(req: Request, res: Response) {
    const songs = SongService.getAll();
    res.json(songs);
  },

  async post(req: Request, res: Response) {
    const { name, artist } = req.body;
    if (!name || !artist) {
      return res.status(400).json({ message: "Name and artist are required." });
    }

    const newSong = SongService.create(name, artist);
    res.status(201).json(newSong);
  },
};
