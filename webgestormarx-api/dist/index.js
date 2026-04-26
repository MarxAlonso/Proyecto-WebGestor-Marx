"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
console.log('Immediate startup log');
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
console.log('Dotenv loaded. ENV:', process.env.NODE_ENV);
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const financeRoutes_1 = __importDefault(require("./routes/financeRoutes"));
const projectRoutes_1 = __importDefault(require("./routes/projectRoutes"));
const taskRoutes_1 = __importDefault(require("./routes/taskRoutes"));
const hobbyRoutes_1 = __importDefault(require("./routes/hobbyRoutes"));
const projectController_1 = require("./controllers/projectController");
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use('/api/auth', authRoutes_1.default);
app.use('/api/finance', financeRoutes_1.default);
app.use('/api/projects', projectRoutes_1.default);
app.get('/api/projects-public/:slug', projectController_1.findPublicBySlug);
app.use('/api/tasks', taskRoutes_1.default);
app.use('/api/hobbies', hobbyRoutes_1.default);
app.get('/', (req, res) => {
    res.send('GestorMarx API Running');
});
console.log('Starting server...', { NODE_ENV: process.env.NODE_ENV, PORT: port });
// Force listen for debugging
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
exports.default = app;
