// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { z, ZodError } from "zod";
import db from "../../db.json";
import { postSchema, saveDBChanges } from "@/utils";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    res.status(200).json(db.posts);
  }

  if (req.method === "POST") {
    try {
      const data = postSchema.parse(req.body);
      db.posts.push(data);
      saveDBChanges();

      res.status(200).json(data);
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).json(error.flatten());
      }
    }
  }
}
