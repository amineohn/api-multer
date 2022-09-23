import express, { Request, Response } from "express";
import cors from "cors";
import multer from "multer";
import fs from "fs";

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
  res.setHeader("Access-Control-Allow-Origin", "*");
  const { id } = req.query;
  res.status(200).send({ message: "File uploaded successfully" });
  if (req.body.file.mimetype === "application/pdf") {
    fs.renameSync(
      `./src/uploads/${req.body.file.originalname}`,
      `./src/uploads/upload-${id}.pdf`
    );
  } else if (req.body.file.mimetype === "text/csv") {
    fs.renameSync(
      `./src/uploads/${req.body.file.originalname}`,
      `./src/uploads/upload-${id}.csv`
    );
  }
  console.log(req.file);
});
app.get("/read", upload.single("file"), (req: Request, res: Response) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  const { id } = req.query;
  if (req.body.file.mimetype === "application/pdf") {
    fs.readFileSync(`./src/uploads/upload-${id}.pdf`);
    res.status(200).send({ message: "File read successfully" });
  } else if (req.body.file.mimetype === "text/csv") {
    fs.readFileSync(`./src/uploads/upload-${id}.csv`);
    res.status(200).send({ message: "File read successfully" });
  }
});
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
