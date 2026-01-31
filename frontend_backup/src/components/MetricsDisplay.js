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
    <div className="metrics-display" style={{ marginTop: '30px' }}>
      <h3>Sales Metrics</h3>
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
        gap: '20px',
        marginTop: '20px'
      }}>
        <div style={{ 
          padding: '20px', 
          backgroundColor: '#f8f9fa', 
          borderRadius: '8px',
          textAlign: 'center'
        }}>
          <h4 style={{ color: '#6c757d', marginBottom: '10px' }}>Total Revenue</h4>
          <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#28a745' }}>
            {formatCurrency(metrics.total_revenue)}
          </p>
        </div>

        <div style={{ 
          padding: '20px', 
          backgroundColor: '#f8f9fa', 
          borderRadius: '8px',
          textAlign: 'center'
        }}>
          <h4 style={{ color: '#6c757d', marginBottom: '10px' }}>Average Order Value</h4>
          <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#007bff' }}>
            {formatCurrency(metrics.avg_order_value)}
          </p>
        </div>

        <div style={{ 
          padding: '20px', 
          backgroundColor: '#f8f9fa', 
          borderRadius: '8px',
          textAlign: 'center'
        }}>
          <h4 style={{ color: '#6c757d', marginBottom: '10px' }}>Total Transactions</h4>
          <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#17a2b8' }}>
            {metrics.total_transactions}
          </p>
        </div>

        <div style={{ 
          padding: '20px', 
          backgroundColor: '#f8f9fa', 
          borderRadius: '8px',
          textAlign: 'center'
        }}>
          <h4 style={{ color: '#6c757d', marginBottom: '10px' }}>Top Product</h4>
          <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#dc3545' }}>
            {metrics.top_product}
          </p>
        </div>
      </div>
    </div>
  );
};

export default MetricsDisplay;
