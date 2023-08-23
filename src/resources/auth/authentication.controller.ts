import express from "express";
import { getUserByEmail } from "@/resources/user/user.model";

export const register = async (req: express.Request, res: express.Response) => {
  try {
    const { email, password, username } = req.body;

    if (!email || !password || !username) {
      return res.sendStatus(422);
    }

    const existingUser = await getUserByEmail(email);
  } catch (e) {
    console.log(e);
    return res.sendStatus(400);
  }
};
