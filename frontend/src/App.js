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
    <div className="App">
      <header>
        <h1>📊 Sales Analytics Dashboard</h1>
        <p>Upload CSV files to analyze sales performance</p>
      </header>

      <main>
        <FileUpload onUploadSuccess={handleUploadSuccess} />
        
        {dashboardData && (
          <>
            <MetricsDisplay metrics={dashboardData.metrics} />
            <RevenueChart chartData={dashboardData.chart_data} />
            
            <div className="summary">
              <h4>Upload Summary</h4>
              <p>{dashboardData.message}</p>
              <small>Data processed at: {new Date().toLocaleTimeString()}</small>
            </div>
          </>
        )}
      </main>

      <footer>
        <p>Built with Django REST API + React | Full-Stack Portfolio Project</p>
        <p>CSV Format: date (YYYY-MM-DD), product, quantity, revenue</p>
      </footer>
    </div>
  );
}

export default App;
