"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FinanceService = void 0;
const db_1 = require("../config/db");
class FinanceService {
    // --- Savings / Settings ---
    async getSettings(userId) {
        if (!userId)
            throw new Error('User ID is required');
        let result = await (0, db_1.query)('SELECT * FROM "FinanceSettings" WHERE "userId" = $1', [userId]);
        if (result.rows.length === 0) {
            result = await (0, db_1.query)(`INSERT INTO "FinanceSettings" (id, "userId", "totalSavings") 
         VALUES (gen_random_uuid(), $1, 0) 
         RETURNING *`, [userId]);
        }
        return result.rows[0];
    }
    async updateSavings(userId, dto) {
        const result = await (0, db_1.query)(`INSERT INTO "FinanceSettings" (id, "userId", "totalSavings")
       VALUES (gen_random_uuid(), $1, $2)
       ON CONFLICT ("userId") DO UPDATE SET "totalSavings" = $2
       RETURNING *`, [userId, dto.totalSavings]);
        return result.rows[0];
    }
    // --- Recurring Payments ---
    async addPayment(userId, dto) {
        const result = await (0, db_1.query)(`INSERT INTO "RecurringPayment" (id, name, amount, "paymentDay", category, "userId")
       VALUES (gen_random_uuid(), $1, $2, $3, $4, $5)
       RETURNING *`, [dto.name, dto.amount, dto.paymentDay, dto.category || null, userId]);
        return result.rows[0];
    }
    async getPayments(userId) {
        const result = await (0, db_1.query)('SELECT * FROM "RecurringPayment" WHERE "userId" = $1', [userId]);
        return result.rows;
    }
    async deletePayment(id, userId) {
        const result = await (0, db_1.query)('DELETE FROM "RecurringPayment" WHERE id = $1 AND "userId" = $2', [id, userId]);
        return { count: result.rowCount };
    }
    async updatePayment(id, userId, dto) {
        const fields = [];
        const values = [];
        let paramCount = 1;
        if (dto.name !== undefined) {
            fields.push(`name = $${paramCount++}`);
            values.push(dto.name);
        }
        if (dto.amount !== undefined) {
            fields.push(`amount = $${paramCount++}`);
            values.push(dto.amount);
        }
        if (dto.paymentDay !== undefined) {
            fields.push(`"paymentDay" = $${paramCount++}`);
            values.push(dto.paymentDay);
        }
        if (dto.category !== undefined) {
            fields.push(`category = $${paramCount++}`);
            values.push(dto.category);
        }
        values.push(id, userId);
        const result = await (0, db_1.query)(`UPDATE "RecurringPayment" SET ${fields.join(', ')} WHERE id = $${paramCount} AND "userId" = $${paramCount + 1} RETURNING *`, values);
        return { count: result.rowCount };
    }
    // --- Income ---
    async addIncome(userId, dto) {
        const income = await (0, db_1.query)(`INSERT INTO "Income" (id, amount, source, date, "isPotential", "userId")
       VALUES (gen_random_uuid(), $1, $2, NOW(), $3, $4)
       RETURNING *`, [dto.amount, dto.source, dto.isPotential || false, userId]);
        if (!dto.isPotential) {
            await (0, db_1.query)(`INSERT INTO "FinanceSettings" (id, "userId", "totalSavings")
         VALUES (gen_random_uuid(), $1, $2)
         ON CONFLICT ("userId") DO UPDATE SET "totalSavings" = "FinanceSettings"."totalSavings" + $2`, [userId, dto.amount]);
        }
        return income.rows[0];
    }
    async getIncomes(userId) {
        const result = await (0, db_1.query)('SELECT * FROM "Income" WHERE "userId" = $1 ORDER BY date DESC', [userId]);
        return result.rows;
    }
    async updateIncome(id, userId, dto) {
        const fields = [];
        const values = [];
        let paramCount = 1;
        if (dto.amount !== undefined) {
            fields.push(`amount = $${paramCount++}`);
            values.push(dto.amount);
        }
        if (dto.source !== undefined) {
            fields.push(`source = $${paramCount++}`);
            values.push(dto.source);
        }
        if (dto.isPotential !== undefined) {
            fields.push(`"isPotential" = $${paramCount++}`);
            values.push(dto.isPotential);
        }
        if (fields.length === 0) {
            return { count: 0 };
        }
        values.push(id, userId);
        const result = await (0, db_1.query)(`UPDATE "Income" SET ${fields.join(', ')} WHERE id = $${paramCount} AND "userId" = $${paramCount + 1}`, values);
        return { count: result.rowCount };
    }
    async deleteIncome(id, userId) {
        const existing = await (0, db_1.query)('SELECT * FROM "Income" WHERE id = $1 AND "userId" = $2', [id, userId]);
        const result = await (0, db_1.query)('DELETE FROM "Income" WHERE id = $1 AND "userId" = $2', [id, userId]);
        if (result.rowCount && result.rowCount > 0 && existing.rows[0] && !existing.rows[0].isPotential) {
            await (0, db_1.query)(`UPDATE "FinanceSettings" SET "totalSavings" = "totalSavings" - $1 WHERE "userId" = $2`, [existing.rows[0].amount, userId]);
        }
        return { count: result.rowCount || 0 };
    }
}
exports.FinanceService = FinanceService;
