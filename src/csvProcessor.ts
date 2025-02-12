import * as fs from "fs";
import {clearTables, processCandidateData} from "./candidateService";
import * as Papa from 'papaparse';


export const processCsvFile = (filepath: string) => {
    const fileStream = fs.createReadStream(filepath);
    const parseStream = Papa.parse(Papa.NODE_STREAM_INPUT, {
        header: true
    });

    parseStream.on('data', async (data) => {
        await processCandidateData(data);
    });

    parseStream.on('end', () => {
        console.log('CSV file processing completed.');
    });

    fileStream.pipe(parseStream);
}

export const processCsvFileSequentially = async (filepath: string) => {
    const fileContent = fs.readFileSync(filepath, 'utf8');
    const parsed = Papa.parse(fileContent, {
        header: true,
        skipEmptyLines: true
    });

    (async () => {
        let rowIndex = 1;
        for (const row of parsed.data) {
            console.log(`Processing row ${rowIndex}`);
            try {
                await processCandidateData(row);
            } catch (error) {
                console.error(`Error processing row ${rowIndex}:`, error);
                // Optionally, break here or continue processing
                break;
            }
            rowIndex++;
        }
        console.log('CSV file processing completed.');
        process.exit(0);
    })();
};