import express from 'express'
const routes = express.Router()
import {register,getPatients,linkPatient,login,upload, getAllPatients} from '../controller/doctor/doctor.controller.js'
import { verifyToken } from '../middleware/verify.js'



routes.post('/register',register)
routes.post('/login',login)
routes.get('/get-patients/:id',getPatients)
routes.get('/get-patients',getAllPatients)
routes.post('/link-patient',verifyToken,linkPatient)
routes.post('/upload/:id',verifyToken,upload)

export default routes

