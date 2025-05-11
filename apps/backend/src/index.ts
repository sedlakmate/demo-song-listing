import { createServer } from "./server";
import { log } from "@repo/logger";

// TODO: used automated tool like https://openapi-ts.dev/introduction
export type Song = {
  id: string;
  name: string;
  artist: string;
};

// TODO: use persistent storage like a database
// In-memory storage
let songs: Song[] = [];

export function getSongsArray(): Song[] {
  return songs;
}

// This is super unsafe!!
// TODO: use proper service layer!
export function setSongsArray(newSongs: Song[]) {
  songs = newSongs;
}

const port = process.env.PORT || 3001;
const server = createServer();

server
  .then((it) => {
    it.listen(port, () => {
      log(`backend running on ${port}`);
    });
  })
  .catch((err) => {
    log("Error starting server", err);
    process.exit(1);
  });
