import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

interface Analysis {
  id: number
  filePath: string
  result: string
  createdAt: string
}

interface AnalysisResult {
  lineCount: number
  functions: string[]
  imports: string[]
  issues: Array<{
    line: number
    message: string
    severity: 'info' | 'warning' | 'error'
  }>
}

function HistoryPage() {
  const [analyses, setAnalyses] = useState<Analysis[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedAnalysis, setSelectedAnalysis] = useState<Analysis | null>(null)

  const itemsPerPage = 10

  useEffect(() => {
    fetchAnalyses()
  }, [])

  const fetchAnalyses = async () => {
    try {
      setLoading(true)
      const response = await fetch('/analyze')
      if (!response.ok) throw new Error('Failed to fetch analyses')
      const data = await response.json()
      setAnalyses(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  // Pagination logic
  const totalPages = Math.ceil(analyses.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentAnalyses = analyses.slice(startIndex, endIndex)

  const goToPage = (page: number) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const parseResult = (resultString: string): AnalysisResult => {
    try {
      return JSON.parse(resultString)
    } catch {
      return { lineCount: 0, functions: [], imports: [], issues: [] }
    }
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'error': return 'text-red-600 bg-red-100'
      case 'warning': return 'text-yellow-600 bg-yellow-100'
      case 'info': return 'text-blue-600 bg-blue-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Analysis History</h1>
          <Link
            to="/"
            className="inline-block bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            ← New Analysis
          </Link>
        </div>

        {/* Error Display */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
            {error}
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="text-center py-12">
            <p className="text-gray-600">Loading analyses...</p>
          </div>
        )}

        {/* Empty State */}
        {!loading && analyses.length === 0 && (
          <div className="text-center py-12 bg-white rounded-lg shadow">
            <p className="text-gray-600 text-lg mb-4">No Analyses Yet.</p>
            <p className="text-gray-500">Upload a File in the Previous Page to get started</p>
            <Link
              to="/"
              className="inline-block mt-6 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
            >
              Create First Analysis
            </Link>
          </div>
        )}

        {/* Analysis Cards Grid */}
        {!loading && analyses.length > 0 && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
              {currentAnalyses.map((analysis) => {
                const result = parseResult(analysis.result)
                const issueCount = result.issues.length
                const errorCount = result.issues.filter(i => i.severity === 'error').length

                return (
                  <button
                    key={analysis.id}
                    onClick={() => setSelectedAnalysis(analysis)}
                    className="bg-white p-4 rounded-lg shadow hover:shadow-md transition text-left"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-semibold text-gray-900 truncate flex-1">
                        {analysis.filePath}
                      </h3>
                      {errorCount > 0 && (
                        <span className="ml-2 bg-red-100 text-red-600 text-xs px-2 py-1 rounded">
                          {errorCount} error{errorCount !== 1 ? 's' : ''}
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-500 mb-3">
                      {new Date(analysis.createdAt).toLocaleString()}
                    </p>
                    <div className="flex gap-4 text-sm text-gray-600">
                      <span>{result.lineCount} lines</span>
                      <span>{result.functions.length} functions</span>
                      <span>{issueCount} issue{issueCount !== 1 ? 's' : ''}</span>
                    </div>
                  </button>
                )
              })}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center gap-2">
                <button
                  onClick={() => goToPage(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="px-4 py-2 rounded bg-white shadow disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                >
                  Previous
                </button>
                <div className="flex gap-1">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                    <button
                      key={page}
                      onClick={() => goToPage(page)}
                      className={`px-3 py-2 rounded ${
                        currentPage === page
                          ? 'bg-blue-600 text-white'
                          : 'bg-white shadow hover:bg-gray-50'
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                </div>
                <button
                  onClick={() => goToPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 rounded bg-white shadow disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}

        {/* Modal/Popup */}
        {selectedAnalysis && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            onClick={() => setSelectedAnalysis(null)}
          >
            <div
              className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="sticky top-0 bg-white border-b px-6 py-4 flex justify-between items-center">
                <h2 className="text-xl font-bold text-gray-900">Analysis Details</h2>
                <button
                  onClick={() => setSelectedAnalysis(null)}
                  className="text-gray-400 hover:text-gray-600 text-2xl"
                >
                  ×
                </button>
              </div>

              {/* Modal Content */}
              <div className="p-6">
                {(() => {
                  const result = parseResult(selectedAnalysis.result)
                  return (
                    <>
                      {/* File Info */}
                      <div className="mb-6">
                        <h3 className="text-sm font-semibold text-gray-500 mb-2">File Path</h3>
                        <p className="text-lg font-mono bg-gray-50 px-3 py-2 rounded">
                          {selectedAnalysis.filePath}
                        </p>
                      </div>

                      <div className="mb-6">
                        <h3 className="text-sm font-semibold text-gray-500 mb-2">Analyzed At</h3>
                        <p className="text-gray-700">
                          {new Date(selectedAnalysis.createdAt).toLocaleString()}
                        </p>
                      </div>

                      {/* Stats */}
                      <div className="grid grid-cols-3 gap-4 mb-6">
                        <div className="bg-blue-50 p-4 rounded-lg">
                          <p className="text-sm text-gray-600">Lines</p>
                          <p className="text-2xl font-bold text-blue-600">{result.lineCount}</p>
                        </div>
                        <div className="bg-green-50 p-4 rounded-lg">
                          <p className="text-sm text-gray-600">Functions</p>
                          <p className="text-2xl font-bold text-green-600">{result.functions.length}</p>
                        </div>
                        <div className="bg-purple-50 p-4 rounded-lg">
                          <p className="text-sm text-gray-600">Imports</p>
                          <p className="text-2xl font-bold text-purple-600">{result.imports.length}</p>
                        </div>
                      </div>

                      {/* Functions */}
                      {result.functions.length > 0 && (
                        <div className="mb-6">
                          <h3 className="text-sm font-semibold text-gray-500 mb-2">Functions</h3>
                          <ul className="space-y-1">
                            {result.functions.map((func, idx) => (
                              <li key={idx} className="font-mono text-sm bg-gray-50 px-3 py-1 rounded">
                                {func}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Imports */}
                      {result.imports.length > 0 && (
                        <div className="mb-6">
                          <h3 className="text-sm font-semibold text-gray-500 mb-2">Imports</h3>
                          <ul className="space-y-1">
                            {result.imports.map((imp, idx) => (
                              <li key={idx} className="font-mono text-sm bg-gray-50 px-3 py-1 rounded">
                                {imp}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Issues */}
                      <div>
                        <h3 className="text-sm font-semibold text-gray-500 mb-2">
                          Issues ({result.issues.length})
                        </h3>
                        {result.issues.length === 0 ? (
                          <p className="text-gray-500 text-sm">No issues found</p>
                        ) : (
                          <ul className="space-y-2">
                            {result.issues.map((issue, idx) => (
                              <li
                                key={idx}
                                className="border-l-4 border-gray-200 pl-4 py-2"
                              >
                                <div className="flex items-center gap-2 mb-1">
                                  <span className={`text-xs px-2 py-1 rounded ${getSeverityColor(issue.severity)}`}>
                                    {issue.severity}
                                  </span>
                                  <span className="text-sm text-gray-600">Line {issue.line}</span>
                                </div>
                                <p className="text-sm text-gray-700">{issue.message}</p>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </>
                  )
                })()}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default HistoryPage
