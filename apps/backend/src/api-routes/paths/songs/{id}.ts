import { Request, Response } from "express";
import { getSongsArray, setSongsArray, Song } from "../../../index";

// TODO: move logic to a service layer
module.exports = {
  async delete(req: Request, res: Response) {
    const { id } = req.params;
    const songs: Song[] = getSongsArray();
    const index = songs.findIndex((song) => song.id === id);

    if (index === -1) {
      return res.status(404).json({ message: "Song not found." });
    }

    songs.splice(index, 1);
    setSongsArray(songs);

    res.status(204).send();
  },
};
