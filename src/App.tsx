import { useState } from 'react';
import AnalysisForm from './components/AnalysisForm';
import ResultsDisplay from './components/ResultsDisplay';

interface AnalysisResult {
  signal: string;
  color: string;
  priceRange: string;
  pastPrices: number[];
  predictedPrices: number[];
  advice: string;
}

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleAnalyze = async (crop: string, location: string) => {
    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch('http://127.0.0.1:5000/api/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ crop, location }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Analysis failed');
      }

      const data = await response.json();
      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to connect to server');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-green-100 py-12 px-4">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">PricePulse</h1>
          <p className="text-gray-600">AI-Powered Mandi Price Intelligence</p>
        </div>

        <div className="flex flex-col items-center space-y-8">
          <AnalysisForm onAnalyze={handleAnalyze} isLoading={isLoading} />

          {error && (
            <div className="w-full max-w-2xl bg-red-100 border border-red-300 text-red-800 px-6 py-4 rounded-lg">
              <p className="font-semibold">Error:</p>
              <p>{error}</p>
            </div>
          )}

          {result && (
            <ResultsDisplay
              signal={result.signal}
              color={result.color}
              priceRange={result.priceRange}
              pastPrices={result.pastPrices}
              predictedPrices={result.predictedPrices}
              advice={result.advice}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
