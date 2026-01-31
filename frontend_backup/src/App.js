import React, { useState } from 'react';
import FileUpload from './components/FileUpload';
import MetricsDisplay from './components/MetricsDisplay';
import RevenueChart from './components/RevenueChart';
import './App.css';

function App() {
  const [dashboardData, setDashboardData] = useState(null);

  const handleUploadSuccess = (data) => {
    console.log('Upload success:', data);
    setDashboardData(data);
  };

  return (
    <div className="App" style={{ padding: '40px', maxWidth: '1200px', margin: '0 auto' }}>
      <header style={{ marginBottom: '40px' }}>
        <h1 style={{ color: '#343a40' }}>📊 Sales Analytics Dashboard</h1>
        <p style={{ color: '#6c757d' }}>Upload CSV files to analyze sales performance</p>
      </header>

      <main>
        <FileUpload onUploadSuccess={handleUploadSuccess} />
        
        {dashboardData && (
          <>
            <MetricsDisplay metrics={dashboardData.metrics} />
            <RevenueChart chartData={dashboardData.chart_data} />
            
            <div style={{ marginTop: '30px', padding: '20px', backgroundColor: '#e9ecef', borderRadius: '8px' }}>
              <h4>Upload Summary</h4>
              <p>{dashboardData.message}</p>
              <small>Data processed at: {new Date().toLocaleTimeString()}</small>
            </div>
          </>
        )}
      </main>

      <footer style={{ 
        marginTop: '50px', 
        paddingTop: '20px', 
        borderTop: '1px solid #dee2e6',
        color: '#6c757d',
        fontSize: '14px'
      }}>
        <p>Built with Django REST API + React | Full-Stack Portfolio Project</p>
        <p>CSV Format: date (YYYY-MM-DD), product, quantity, revenue</p>
      </footer>
    </div>
  );
}

export default App;
