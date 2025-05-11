import { Request, Response } from "express";
import { SongService } from "../../../services/songService";

module.exports = {
  async delete(req: Request, res: Response) {
    const { id } = req.params as { id: string };
    const success = SongService.delete(id);
    if (!success) {
      return res.status(404).json({ message: "Song not found." });
    }
    res.status(204).send();
  },
};
