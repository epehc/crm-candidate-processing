import {Client} from 'pg';
import dotenv from 'dotenv';

dotenv.config()

const client = new Client({
    user: process.env["DB_USERNAME"],
    host: process.env["DB_HOST"],
    database: process.env["DB_DATABASE"],
    password: process.env["DB_PASSWORD"],
    port: parseInt(process.env["DB_PORT"] || '5432'),
})

export const connectDb = async () => {
    try {
        await client.connect();
        console.log('Connected to database');
    } catch (error) {
        console.error('Error connecting to database', error);
    }
}


export const queryDb = async (query: string, params?: any[]) => {
    try {
        const result = await client.query(query, params);
        return result;
    } catch (error) {
        console.error('Error querying database', error);
        throw error;
    }

}