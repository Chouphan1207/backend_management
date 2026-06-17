import { prisma } from '../config/db.js';
import bcrypt from 'bcryptjs';


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

  return res.status(201).json({
    status: 'success',
    data: {
      id: user.id,
      name: user.name,
      email: user.email,
    },
  });
};

export { register };
