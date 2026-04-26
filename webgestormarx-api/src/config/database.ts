import { Pool, PoolClient, QueryResult } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

export class DatabaseService {
    private pool: Pool;
    private static instance: DatabaseService;

    private constructor() {
        this.pool = new Pool({
            connectionString: process.env.GESTORMARX_URL ?? process.env.DATABASE_URL,
            ssl: { rejectUnauthorized: false },
            max: 10,
            idleTimeoutMillis: 30000,
            connectionTimeoutMillis: 2000,
        });
    }

    public static getInstance(): DatabaseService {
        if (!DatabaseService.instance) {
            DatabaseService.instance = new DatabaseService();
        }
        return DatabaseService.instance;
    }

    async query(text: string, params?: any[]): Promise<QueryResult> {
        return this.pool.query(text, params);
    }

    async transaction<T>(callback: (client: PoolClient) => Promise<T>): Promise<T> {
        const client = await this.pool.connect();
        try {
            await client.query('BEGIN');
            const result = await callback(client);
            await client.query('COMMIT');
            return result;
        } catch (error) {
            await client.query('ROLLBACK');
            throw error;
        } finally {
            client.release();
        }
    }

    async end() {
        await this.pool.end();
    }
}

export const db = DatabaseService.getInstance();
