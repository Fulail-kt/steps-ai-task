import { Prisma } from "@prisma/client";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req,res) => {
  const { name, email, password, specialty } = req.body;

  console.log(req.body,"clg")
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const doctor = await prisma.doctor.create({
      data: {
        name,
        email,
        password: hashedPassword,
        specialty,
      },
    });
    res.status(201).json({ message: "Doctor registered successfully", success: true });
  } catch (error) {
    console.log(error)
    res.status(400).json({ error: "Registration failed", success: false });
  }
};

export const login = async (req,res) => {
  const { email, password } = req.body;
  try {
    const doctor = await prisma.doctor.findUnique({ where: { email } });
    if (!doctor) {
      return res
        .status(400)
        .json({ error: "Invalid credentials", success: false });
    }

    const validPassword = await bcrypt.compare(password, doctor.password);
    if (!validPassword) {
      return res
        .status(400)
        .json({ error: "Incorrect credentials", success: false });
    }

    const token = jwt.sign(
      { id: doctor.id, role: "doctor", email: doctor?.email },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );
    res.json({ token, message: "login successful", success: true });
  } catch (error) {
    res.status(400).json({ error: "Login failed", success: false });
  }
};

export const getAllPatients = async (req,res) => {
  try {
    const doctors = await prisma.patient.findMany({
      include:{doctors:true}
    });

    res.status(200).json({ doctors, message: "retrieved all patients", success: true });
  } catch (error) {
    console.log(error)
    res.status(400).json({ error: "failed", success: false });

  }
};

export const getPatients = async (req, res) => {
  const { id } = req.params;
  try {
    const patients = await prisma.patient.findUnique({
      where: { id: parseInt(id) },
      select: { patients: true }
    });
    res.json({ patients, success: true });
  } catch (error) {
    res.status(400).json({ error: "Failed to fetch patients", success: false });
  }
};

export const linkPatient = async (req, res) => {
  const { doctorId, patientId } = req.body;
  try {
    await prisma.doctorPatient.create({
      data: {
        doctor: { connect: { id: doctorId } },
        patient: { connect: { id: patientId } },
      },
    });
    res.json({ message: "Patient linked successfully", success: true });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "Failed to link patient", success: false });
  }
};


export const upload = async (req,res) => {
  const {filePath } = req.body;
  const doctorId=parseInt(req.params.id)

  console.log(req.body,"clg")
  try {
    
    const upload = await prisma.pDF.create({
      data: {
        doctorId,filePath
      },
    });
    res.status(201).json({ message: "Documents successfully uploaded", success: true });
  } catch (error) {
    console.log(error)
    res.status(400).json({ error: "Uploading failed", success: false });
  }
};