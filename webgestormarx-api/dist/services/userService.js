"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const db_1 = require("../config/db");
class UsersService {
    async findOne(email) {
        const result = await (0, db_1.query)('SELECT * FROM "User" WHERE email = $1', [email]);
        return result.rows[0] || null;
    }
    async createUser(data) {
        const result = await (0, db_1.query)(`INSERT INTO "User" (id, email, password, name, "createdAt", "updatedAt")
       VALUES (gen_random_uuid(), $1, $2, $3, NOW(), NOW())
       RETURNING *`, [data.email, data.password, data.name || null]);
        return result.rows[0];
    }
}
exports.UsersService = UsersService;
