import { createServer } from "./server";
import { log } from "@repo/logger";

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
