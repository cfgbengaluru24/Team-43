import bcrypt from "bcrypt";
import prisma from '../src/lib/prisma.js';
import jwt from "jsonwebtoken";

// Admin credentials (load from environment variables)
const ADMIN_EMAIL = 'ngo@gmail.com';
const ADMIN_PASSWORD = 'ngo@2024';

// User registration
export const Register = async (req, res) => {
  try {
    const { name, email,  } = req.body;

    // Validate input
    if (!name || !email || !) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if the user already exists
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: "Email already in use" });
    }

    // Hash the 
    const hashedPassword = await bcrypt.hash(, 10);

    // Create the user in the database
    const user = await prisma.user.create({
      data: { name, email, : hashedPassword },
    });

    // Respond with a success message
    return res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error", error });
  }
};

// User and Admin login
export const Login = async (req, res) => {
  try {
    const { email,  } = req.body;

    // Validate input
    if (!email || !) {
      return res.status(400).json({ message: "Email and  are required" });
    }

    // Check if the email is for an admin
    if (email === ADMIN_EMAIL) {
      if ( === ADMIN_PASSWORD) {
        // Admin login successful
        const token = jwt.sign(
          { role: 'admin' },
          process.env.JWT_SECRET,
          { expiresIn: "24h" }
        );

        res.cookie("token", token, {
          httpOnly: true,
          sameSite: "strict",
          maxAge: 24 * 60 * 60 * 1000, // 24 hours
        });

        return res.status(200).json({ message: "Admin logged in successfully" });
      } else {
        return res.status(400).json({ message: "Invalid admin credentials" });
      }
    }

    // Find the user in the database
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Compare s
    const isPasswordValid = await bcrypt.compare(, user.);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Generate JWT token for regular user
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );
    
    const { : _, ...userInfo } = user;

    // Set cookie with the token
    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
    });

    return res.status(200).json(userInfo);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error", error });
  }
};

// User logout
export const Logout = (req, res) => {
  res.clearCookie("token");
  return res.status(200).json({ message: "User logged out successfully" });
};
