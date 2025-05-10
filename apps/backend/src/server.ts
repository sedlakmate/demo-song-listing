import { json, urlencoded } from "body-parser";
import express, { type Express, Request, Response } from "express";
import morgan from "morgan";
import cors from "cors";
import fs from "fs";
import path from "path";
import YAML from "yaml";
import swaggerUi from "swagger-ui-express";

const file = fs.readFileSync(path.join(__dirname, "openapi.yaml"), "utf-8");
const apiDoc = YAML.parse(file);

export const createServer = (): Express => {
  const app = express();
  app
    .disable("x-powered-by")
    .use(morgan("dev"))
    .use(urlencoded({ extended: true }))
    .use(json())
    .use(cors())
    .use("/api-docs", swaggerUi.serve, swaggerUi.setup(apiDoc))
    .get("/message/:name", (req, res) => {
      res.json({ message: `hello ${req.params.name}` });
    })
    .get("/status", (req: Request, res: Response) => {
      res.json({ ok: true });
    });

  return app;
};
