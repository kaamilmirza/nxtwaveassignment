import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import User from '../../models/User';
import config from '../../config';

const secret = config.jwtSecret;

export const signup = async (req: any, res: any) => {
  const { name, email, password } = req.body;
  if(!name || !email || !password) {
    return res.status(400).json({ error: 'All fields are required' });
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const userId = uuidv4();

  try {
    const user = await User.create({
      id: userId,
      name,
      email,
      password: hashedPassword,
    });
    res.status(201).json({ message: 'User created successfully', user });
  } catch (error) {
    res.status(400).json({ error: 'User already exists or validation failed' });
  }
};

export const login = async (req: any, res: any) => {
  const { email, password } = req.body;
  if(!email || !password) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  const user = await User.findOne({ where: { email } });
  if (user && await bcrypt.compare(password, user.password)) {
    const token = jwt.sign({ userId: user.id }, secret as string, { expiresIn: '1h' });
    res.status(200).json({ token, user });
  } else {
    res.status(401).json({ error: 'Invalid credentials' });
  }
};
