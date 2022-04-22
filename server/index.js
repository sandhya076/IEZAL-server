import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";
import form from "./ROutes/form.js";
import multer from "multer";
import formDetails from "./models/form.js"
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "./uploads");
  },
  filename: (req, file, callback) => {
    callback(null, file.originalname);
  },
});

export const upload = multer({
  storage: storage,
});
const app = express();
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.post("/form",upload.single("resume"),async(req,res)=>{
  // console.log(req.body)
   const newForm = new formDetails(req.body); // adds the data to existing table
  try{
      await newForm.save();// saves table
      res.status(200).json(newForm); // return the new table
  }
  catch(error) {
      res.status(404).json({message: error.message});
  }
})


app.use("/form", form);
// mongoose connection

const CONNECTION_URL =
  "mongodb+srv://sandhya:Sandhya@cluster0.trov7.mongodb.net/mySecondDatabase?retryWrites=true&w=majority";

const PORT = process.env.PORT || 5001;
mongoose
  .connect(CONNECTION_URL)
  .then(() =>
    app.listen(PORT, () => console.log(`server running on port : ${PORT}`))
  )
  .catch((error) => console.log(error.message));
