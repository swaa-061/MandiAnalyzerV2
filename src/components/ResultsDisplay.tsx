import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import PriceChart from './PriceChart';

interface ResultsDisplayProps {
  signal: string;
  color: string;
  priceRange: string;
  pastPrices: number[];
  predictedPrices: number[];
  advice: string;
}

export default function ResultsDisplay({
  signal,
  color,
  priceRange,
  pastPrices,
  predictedPrices,
  advice,
}: ResultsDisplayProps) {
  const getColorClasses = (color: string) => {
    switch (color) {
      case 'green':
        return {
          bg: 'bg-green-100',
          text: 'text-green-800',
          border: 'border-green-300',
          icon: <TrendingUp className="w-6 h-6" />,
        };
      case 'red':
        return {
          bg: 'bg-red-100',
          text: 'text-red-800',
          border: 'border-red-300',
          icon: <TrendingDown className="w-6 h-6" />,
        };
      case 'yellow':
      default:
        return {
          bg: 'bg-yellow-100',
          text: 'text-yellow-800',
          border: 'border-yellow-300',
          icon: <Minus className="w-6 h-6" />,
        };
    }
  };

  const colorClasses = getColorClasses(color);

  return (
    <div className="w-full max-w-4xl space-y-6 animate-fadeIn">
      <div
        className={`${colorClasses.bg} ${colorClasses.border} border-2 rounded-lg p-6 flex items-center justify-between`}
      >
        <div className="flex items-center space-x-4">
          <div className={colorClasses.text}>{colorClasses.icon}</div>
          <div>
            <h2 className={`text-2xl font-bold ${colorClasses.text}`}>{signal}</h2>
            <p className={`text-lg ${colorClasses.text} mt-1`}>
              Expected Range: <span className="font-semibold">{priceRange}</span>
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4">Price Trend Analysis</h3>
        <PriceChart pastPrices={pastPrices} predictedPrices={predictedPrices} />
      </div>

      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg shadow-lg p-6 border border-blue-200">
        <h3 className="text-xl font-bold text-gray-800 mb-3 flex items-center">
          <span className="text-2xl mr-2">💡</span>
          AI Advisory
        </h3>
        <p className="text-gray-700 leading-relaxed text-lg">{advice}</p>
      </div>
    </div>
  );
}
