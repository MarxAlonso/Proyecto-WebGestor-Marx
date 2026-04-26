import { query } from '../config/db';
import { User, CreateUserInput } from '../types';

export class UsersService {
  async findOne(email: string): Promise<User | null> {
    const result = await query(
      'SELECT * FROM "User" WHERE email = $1',
      [email]
    );
    return result.rows[0] || null;
  }

  async createUser(data: CreateUserInput): Promise<User> {
    const result = await query(
      `INSERT INTO "User" (id, email, password, name, "createdAt", "updatedAt")
       VALUES (gen_random_uuid(), $1, $2, $3, NOW(), NOW())
       RETURNING *`,
      [data.email, data.password, data.name || null]
    );
    return result.rows[0];
  }
}
