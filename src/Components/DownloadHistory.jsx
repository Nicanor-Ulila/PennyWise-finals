import React, { useState, useEffect } from 'react';
import axios from 'axios';

function DownloadHistory({ transactions }) {
  const [downloadUrl, setDownloadUrl] = useState('');

  // Function to generate the COBOL file and request the file
  const generateCobolFile = async () => {
    try {
      // Prepare the data to send (filter out removed transactions if needed)
      const requestData = {
        transactions: transactions.filter(tx => !tx.removed), // Optionally exclude removed transactions
      };

      // Send a POST request to the Flask backend
      const response = await axios.post('http://localhost:5555/generate-cobol-file', requestData, {
        responseType: 'blob', // Expecting a binary file as response
      });

      // Create a URL for the blob (download link)
      const fileBlob = response.data;
      const fileUrl = URL.createObjectURL(fileBlob);
      setDownloadUrl(fileUrl); // Set the download URL

    } catch (error) {
      console.error('Error generating COBOL file:', error);
    }
  };

  return (
    <div>
      <h2>Transaction History</h2>
      <button onClick={generateCobolFile}>Download COBOL Report</button>

      {downloadUrl && (
        <a href={downloadUrl} download="transaction_report.txt">
          <button>Download COBOL .txt</button>
        </a>
      )}
    </div>
  );
}

export default DownloadHistory;
