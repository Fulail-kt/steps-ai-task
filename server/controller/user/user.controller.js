import { Prisma } from "@prisma/client";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req,res) => {
  const { name, email, password } = req.body.data;
  console.log(req.body)
  if (!name || !email || !password) {
    return res.status(400).json({ message: "Missing required fields", success: false });
  }

  try {
  
    const existingPatient = await prisma.patient.findUnique({ 
      where: { email: email }
    });
    if (existingPatient) {
      return res
        .status(400)
        .json({ message: "Email already exists", success: false });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newPatient = await prisma.patient.create({
      data: {
        name,
        email,
        password: hashedPassword
      },
    });
    res.status(201).json({ message: "Registered successfully", success: true });
  } catch (error) {
    console.log(error)
    res.status(400).json({ message: "Registration failed", success: false });
  }
};

export const login = async (req,res) => {
  const { email, password } = req.body;
  try {
    const patient = await prisma.patient.findUnique({ where: { email } });
    if (!patient) {
      return res
        .status(400)
        .json({ error: "Invalid credentials", success: false });
    }

    const validPassword = await bcrypt.compare(password, patient.password);
    if (!validPassword) {
      return res
        .status(400)
        .json({ error: "Incorrect password", success: false });
    }

    const token = jwt.sign(
      { id: patient.id, role:"user", email: patient.email },
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

export const getDoctors = async (req,res) => {
  try {
    const doctors = await prisma.doctor.findMany();

    res.status(200).json({ doctors, message: "retrieved all doctors", success: true });
  } catch (error) {
    console.log(error)
    res.status(400).json({ error: "failed", success: false });

  }
};

export const getDoctor = async (req, res) => {
  console.log("first")
  try {
    const id = parseInt(req.params.id);
    console.log("Parsed ID:", id);

    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid doctor ID", success: false });
    }

    const doctor = await prisma.doctor.findUnique({
      where: { id: id },
      include: {
        pdfs: true,
        patients: true
      }
    });

    console.log("Found doctor:", doctor);

    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found", success: false });
    }

    res.status(200).json({ doctor, message: "Retrieved doctor successfully", success: true });
  } catch (error) {
    console.error("Error retrieving doctor:", error);
    res.status(500).json({ error: "Failed to retrieve doctor", success: false });
  }
};
export const getPatient = async (req, res) => {
  try {
    console.log("first")
    const id = parseInt(req.params.id);
    console.log("Parsed ID:", id);

    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid doctor ID", success: false });
    }

    const patient = await prisma.patient.findUnique({
      where: { id: id },
      include: {
        doctors: true
      }
    });

    if (!patient) {
      return res.status(404).json({ message: "patient not found", success: false });
    }

    res.status(200).json({ patient, message: "Retrieved patient successfully", success: true });
  } catch (error) {
    console.error("Error retrieving patient:", error);
    res.status(500).json({ error: "Failed to retrieve patient", success: false });
  }
};
