"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteIncome = exports.updateIncome = exports.getIncomes = exports.addIncome = exports.updatePayment = exports.deletePayment = exports.getPayments = exports.addPayment = exports.updateSavings = exports.getSettings = void 0;
const financeService_1 = require("../services/financeService");
const financeService = new financeService_1.FinanceService();
const getSettings = async (req, res) => {
    try {
        const result = await financeService.getSettings(req.user.userId);
        res.json(result);
    }
    catch (error) {
        console.error('Error in getSettings:', error);
        res.status(500).json({ message: error.message });
    }
};
exports.getSettings = getSettings;
const updateSavings = async (req, res) => {
    try {
        const result = await financeService.updateSavings(req.user.userId, req.body);
        res.json(result);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.updateSavings = updateSavings;
const addPayment = async (req, res) => {
    try {
        const result = await financeService.addPayment(req.user.userId, req.body);
        res.json(result);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.addPayment = addPayment;
const getPayments = async (req, res) => {
    try {
        const result = await financeService.getPayments(req.user.userId);
        res.json(result);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.getPayments = getPayments;
const deletePayment = async (req, res) => {
    try {
        const result = await financeService.deletePayment(req.params.id, req.user.userId);
        res.json(result);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.deletePayment = deletePayment;
const updatePayment = async (req, res) => {
    try {
        const result = await financeService.updatePayment(req.params.id, req.user.userId, req.body);
        res.json(result);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.updatePayment = updatePayment;
const addIncome = async (req, res) => {
    try {
        const result = await financeService.addIncome(req.user.userId, req.body);
        res.json(result);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.addIncome = addIncome;
const getIncomes = async (req, res) => {
    try {
        const result = await financeService.getIncomes(req.user.userId);
        res.json(result);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.getIncomes = getIncomes;
const updateIncome = async (req, res) => {
    try {
        const result = await financeService.updateIncome(req.params.id, req.user.userId, req.body);
        res.json(result);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.updateIncome = updateIncome;
const deleteIncome = async (req, res) => {
    try {
        const result = await financeService.deleteIncome(req.params.id, req.user.userId);
        res.json(result);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.deleteIncome = deleteIncome;
