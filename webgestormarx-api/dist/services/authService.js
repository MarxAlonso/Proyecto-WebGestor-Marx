"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userService_1 = require("./userService");
class AuthService {
    constructor() {
        this.usersService = new userService_1.UsersService();
    }
    async validateUser(email, pass) {
        const user = await this.usersService.findOne(email);
        if (user && user.password && (await bcryptjs_1.default.compare(pass, user.password))) {
            const { password, ...result } = user;
            return result;
        }
        return null;
    }
    async login(user) {
        const payload = { email: user.email, sub: user.id };
        return {
            access_token: jsonwebtoken_1.default.sign(payload, process.env.JWT_SECRET),
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
            }
        };
    }
    async register(data) {
        const existingUser = await this.usersService.findOne(data.email);
        if (existingUser) {
            throw new Error('User already exists');
        }
        const hashedPassword = await bcryptjs_1.default.hash(data.password, 10);
        const user = await this.usersService.createUser({
            ...data,
            password: hashedPassword,
        });
        const { password, ...result } = user;
        return result;
    }
}
exports.AuthService = AuthService;
