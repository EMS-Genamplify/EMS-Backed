// src/db/UserDAL.ts
import { Pool } from "pg";
import bcrypt from "bcrypt";
import Registration from "../db/models/registration.model";

const pool = new Pool({
  user: "your_db_user",
  host: "your_db_host",
  database: "your_db_name",
  password: "your_db_password",
  port: 5432,
});

export async function createUser(
  user: Registration,
  email: any,
  password: any
) {
  const hashedPassword = await bcrypt.hash(user.password, 10);
  const result = await pool.query(
    "INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id, name, email",
    [user.name, user.email, hashedPassword]
  );
  return result.rows[0];
}

export async function getUserByEmail(email: string) {
  const result = await pool.query("SELECT * FROM users WHERE email = $1", [
    email,
  ]);
  return result.rows[0];
}
