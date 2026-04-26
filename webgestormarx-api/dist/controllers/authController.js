"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = exports.login = void 0;
const authService_1 = require("../services/authService");
const authService = new authService_1.AuthService();
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await authService.validateUser(email, password);
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        const result = await authService.login(user);
        res.json(result);
    }
    catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};
exports.login = login;
const register = async (req, res) => {
    try {
        const result = await authService.register(req.body);
        res.json(result);
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
};
exports.register = register;
