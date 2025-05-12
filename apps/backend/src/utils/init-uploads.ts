import fs from "fs";

export function prepareUploadsDir(uploadsDir: string) {
  if (fs.existsSync(uploadsDir)) {
    try {
      fs.rmSync(uploadsDir, { recursive: true, force: true });
    } catch (err) {
      console.error("Failed to remove uploads folder:", err);
    }
  }

  try {
    fs.mkdirSync(uploadsDir, { recursive: true });
    fs.chmodSync(uploadsDir, 0o777); // Optional: ensure full access
  } catch (err) {
    console.error("Failed to create uploads folder:", err);
  }
}
