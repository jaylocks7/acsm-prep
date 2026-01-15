// Request body for POST /analyze
export interface AnalyzeRequest {
  filePath: string;
}

// Response from POST /analyze
export interface AnalyzeResponse {
  lineCount: number;
  functions: string[];
  imports: string[];
  issues: Issue[];
}

// Individual issue found in code analysis
export interface Issue {
  line: number;
  message: string;
  severity: 'info' | 'warning' | 'error';
}

// Error response format
export interface ErrorResponse {
  errors: Array<{
    //error type (e.g., "field", "type", etc.)
    type: string;
    //error message
    msg: string;
    //the field name ("filePath")
    path: string;
    //where the error occurred in the request
    location: string;
  }>;
}

export interface StoredAnalysis {
  id: number;
  filePath: string;
  result: string;
  createdAt: string;
}