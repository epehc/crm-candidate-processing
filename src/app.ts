import { clearTables } from "./candidateService";
import {processCsvFile, processCsvFileSequentially} from "./csvProcessor";
import {connectDb} from "./db";


// Step 1: Connect to the database
(async () => {
    try {
        await connectDb();  // Ensure the database is connected before processing any data
        console.log("Database connected. Starting to process CSV...");

        await clearTables();  // Clear the tables before processing the CSV file
        // Step 2: Process the CSV file
        processCsvFileSequentially('./data/candidates_cleaned.csv');

        console.log("CSV processing completed.");
        return
    } catch (error) {
        console.error("Error connecting to the database:", error);
    }
})();