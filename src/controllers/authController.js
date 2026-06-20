import { prisma } from '../config/db.js';
import bcrypt from 'bcryptjs';
import { generateToken } from '../utils/generateToken.js';


const register = async (req, res) => {
  const body = req.body;

  const { name, email, password } = body;
  const userExists = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  if (userExists) {
    return res.status(400).json({ error: 'User already exists' });
  }

// Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  //User
  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });

  // Generate token
      const token = generateToken(user.id);

  return res.status(201).json({
    status: 'success',
    data: {
      id: user.id,
      name: user.name,
      email: user.email,
    },
    token: token,
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  if (!user) {
    return res.status(401).json({ error: 'User not found' });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return res.status(401).json({ error: 'Invalid password' });
  }

  // Generate token
      const token = generateToken(user.id, res);

  return res.status(200).json({
    status: 'success',
    data: {
      id: user.id,
      name: user.name,
      email: user.email,
    },
    token: token,
  });
};

const logout = async (req, res) => {
  res.cookie('jwt', '', {
    expires: new Date(0),
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
  });
  return res.status(200).json({
    status: 'success',
    message: 'Logged out successfully',
  });
};

export { register, login, logout };
