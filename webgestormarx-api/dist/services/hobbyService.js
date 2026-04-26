"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HobbiesService = void 0;
const db_1 = require("../config/db");
class HobbiesService {
    async create(userId, dto) {
        const result = await (0, db_1.query)(`INSERT INTO "Hobby" (id, name, category, "targetDurationMinutes", "userId")
       VALUES (gen_random_uuid(), $1, $2, $3, $4)
       RETURNING *`, [dto.name, dto.category || null, dto.targetDurationMinutes || null, userId]);
        return result.rows[0];
    }
    async findAll(userId) {
        const result = await (0, db_1.query)(`SELECT h.*, 
              json_agg(
                json_build_object(
                  'id', hl.id,
                  'date', hl.date,
                  'durationMinutes', hl."durationMinutes",
                  'completed', hl.completed,
                  'notes', hl.notes
                ) ORDER BY hl.date DESC
              ) FILTER (WHERE hl.id IS NOT NULL) as logs
       FROM "Hobby" h
       LEFT JOIN LATERAL (
         SELECT * FROM "HobbyLog" WHERE "hobbyId" = h.id ORDER BY date DESC LIMIT 5
       ) hl ON true
       WHERE h."userId" = $1
       GROUP BY h.id`, [userId]);
        return result.rows.map(row => ({
            ...row,
            logs: row.logs || []
        }));
    }
    async findOne(id, userId) {
        const hobbyResult = await (0, db_1.query)('SELECT * FROM "Hobby" WHERE id = $1 AND "userId" = $2', [id, userId]);
        if (hobbyResult.rows.length === 0)
            return null;
        const logsResult = await (0, db_1.query)('SELECT * FROM "HobbyLog" WHERE "hobbyId" = $1 ORDER BY date DESC', [id]);
        return {
            ...hobbyResult.rows[0],
            logs: logsResult.rows
        };
    }
    async logActivity(hobbyId, userId, dto) {
        // Verify ownership
        const hobby = await (0, db_1.query)('SELECT * FROM "Hobby" WHERE id = $1 AND "userId" = $2', [hobbyId, userId]);
        if (hobby.rows.length === 0) {
            throw new Error('Hobby not found or access denied');
        }
        const result = await (0, db_1.query)(`INSERT INTO "HobbyLog" (id, "hobbyId", date, "durationMinutes", completed, notes)
       VALUES (gen_random_uuid(), $1, $2, $3, $4, $5)
       RETURNING *`, [
            hobbyId,
            dto.date ? new Date(dto.date) : new Date(),
            dto.durationMinutes || null,
            dto.completed ?? true,
            dto.notes || null
        ]);
        return result.rows[0];
    }
    async update(id, userId, dto) {
        const fields = [];
        const values = [];
        let paramCount = 1;
        if (dto.name !== undefined) {
            fields.push(`name = $${paramCount++}`);
            values.push(dto.name);
        }
        if (dto.category !== undefined) {
            fields.push(`category = $${paramCount++}`);
            values.push(dto.category);
        }
        if (dto.targetDurationMinutes !== undefined) {
            fields.push(`"targetDurationMinutes" = $${paramCount++}`);
            values.push(dto.targetDurationMinutes);
        }
        if (fields.length === 0)
            return { count: 0 };
        values.push(id, userId);
        const result = await (0, db_1.query)(`UPDATE "Hobby" SET ${fields.join(', ')} WHERE id = $${paramCount} AND "userId" = $${paramCount + 1} RETURNING *`, values);
        return { count: result.rowCount };
    }
    async delete(id, userId) {
        const result = await (0, db_1.query)('DELETE FROM "Hobby" WHERE id = $1 AND "userId" = $2', [id, userId]);
        return { count: result.rowCount };
    }
}
exports.HobbiesService = HobbiesService;
