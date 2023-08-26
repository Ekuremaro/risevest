import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export class MiddleWare {
  constructor() {}
  async authMiddleware(req: Request, res: Response, next: NextFunction) {
    try {
      const token = req.headers.authorization?.split(" ")[1];
      if (!token) {
        return res.status(401).json({ message: "No token provided" });
      }
      const SECRET_KEY = "YmFzZTY0IGVuY29kZWQgc3RyaW5n";
      new Promise((resolve, reject) => {
        console.log("validating token");
        jwt.verify(token, SECRET_KEY, (err, user) => {
          if (err) reject(err);
          console.log(err);
          resolve(user);
        });
      })
        .then((user) => {
          req.user = user;
          next();
        })
        .catch((err) => {
          res.status(401).json({ message: err.message });
        });
    } catch (err: any) {
      res.status(401).json({ message: err.message });
    }
  }
}
