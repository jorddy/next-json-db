import fs from "fs";
import path from "path";
import db from "./db.json";
import { z } from "zod";

export const postSchema = z.object({
  title: z.string().min(1)
});

export type Post = z.infer<typeof postSchema>;

export const saveDBChanges = () => {
  fs.writeFileSync(path.resolve("src/db.json"), JSON.stringify(db, null, 4));
};
