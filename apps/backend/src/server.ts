import { json, urlencoded } from "body-parser";
import express, { type Express, Request, Response } from "express";
import morgan from "morgan";
import cors from "cors";
import fs from "fs";
import path from "path";
import YAML from "yaml";
import swaggerUi from "swagger-ui-express";
import { log } from "@repo/logger";

function getApiDoc(fileName: string) {
  try {
    const file = fs.readFileSync(path.join(__dirname, fileName), "utf-8");
    return YAML.parse(file);
  } catch (error) {
    log("Error loading API documentation", error);
    return {};
  }
}

export const createServer = (): Express => {
  const app = express();
  app
    .disable("x-powered-by")
    .use(morgan("dev"))
    .use(urlencoded({ extended: true }))
    .use(json())
    .use(cors())
    .use(
      "/api-docs",
      swaggerUi.serve,
      swaggerUi.setup(getApiDoc("openapi.yaml")),
    )
    .get("/message/:name", (req, res) => {
      res.json({ message: `hello ${req.params.name}` });
    })
    .get("/status", (req: Request, res: Response) => {
      res.json({ ok: true });
    });

  return app;
};
