import express, { Request, Response } from "express";
import cors from "cors";
import multer from "multer";

const app = express();
const port = 5000;

const storage = multer.diskStorage({
  destination: (req: Request, file: any, cb) => {
    cb(null, "./src/uploads/");
    req.body.file = file;
    console.log(file);
  },
  filename: (req: Request, file, cb) => {
    cb(null, file.originalname);
    req.body.file = file;
  },
});

const upload = multer({ storage: storage });

app.use(cors());

app.post("/uploads", upload.single("file"), (req: Request, res: Response) => {
  res.json({});
  console.log(req.file);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
