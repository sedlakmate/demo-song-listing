import { json, urlencoded } from "body-parser";
import express, { type Express } from "express";
import morgan from "morgan";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import { initialize } from "express-openapi";
import path from "node:path";
import { log } from "@repo/logger";
import { prepareUploadsDir } from "./utils/init-uploads";
import { getApiDoc, multerErrorHandler, upload } from "./utils/openapi-helpers";

export const createServer = async (): Promise<Express> => {
  const uploadsDir = path.join(__dirname, "../uploads");
  prepareUploadsDir(uploadsDir);

  const apiDoc = getApiDoc(path.join(__dirname, "./api-routes/openapi.yaml"));
  const app = express();

  app
    .disable("x-powered-by")
    .use(morgan("dev"))
    .use(urlencoded({ extended: true }))
    .use(json())
    .use(cors())
    .use("/api-docs", swaggerUi.serve, swaggerUi.setup(apiDoc));

  // Initialize OpenAPI routes - it should happen after the middlewares but before the routes
  try {
    await initialize({
      app,
      apiDoc,
      paths: path.join(__dirname, "../dist/api-routes/paths"),
      validateApiDoc: true,
      consumesMiddleware: {
        "multipart/form-data": upload.single("image"),
      },
      errorMiddleware: (err, req, res, next) => {
        log("Error in OpenAPI middleware", err);
        if (err.status && err.errors) {
          res.status(err.status).json({ errors: err.errors });
        }
        next(err);
      },
    });
  } catch (error) {
    log(
      "Error initializing OpenAPI routes - this is expected and accepted during unit tests in pipelines",
      error,
    );
  }

  app
    .get("/status", (req, res) => {
      res.status(200).json({ ok: true });
    })
    .use("/uploads", express.static(uploadsDir))
    .use(multerErrorHandler);

  return app;
};
