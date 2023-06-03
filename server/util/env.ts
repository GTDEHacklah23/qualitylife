//imports environment variables from appropriate file
//priority: prod.env > dev.env > local.env

import { existsSync } from "fs";
import { resolve } from "path";
import { config } from "dotenv";

const FILEPRIORITY = ["prod.env", "dev.env", "local.env"];

for (const filename of FILEPRIORITY) {
  const filePath = resolve("./", filename);
  const fileExists = existsSync(filePath);

  if (fileExists) {
    config({ path: filePath });
    break;
  }
}
