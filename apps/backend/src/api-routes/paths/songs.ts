import { Request, Response } from "express";
import { SongService } from "../../services/songService";

module.exports = {
  async get(req: Request, res: Response) {
    const songs = SongService.getAll();
    res.json(songs);
  },

  async post(req: Request, res: Response) {
    const { name, artist } = req.body;
    const file = req.file;

    if (!name || !artist || !file) {
      return res
        .status(400)
        .json({ message: "Name, artist, and image are required." });
    }

    const imageUrl = `/uploads/${file.filename}`;
    const newSong = SongService.create({ name, artist, imageUrl });

    res.status(201).json(newSong);
  },
};
