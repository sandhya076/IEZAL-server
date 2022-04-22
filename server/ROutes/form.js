import express from 'express'
import { getForm,createForm,updateForm,deleteForm } from '../controllers/form.js'
// import{ upload } from "../index.js"

const router = express.Router()
router.get("/",getForm)
router.post("/",createForm)
router.patch("/:id",updateForm)
router.delete("/:id",deleteForm)

export default router ;