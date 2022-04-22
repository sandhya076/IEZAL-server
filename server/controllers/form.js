import mongoose from "mongoose";
import formDetails from "../models/form.js";


export const getForm = async (req, res) => {
  try {
    const form = await formDetails.find();
    res.status(200).json(form);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createForm = async (req, res) => {
  const form = req.body; // stores data given by client
  const newForm = new formDetails(form); // adds the data to existing table
  try{
      await newForm.save();// saves table
      res.status(200).json(newForm); // return the new table
  }
  catch(error) {
      res.status(404).json({message: error.message});

  }
};


export const updateForm = async (req, res) => {
  const { id: id } = req.params;
  const form = req.body;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ message: "There is no form with that id" });
  }
  const updatedForm = await formDetails.findByIdAndUpdate(id, { ...form, id });
  res.json(updatedForm);
};

export const deleteForm = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ message: "There is no form with that id" });
  }
  await formDetails.findByIdAndRemove(id);
  res.json({ message: "form deleted successfully" });
};
