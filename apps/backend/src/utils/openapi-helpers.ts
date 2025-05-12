import { ErrorRequestHandler, Request as MulterRequest } from "express";
import YAML from "yaml";
import * as fs from "node:fs";
import { log } from "@repo/logger";
import multer, { FileFilterCallback } from "multer";

export function getApiDoc(fileName: string) {
  try {
    const file = fs.readFileSync(fileName, "utf-8");
    return YAML.parse(file);
  } catch (error) {
    log("Error loading API documentation", error);
    return {};
  }
}

// File size and type validation
export const upload = multer({
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

export const multerErrorHandler: ErrorRequestHandler = (
  err,
  req,
  res,
  next,
) => {
  if (err.code === "LIMIT_FILE_SIZE") {
    res
      .status(413)
      .json({ message: "Image file is too large. Max size is 2MB." });
  }
  next(err);
};
