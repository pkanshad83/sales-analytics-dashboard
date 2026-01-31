import React, { useState } from 'react';
import axios from 'axios';

const FileUpload = ({ onUploadSuccess }) => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setError('');
  };

  const handleUpload = async () => {
    if (!file) {
      setError('Please select a file first');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    setLoading(true);
    setError('');

    try {
      // USE ABSOLUTE URL - More reliable
      const API_URL = 'http://localhost:8000/api/upload/';
      
      console.log('Uploading to:', API_URL);
      console.log('File:', file.name);
      
      const response = await axios.post(API_URL, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      console.log('Response:', response.data);
      onUploadSuccess(response.data);
      setError('');
    } catch (err) {
      console.error('Full error:', err);
      
      if (err.response) {
        setError(`Server error: ${err.response.status} - ${err.response.data?.error || 'Unknown error'}`);
      } else if (err.request) {
        setError('Cannot connect to server. Check: 1) Django running, 2) CORS configured');
      } else {
        setError(`Error: ${err.message}`);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="file-upload" style={{ padding: '20px', border: '1px solid #ddd', borderRadius: '8px', maxWidth: '500px' }}>
      <h3>Upload Sales CSV</h3>
      
      <div style={{ marginBottom: '15px' }}>
        <input 
          type="file" 
          accept=".csv" 
          onChange={handleFileChange}
          style={{ marginBottom: '10px' }}
        />
        <p style={{ fontSize: '12px', color: '#666' }}>
          CSV must have columns: date, product, quantity, revenue
        </p>
      </div>

      <button 
        onClick={handleUpload}
        disabled={loading || !file}
        style={{
          padding: '10px 20px',
          backgroundColor: loading ? '#ccc' : '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: loading ? 'not-allowed' : 'pointer'
        }}
      >
        {loading ? 'Processing...' : 'Upload & Analyze'}
      </button>

      {error && (
        <div style={{ 
          marginTop: '15px', 
          padding: '10px', 
          backgroundColor: '#f8d7da', 
          color: '#721c24',
          borderRadius: '4px'
        }}>
          <strong>Error:</strong> {error}
        </div>
      )}

      {file && !error && !loading && (
        <div style={{ marginTop: '10px', color: '#28a745' }}>
          Selected: {file.name}
        </div>
      )}
    </div>
  );
};

export default FileUpload;
