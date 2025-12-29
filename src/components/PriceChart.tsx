interface PriceChartProps {
  pastPrices: number[];
  predictedPrices: number[];
}

export default function PriceChart({ pastPrices, predictedPrices }: PriceChartProps) {
  const allPrices = [...pastPrices, ...predictedPrices];
  const maxPrice = Math.max(...allPrices);
  const minPrice = Math.min(...allPrices);
  const priceRange = maxPrice - minPrice;

  const chartHeight = 300;
  const chartWidth = 800;
  const paddingTop = 20;
  const paddingBottom = 40;
  const paddingLeft = 60;
  const paddingRight = 20;

  const graphHeight = chartHeight - paddingTop - paddingBottom;
  const graphWidth = chartWidth - paddingLeft - paddingRight;

  const getY = (price: number) => {
    if (priceRange === 0) return graphHeight / 2 + paddingTop;
    return paddingTop + graphHeight - ((price - minPrice) / priceRange) * graphHeight;
  };

  const getX = (index: number, totalPoints: number) => {
    return paddingLeft + (index / (totalPoints - 1)) * graphWidth;
  };

  const totalPoints = allPrices.length;
  const splitIndex = pastPrices.length;

  const createPath = (prices: number[], startIndex: number) => {
    return prices
      .map((price, i) => {
        const x = getX(startIndex + i, totalPoints);
        const y = getY(price);
        return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
      })
      .join(' ');
  };

  const pastPath = createPath(pastPrices, 0);
  const predictedPath = createPath(predictedPrices, splitIndex - 1);

  const yAxisSteps = 5;
  const yAxisValues = Array.from({ length: yAxisSteps }, (_, i) => {
    return minPrice + (priceRange / (yAxisSteps - 1)) * i;
  });

  return (
    <div className="w-full overflow-x-auto">
      <svg
        viewBox={`0 0 ${chartWidth} ${chartHeight}`}
        className="w-full"
        style={{ maxWidth: '800px' }}
      >
        <defs>
          <linearGradient id="predictedGradient" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#10b981" />
            <stop offset="100%" stopColor="#3b82f6" />
          </linearGradient>
        </defs>

        <line
          x1={paddingLeft}
          y1={paddingTop}
          x2={paddingLeft}
          y2={chartHeight - paddingBottom}
          stroke="#d1d5db"
          strokeWidth="2"
        />
        <line
          x1={paddingLeft}
          y1={chartHeight - paddingBottom}
          x2={chartWidth - paddingRight}
          y2={chartHeight - paddingBottom}
          stroke="#d1d5db"
          strokeWidth="2"
        />

        {yAxisValues.map((value, i) => {
          const y = getY(value);
          return (
            <g key={i}>
              <line
                x1={paddingLeft}
                y1={y}
                x2={chartWidth - paddingRight}
                y2={y}
                stroke="#e5e7eb"
                strokeWidth="1"
                strokeDasharray="4"
              />
              <text
                x={paddingLeft - 10}
                y={y + 5}
                textAnchor="end"
                fontSize="12"
                fill="#6b7280"
              >
                ₹{Math.round(value)}
              </text>
            </g>
          );
        })}

        <path d={pastPath} fill="none" stroke="#ef4444" strokeWidth="3" />

        {pastPrices.map((price, i) => (
          <circle
            key={`past-${i}`}
            cx={getX(i, totalPoints)}
            cy={getY(price)}
            r="4"
            fill="#ef4444"
          />
        ))}

        <path
          d={predictedPath}
          fill="none"
          stroke="url(#predictedGradient)"
          strokeWidth="3"
          strokeDasharray="6 4"
        />

        {predictedPrices.map((price, i) => (
          <circle
            key={`pred-${i}`}
            cx={getX(splitIndex - 1 + i, totalPoints)}
            cy={getY(price)}
            r="4"
            fill="#10b981"
          />
        ))}

        <text
          x={paddingLeft + graphWidth / 4}
          y={chartHeight - 10}
          textAnchor="middle"
          fontSize="14"
          fill="#6b7280"
          fontWeight="600"
        >
          Past 7 Days
        </text>
        <text
          x={paddingLeft + (3 * graphWidth) / 4}
          y={chartHeight - 10}
          textAnchor="middle"
          fontSize="14"
          fill="#6b7280"
          fontWeight="600"
        >
          Next 7 Days (Predicted)
        </text>

        <line
          x1={getX(splitIndex - 1, totalPoints)}
          y1={paddingTop}
          x2={getX(splitIndex - 1, totalPoints)}
          y2={chartHeight - paddingBottom}
          stroke="#9ca3af"
          strokeWidth="2"
          strokeDasharray="4"
        />
      </svg>
    </div>
  );
}
