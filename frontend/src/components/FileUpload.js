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
      const API_URL = 'http://localhost:8000/api/upload/';
      const response = await axios.post(API_URL, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      onUploadSuccess(response.data);
      setError('');
    } catch (err) {
      console.error('Upload error:', err);
      
      if (err.response) {
        setError(`Server error: ${err.response.status} - ${err.response.data?.error || 'Unknown error'}`);
      } else if (err.request) {
        setError('Cannot connect to server. Make sure Django is running on port 8000');
      } else {
        setError(`Error: ${err.message}`);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="file-upload">
      <h3>Upload Sales CSV</h3>
      
      <div className="upload-area">
        <input 
          type="file" 
          accept=".csv" 
          onChange={handleFileChange}
        />
        <p className="file-info">
          CSV must have columns: date, product, quantity, revenue
        </p>
      </div>

      <button 
        onClick={handleUpload}
        disabled={loading || !file}
        className={loading ? 'loading' : ''}
      >
        {loading ? 'Processing...' : 'Upload & Analyze'}
      </button>

      {error && (
        <div className="error-message">
          <strong>Error:</strong> {error}
        </div>
      )}

      {file && !error && !loading && (
        <div className="file-selected">
          Selected: {file.name}
        </div>
      )}

      <style jsx>{`
        .file-upload {
          padding: 20px;
          border: 1px solid #ddd;
          border-radius: 8px;
          max-width: 500px;
          margin: 0 auto;
        }
        
        .upload-area {
          margin-bottom: 15px;
        }
        
        input[type="file"] {
          display: block;
          margin-bottom: 10px;
          padding: 10px;
          border: 1px solid #ddd;
          border-radius: 4px;
          width: 100%;
        }
        
        .file-info {
          font-size: 12px;
          color: #666;
          margin: 0;
        }
        
        button {
          padding: 10px 20px;
          background-color: #007bff;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          font-size: 16px;
          width: 100%;
        }
        
        button:disabled {
          background-color: #ccc;
          cursor: not-allowed;
        }
        
        button.loading {
          background-color: #6c757d;
        }
        
        .error-message {
          margin-top: 15px;
          padding: 10px;
          background-color: #f8d7da;
          color: #721c24;
          border-radius: 4px;
        }
        
        .file-selected {
          margin-top: 10px;
          color: #28a745;
          font-size: 14px;
        }
      `}</style>
    </div>
  );
};

export default FileUpload;
