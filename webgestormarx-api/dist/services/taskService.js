"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskTypesService = exports.TasksService = void 0;
const db_1 = require("../config/db");
class TasksService {
    async create(createTaskDto, userId) {
        const result = await (0, db_1.query)(`INSERT INTO "Task" (id, title, description, status, priority, "estimatedMinutes", "dueDate", "projectId", "typeId", "userId", "createdAt", "updatedAt")
       VALUES (gen_random_uuid(), $1, $2, $3, $4, $5, $6, $7, $8, $9, NOW(), NOW())
       RETURNING *`, [
            createTaskDto.title,
            createTaskDto.description || null,
            createTaskDto.status || 'TODO',
            createTaskDto.priority || 'MEDIUM',
            createTaskDto.estimatedMinutes || null,
            createTaskDto.dueDate || null,
            createTaskDto.projectId || null,
            createTaskDto.typeId || null,
            userId
        ]);
        return result.rows[0];
    }
    async findAll(userId) {
        const result = await (0, db_1.query)(`SELECT t.*, 
              p.id as "project_id", p.name as "project_name",
              tt.id as "type_id", tt.name as "type_name"
       FROM "Task" t
       LEFT JOIN "Project" p ON t."projectId" = p.id
       LEFT JOIN "TaskType" tt ON t."typeId" = tt.id
       WHERE t."userId" = $1
       ORDER BY t."createdAt" DESC`, [userId]);
        return result.rows.map(row => ({
            ...row,
            project: row.project_id ? { id: row.project_id, name: row.project_name } : null,
            type: row.type_id ? { id: row.type_id, name: row.type_name } : null,
        }));
    }
    async findOne(id, userId) {
        const result = await (0, db_1.query)(`SELECT t.*, 
              p.id as "project_id", p.name as "project_name",
              tt.id as "type_id", tt.name as "type_name"
       FROM "Task" t
       LEFT JOIN "Project" p ON t."projectId" = p.id
       LEFT JOIN "TaskType" tt ON t."typeId" = tt.id
       WHERE t.id = $1 AND t."userId" = $2`, [id, userId]);
        if (result.rows.length === 0)
            return null;
        const row = result.rows[0];
        return {
            ...row,
            project: row.project_id ? { id: row.project_id, name: row.project_name } : null,
            type: row.type_id ? { id: row.type_id, name: row.type_name } : null,
        };
    }
    async update(id, updateTaskDto, userId) {
        const fields = [];
        const values = [];
        let paramCount = 1;
        if (updateTaskDto.title !== undefined) {
            fields.push(`title = $${paramCount++}`);
            values.push(updateTaskDto.title);
        }
        if (updateTaskDto.description !== undefined) {
            fields.push(`description = $${paramCount++}`);
            values.push(updateTaskDto.description);
        }
        if (updateTaskDto.status !== undefined) {
            fields.push(`status = $${paramCount++}`);
            values.push(updateTaskDto.status);
        }
        if (updateTaskDto.priority !== undefined) {
            fields.push(`priority = $${paramCount++}`);
            values.push(updateTaskDto.priority);
        }
        if (updateTaskDto.estimatedMinutes !== undefined) {
            fields.push(`"estimatedMinutes" = $${paramCount++}`);
            values.push(updateTaskDto.estimatedMinutes);
        }
        if (updateTaskDto.dueDate !== undefined) {
            fields.push(`"dueDate" = $${paramCount++}`);
            values.push(updateTaskDto.dueDate);
        }
        if (updateTaskDto.projectId !== undefined) {
            fields.push(`"projectId" = $${paramCount++}`);
            values.push(updateTaskDto.projectId);
        }
        if (updateTaskDto.typeId !== undefined) {
            fields.push(`"typeId" = $${paramCount++}`);
            values.push(updateTaskDto.typeId);
        }
        fields.push(`"updatedAt" = NOW()`);
        values.push(id, userId);
        const result = await (0, db_1.query)(`UPDATE "Task" SET ${fields.join(', ')} WHERE id = $${paramCount} AND "userId" = $${paramCount + 1} RETURNING *`, values);
        return result.rows[0];
    }
    async remove(id, userId) {
        const result = await (0, db_1.query)('DELETE FROM "Task" WHERE id = $1 AND "userId" = $2', [id, userId]);
        return { count: result.rowCount };
    }
}
exports.TasksService = TasksService;
class TaskTypesService {
    async create(createTaskTypeDto, userId) {
        const result = await (0, db_1.query)(`INSERT INTO "TaskType" (id, name, "userId")
       VALUES (gen_random_uuid(), $1, $2)
       RETURNING *`, [createTaskTypeDto.name, userId]);
        return result.rows[0];
    }
    async findAll(userId) {
        const result = await (0, db_1.query)('SELECT * FROM "TaskType" WHERE "userId" = $1', [userId]);
        return result.rows;
    }
    async findOne(id, userId) {
        const result = await (0, db_1.query)('SELECT * FROM "TaskType" WHERE id = $1 AND "userId" = $2', [id, userId]);
        return result.rows[0] || null;
    }
    async update(id, updateTaskTypeDto, userId) {
        const result = await (0, db_1.query)('UPDATE "TaskType" SET name = $1 WHERE id = $2 AND "userId" = $3', [updateTaskTypeDto.name, id, userId]);
        return { count: result.rowCount };
    }
    async remove(id, userId) {
        const result = await (0, db_1.query)('DELETE FROM "TaskType" WHERE id = $1 AND "userId" = $2', [id, userId]);
        return { count: result.rowCount };
    }
}
exports.TaskTypesService = TaskTypesService;
