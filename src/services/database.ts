import db from  '../db/index';
import { AnalyzeResponse, StoredAnalysis } from '../types';

export function saveAnalysis(filePath: string, analysisData: AnalyzeResponse): number | bigint {
    const statement = db.prepare('INSERT INTO analyses (filePath, result) VALUES (?, ?)');
    const result = statement.run(filePath, JSON.stringify(analysisData));
    return result.lastInsertRowid;
}

export function getAllAnalyses(): StoredAnalysis[] {
    const statement = db.prepare('SELECT * FROM analyses ORDER BY createdAt DESC');
    const rows = statement.all() as StoredAnalysis[];
    return rows;
}