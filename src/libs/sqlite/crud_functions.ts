import { db } from ".";
const {v4 : uuidv4} = require('uuid')


// Create
export async function createRecord(table: string, body: any) {
    const values = {
        ...body,id:uuidv4()
    }

    console.log({values})
    const placeholders = Object.keys(values).map(() => '?').join(',');
    const columns = Object.keys(values).join(',');
    const query = `INSERT INTO ${table} (${columns}) VALUES (${placeholders})`;

    try {
        await db.run(query, Object.values(values));
        return 'Record created successfully';
    } catch (error:any) {
        console.error(`Error creating record in ${table}:`, error.message);
        throw new Error(`Failed to create record in ${table}`);
    }
}

// Read
export async function getRecords(table: string) {
    try {
        const rows = await db.all(`SELECT * FROM ${table}`);
        console.log({rows})
        return rows;
    } catch (error:any) {
        console.error(`Error fetching records from ${table}:`, error.message);
        throw new Error(`Failed to fetch records from ${table}`);
    }
}

export async function getRecordById(table: string, id: string) {
    try {
        const row = await db.get(`SELECT * FROM ${table} WHERE id = ?`, [id]);
        return row;
    } catch (error:any) {
        console.error(`Error fetching record from ${table}:`, error.message);
        throw new Error(`Failed to fetch record from ${table}`);
    }
}

export async function getRecordByFields(table: string, fields: any) {
    const fieldKeys = Object.keys(fields);
    const conditions = fieldKeys.map((key) => `${key} = ?`).join(' AND ');
    const values = fieldKeys.map((key) => fields[key]);

    try {
        const query = `SELECT * FROM ${table} WHERE ${conditions}`;
        const row = await db.get(query, values);
        return row;
    } catch (error:any) {
        console.error(`Error fetching record from ${table}:`, error.message);
        throw new Error(`Failed to fetch record from ${table}`);
    }
}

// Update
export async function updateRecord(table: string, id: string, values: any) {
    const updates = Object.keys(values).map((key) => `${key} = ?`).join(',');
    const query = `UPDATE ${table} SET ${updates} WHERE id = ?`;

    try {
        await db.run(query, [...Object.values(values), id]);
        return 'Record updated successfully';
    } catch (error:any) {
        console.error(`Error updating record in ${table}:`, error.message);
        throw new Error(`Failed to update record in ${table}`);
    }
}

// Delete
export async function deleteRecord(table: string, id: string) {
    try {
        await db.run(`DELETE FROM ${table} WHERE id = ?`, [id]);
        return 'Record deleted successfully';
    } catch (error:any) {
        console.error(`Error deleting record from ${table}:`, error.message);
        throw new Error(`Failed to delete record from ${table}`);
    }
}
