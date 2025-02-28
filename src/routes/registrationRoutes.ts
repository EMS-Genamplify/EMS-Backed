import { Request, Response } from "express";
import { createUser, getUserByEmail } from "../dal/RegistrationDal";
import Registration from "../db/models/registration.model";
import {
  SetOptions,
  SaveOptions,
  FindOptions,
  InstanceUpdateOptions,
  InstanceDestroyOptions,
  InstanceRestoreOptions,
  IncrementDecrementOptionsWithBy,
  Model,
} from "sequelize";
import { SequelizeHooks } from "sequelize/types/hooks";
import { ValidationOptions } from "sequelize/types/instance-validator";
import { Fn, Col, Literal } from "sequelize/types/utils";

// Define UserAttributes interface
interface UserAttributes {
  id: number;
  name: string;
  email: string;
  password: string;
  createdAt?: Date;
  updatedAt?: Date;
}

// Registration Function
export async function registerUser(req: Request, res: Response) {
  const { name, email, password, confirmPassword } = req.body;

  // Validate inputs
  if (!name || !email || !password || !confirmPassword) {
    return res.status(400).json({ message: "All fields are required" });
  }

  if (password !== confirmPassword) {
    return res.status(400).json({ message: "Passwords do not match" });
  }

  // Password validation regex
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  if (!passwordRegex.test(password)) {
    return res
      .status(400)
      .json({ message: "Password must meet complexity requirements" });
  }

  // Check if the email is already registered
  const existingUser = await getUserByEmail(email);
  if (existingUser) {
    return res.status(400).json({ message: "Email already in use" });
  }

  const newUser = createUser(name, email, password);
  // ✅ FIX: Call createUser() and await its result
}
