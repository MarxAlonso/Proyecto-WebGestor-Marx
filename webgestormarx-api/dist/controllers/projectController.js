"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findPublicBySlug = exports.enableShare = exports.remove = exports.update = exports.findOne = exports.findAll = exports.create = void 0;
const projectService_1 = require("../services/projectService");
const projectsService = new projectService_1.ProjectsService();
const create = async (req, res) => {
    try {
        const result = await projectsService.create(req.body, req.user.userId);
        res.json(result);
    }
    catch (error) {
        console.error('Error in findAll projects:', error);
        res.status(500).json({ message: error.message });
    }
};
exports.create = create;
const findAll = async (req, res) => {
    try {
        const result = await projectsService.findAll(req.user.userId);
        res.json(result);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.findAll = findAll;
const findOne = async (req, res) => {
    try {
        const result = await projectsService.findOne(req.params.id, req.user.userId);
        if (!result)
            return res.status(404).json({ message: 'Project not found' });
        res.json(result);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.findOne = findOne;
const update = async (req, res) => {
    try {
        const result = await projectsService.update(req.params.id, req.body, req.user.userId);
        res.json(result);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.update = update;
const remove = async (req, res) => {
    try {
        const result = await projectsService.remove(req.params.id, req.user.userId);
        res.json(result);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.remove = remove;
const enableShare = async (req, res) => {
    try {
        const result = await projectsService.enableShare(req.params.id, req.user.userId);
        if (!result)
            return res.status(404).json({ message: 'Project not found' });
        res.json(result);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.enableShare = enableShare;
const findPublicBySlug = async (req, res) => {
    try {
        const result = await projectsService.findPublicBySlug(req.params.slug);
        if (!result)
            return res.status(404).json({ message: 'Project not found or not public' });
        res.json(result);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.findPublicBySlug = findPublicBySlug;
