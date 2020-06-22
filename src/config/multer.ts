import multer from "multer";
import { Request } from "express";
import path from "path";

export const fileUploadOptions = {
  options: {
    storage: multer.diskStorage({
      destination: (req: any, file: any, cb: any) => {
        cb(null, __dirname + "../../../temp");
      },
      filename: (req: Request, file: Express.Multer.File, cb: any) => {
        cb(null, Date.now().toString() + path.extname(file.originalname));
      },
    }),
    fileFilter: (req: any, file: any, cb: any) => {
      cb(null, true);
    },
    limits: {
      fieldNameSize: 255,
      fileSize: 1024 * 1024 * 100,
    },
  },
};
