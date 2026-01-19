import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'


function AnalyzePage() {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [showTooltip, setShowTooltip] = useState(false)
    const [tooltipMessage, setTooltipMessage] = useState('')
    const [tooltipType, setTooltipType] = useState<'success' | 'error'>('success')


    useEffect(() => {
        if (showTooltip) {
            const timer = setTimeout(() => {
            setShowTooltip(false)
            }, 3000) // Hide after 3 seconds
            
            return () => clearTimeout(timer)
        }
        }, [showTooltip])

    

    const handleSubmit = async () => {
        try{
            setLoading(true)
            const res = await fetch('/analyze', {
                method: 'POST',
                body: JSON.stringify({ filePath: 'example.ts' }),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            if (!res.ok) {
                throw new Error(`Request failed with status ${res.status}`)
            }
            setTooltipType('success')
            setTooltipMessage('Analysis completed successfully!')
            setShowTooltip(true)
        } catch(err) {
            setTooltipType('error')
            setTooltipMessage(err instanceof Error ? err.message : 'Analysis failed')
            setShowTooltip(true)
        } finally {
            setLoading(false)
        }
        
        }
return (
    <div>
        <button onClick={handleSubmit}>Analyze</button>
        <Link to="/history">
            <button>Go to history</button>
        </Link>
        {loading && <p>Loading...</p>}
        {showTooltip && (
            <div className={`fixed top-4 right-4 px-4 py-3 rounded shadow-lg ${
                tooltipType === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
            }`}>
                {tooltipMessage}
  </div>
)}
    </div>
    
)
}

export default AnalyzePage