import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { UsersService } from './userService';
import { CreateUserInput } from '../types';

export class AuthService {
  private usersService: UsersService;

  constructor() {
    this.usersService = new UsersService();
  }

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(email);
    if (user && user.password && (await bcrypt.compare(pass, user.password))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { email: user.email, sub: user.id };
    return {
      access_token: jwt.sign(payload, process.env.JWT_SECRET as string),
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
      }
    };
  }

  async register(data: CreateUserInput) {
    const existingUser = await this.usersService.findOne(data.email);
    if (existingUser) {
      throw new Error('User already exists');
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);
    const user = await this.usersService.createUser({
      ...data,
      password: hashedPassword,
    });
    const { password, ...result } = user;
    return result;
  }
}
