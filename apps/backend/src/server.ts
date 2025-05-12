import { json, urlencoded } from "body-parser";
import express, {
  ErrorRequestHandler,
  Request as MulterRequest,
  type Express,
} from "express";
import morgan from "morgan";
import YAML from "yaml";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import { initialize } from "express-openapi";
import * as fs from "node:fs";
import path from "node:path";
import { log } from "@repo/logger";
import multer, { FileFilterCallback } from "multer";

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

  // File size and type validation
  const upload = multer({
    dest: "uploads/",
    limits: {
      fileSize: 2 * 1024 * 1024, // 2MB in bytes
    },
    fileFilter: (
      req: MulterRequest,
      file: Express.Multer.File,
      cb: FileFilterCallback,
    ) => {
      if (!file.mimetype.startsWith("image/")) {
        return cb(new Error("Only image files are allowed"));
      }
      cb(null, true);
    },
  });

  const multerErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
    if (err.code === "LIMIT_FILE_SIZE") {
      res
        .status(413)
        .json({ message: "Image file is too large. Max size is 2MB." });
    }
    next(err);
  };

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

  app.get("/status", (req, res) => {
    res.status(200).json({ ok: true });
  });

  app.use(multerErrorHandler);

  return app;
};
