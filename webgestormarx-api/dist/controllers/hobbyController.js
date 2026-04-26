"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.remove = exports.update = exports.logActivity = exports.findOne = exports.findAll = exports.create = void 0;
const hobbyService_1 = require("../services/hobbyService");
const hobbiesService = new hobbyService_1.HobbiesService();
const create = async (req, res) => {
    try {
        const result = await hobbiesService.create(req.user.userId, req.body);
        res.json(result);
    }
    catch (error) {
        console.error('Error in findAll hobbies:', error);
        res.status(500).json({ message: error.message });
    }
};
exports.create = create;
const findAll = async (req, res) => {
    try {
        const result = await hobbiesService.findAll(req.user.userId);
        res.json(result);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.findAll = findAll;
const findOne = async (req, res) => {
    try {
        const result = await hobbiesService.findOne(req.params.id, req.user.userId);
        if (!result)
            return res.status(404).json({ message: 'Hobby not found' });
        res.json(result);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.findOne = findOne;
const logActivity = async (req, res) => {
    try {
        const result = await hobbiesService.logActivity(req.params.id, req.user.userId, req.body);
        res.json(result);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.logActivity = logActivity;
const update = async (req, res) => {
    try {
        const result = await hobbiesService.update(req.params.id, req.user.userId, req.body);
        res.json(result);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.update = update;
const remove = async (req, res) => {
    try {
        const result = await hobbiesService.delete(req.params.id, req.user.userId);
        res.json(result);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.remove = remove;
