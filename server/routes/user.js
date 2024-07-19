import express from 'express'
const routes = express.Router()
import {register,login,getDoctors, getDoctor, getPatient} from '../controller/user/user.controller.js'




routes.post('/register',register)
routes.post('/login',login)
routes.get('/get-doctors',getDoctors) 
routes.get('/get-patient/:id',getPatient) 
routes.get('/get-doctor/:id',getDoctor) 

export default routes