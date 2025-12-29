import { useState } from 'react';
import { TrendingUp } from 'lucide-react';

interface AnalysisFormProps {
  onAnalyze: (crop: string, location: string) => void;
  isLoading: boolean;
}

export default function AnalysisForm({ onAnalyze, isLoading }: AnalysisFormProps) {
  const [crop, setCrop] = useState('');
  const [location, setLocation] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (crop.trim() && location.trim()) {
      onAnalyze(crop.trim(), location.trim());
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-2xl">
      <div className="flex items-center justify-center mb-6">
        <TrendingUp className="w-10 h-10 text-green-600 mr-3" />
        <h1 className="text-3xl font-bold text-gray-800">Mandi Analyzer</h1>
      </div>
      <p className="text-gray-600 text-center mb-8">
        Get AI-powered crop price predictions and market insights
      </p>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="crop" className="block text-sm font-semibold text-gray-700 mb-2">
            Crop Name
          </label>
          <input
            type="text"
            id="crop"
            value={crop}
            onChange={(e) => setCrop(e.target.value)}
            placeholder="e.g., Tomato, Wheat, Rice"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition"
            required
          />
        </div>

        <div>
          <label htmlFor="location" className="block text-sm font-semibold text-gray-700 mb-2">
            Village / Location
          </label>
          <input
            type="text"
            id="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="e.g., Pune, Nashik, Kolhapur"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition"
            required
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white font-semibold py-3 px-6 rounded-lg transition duration-200 shadow-md hover:shadow-lg disabled:cursor-not-allowed"
        >
          {isLoading ? 'Analyzing Market...' : 'Analyze Market'}
        </button>
      </form>
    </div>
  );
}
