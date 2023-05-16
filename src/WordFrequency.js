import React, { useState } from 'react';
import axios from 'axios';
import { saveAs } from 'file-saver';
import { BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar } from 'recharts';

const WordFrequency = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchWordFrequency = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get('https://www.terriblytinytales.com/test.txt');
      const text = response.data;
      const wordList = text.replace(/[^\w\s]/gi, '').toLowerCase().split(/\s+/);
      const frequency = wordList.reduce((acc, word) => {
        acc[word] = (acc[word] || 0) + 1;
        return acc;
      }, {});
      const sortedData = Object.entries(frequency)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 20)
        .map(([word, count]) => ({ word, count }));
      setData(sortedData);
    } catch (error) {
      console.error('Error fetching word frequency:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const exportCSV = () => {
    const csvData = data.map(({ word, count }) => [word, count].join(',')).join('\n');
    const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8' });
    saveAs(blob, 'word_frequency.csv');
  };

  return (
    <div>
      <button onClick={fetchWordFrequency} disabled={isLoading}>
        {isLoading ? 'Loading...' : 'Submit'}
      </button>
      {data && (
        <>
          <BarChart width={600} height={400} data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="word" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="count" fill="#8884d8" />
          </BarChart>
          <button onClick={exportCSV}>Export</button>
        </>
      )}
    </div>
  );
};

export default WordFrequency;
