import { json, urlencoded } from "body-parser";
import express, { type Express } from "express";
import morgan from "morgan";
import YAML from "yaml";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import { initialize } from "express-openapi";
import * as fs from "node:fs";
import path from "node:path";
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

export const createServer = async (): Promise<Express> => {
  const apiDoc = getApiDoc("./api-routes/openapi.yaml");

  const app = express();

  app
    .disable("x-powered-by")
    .use(morgan("dev"))
    .use(urlencoded({ extended: true }))
    .use(json())
    .use(cors())
    .use("/api-docs", swaggerUi.serve, swaggerUi.setup(apiDoc));

  try {
    await initialize({
      app,
      apiDoc,
      paths: path.join(__dirname, "../dist/api-routes/paths"),
    });
  } catch (error) {
    log(
      "Error initializing OpenAPI routes - this is expected and accepted during unit tests in pipelines",
      error,
    );
  }

  app.get("/status", (req, res) => {
    res.status(200).json({ ok: true });
  });

  return app;
};
