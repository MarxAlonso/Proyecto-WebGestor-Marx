import { query } from '../config/db';
import { CreateProjectDto, UpdateProjectDto } from '../types';
import { randomUUID } from 'crypto';

export class ProjectsService {
  async create(createProjectDto: CreateProjectDto, userId: string) {
    const result = await query(
      `INSERT INTO "Project" (id, name, description, "startDate", "endDate", status, "userId", docs, "isPublic", "shareSlug")
       VALUES (gen_random_uuid(), $1, $2, $3, $4, $5, $6, $7, $8, $9)
       RETURNING *`,
      [
        createProjectDto.name,
        createProjectDto.description || null,
        createProjectDto.startDate || null,
        createProjectDto.endDate || null,
        createProjectDto.status || 'ACTIVE',
        userId,
        createProjectDto.docs ? JSON.stringify(createProjectDto.docs) : null,
        createProjectDto.isPublic || false,
        null
      ]
    );
    return result.rows[0];
  }

  async findAll(userId: string) {
    const result = await query(
      `SELECT p.*, 
              json_agg(
                json_build_object(
                  'id', t.id,
                  'title', t.title,
                  'status', t.status,
                  'priority', t.priority
                )
              ) FILTER (WHERE t.id IS NOT NULL) as tasks
       FROM "Project" p
       LEFT JOIN "Task" t ON t."projectId" = p.id
       WHERE p."userId" = $1
       GROUP BY p.id
       ORDER BY p."startDate" DESC`,
      [userId]
    );
    return result.rows.map(row => ({
      ...row,
      tasks: row.tasks || [],
      docs: typeof row.docs === 'string' ? JSON.parse(row.docs) : row.docs
    }));
  }

  async findOne(id: string, userId: string) {
    const result = await query(
      `SELECT p.*, 
              json_agg(
                json_build_object(
                  'id', t.id,
                  'title', t.title,
                  'status', t.status,
                  'priority', t.priority
                )
              ) FILTER (WHERE t.id IS NOT NULL) as tasks
       FROM "Project" p
       LEFT JOIN "Task" t ON t."projectId" = p.id
       WHERE p.id = $1 AND p."userId" = $2
       GROUP BY p.id`,
      [id, userId]
    );

    if (result.rows.length === 0) return null;

    return {
      ...result.rows[0],
      tasks: result.rows[0].tasks || [],
      docs: typeof result.rows[0].docs === 'string' ? JSON.parse(result.rows[0].docs) : result.rows[0].docs
    };
  }

  async update(id: string, updateProjectDto: UpdateProjectDto, userId: string) {
    const fields: string[] = [];
    const values: any[] = [];
    let paramCount = 1;

    if (updateProjectDto.name !== undefined) {
      fields.push(`name = $${paramCount++}`);
      values.push(updateProjectDto.name);
    }
    if (updateProjectDto.description !== undefined) {
      fields.push(`description = $${paramCount++}`);
      values.push(updateProjectDto.description);
    }
    if (updateProjectDto.startDate !== undefined) {
      fields.push(`"startDate" = $${paramCount++}`);
      values.push(updateProjectDto.startDate);
    }
    if (updateProjectDto.endDate !== undefined) {
      fields.push(`"endDate" = $${paramCount++}`);
      values.push(updateProjectDto.endDate);
    }
    if (updateProjectDto.status !== undefined) {
      fields.push(`status = $${paramCount++}`);
      values.push(updateProjectDto.status);
    }
    if (updateProjectDto.docs !== undefined) {
      fields.push(`docs = $${paramCount++}`);
      values.push(JSON.stringify(updateProjectDto.docs));
    }
    if (updateProjectDto.docsMarkdown !== undefined) {
      fields.push(`docs = $${paramCount++}`);
      values.push(JSON.stringify(updateProjectDto.docsMarkdown));
    }

    values.push(id, userId);

    const result = await query(
      `UPDATE "Project" SET ${fields.join(', ')} WHERE id = $${paramCount} AND "userId" = $${paramCount + 1}`,
      values
    );
    return { count: result.rowCount };
  }

  async remove(id: string, userId: string) {
    const result = await query(
      'DELETE FROM "Project" WHERE id = $1 AND "userId" = $2',
      [id, userId]
    );
    return { count: result.rowCount };
  }

  async enableShare(id: string, userId: string) {
    const slug = randomUUID().split('-')[0];
    const result = await query(
      `UPDATE "Project" SET "isPublic" = true, "shareSlug" = $1 WHERE id = $2 AND "userId" = $3 RETURNING "shareSlug"`,
      [slug, id, userId]
    );
    return (result.rowCount && result.rowCount > 0) ? { shareSlug: slug } : null;
  }

  async findPublicBySlug(slug: string) {
    const result = await query(
      `SELECT id, name, description, "endDate", docs, "isPublic" 
       FROM "Project" 
       WHERE "shareSlug" = $1 AND "isPublic" = true`,
      [slug]
    );
    const row = result.rows[0] || null;
    if (!row) return null;
    return {
      ...row,
      docs: typeof row.docs === 'string' ? JSON.parse(row.docs) : row.docs
    };
  }
}
