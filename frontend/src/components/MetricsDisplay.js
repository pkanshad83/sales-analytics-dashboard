import React from 'react';

const MetricsDisplay = ({ metrics }) => {
  if (!metrics) return null;

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(amount);
  };

  return (
    <div className="metrics-display">
      <h3>Sales Metrics</h3>
      <div className="metrics-grid">
        <div className="metric-card">
          <h4>Total Revenue</h4>
          <p className="metric-value revenue">{formatCurrency(metrics.total_revenue)}</p>
        </div>

        <div className="metric-card">
          <h4>Average Order Value</h4>
          <p className="metric-value average">{formatCurrency(metrics.avg_order_value)}</p>
        </div>

        <div className="metric-card">
          <h4>Total Transactions</h4>
          <p className="metric-value transactions">{metrics.total_transactions}</p>
        </div>

        <div className="metric-card">
          <h4>Top Product</h4>
          <p className="metric-value top-product">{metrics.top_product}</p>
        </div>
      </div>

      <style jsx>{`
        .metrics-display {
          margin-top: 30px;
        }
        
        .metrics-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 20px;
          margin-top: 20px;
        }
        
        .metric-card {
          padding: 20px;
          background-color: #f8f9fa;
          border-radius: 8px;
          text-align: center;
        }
        
        .metric-card h4 {
          color: #6c757d;
          margin-bottom: 10px;
          font-size: 14px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        
        .metric-value {
          font-size: 24px;
          font-weight: bold;
          margin: 0;
        }
        
        .revenue { color: #28a745; }
        .average { color: #007bff; }
        .transactions { color: #17a2b8; }
        .top-product { color: #dc3545; }
        
        @media (max-width: 768px) {
          .metrics-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
};

export default MetricsDisplay;
