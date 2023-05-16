import React, { useState } from "react";
import "./App.css";
import Button from './components/Button';
import Histogram from './components/Histogram';
import { countWordFrequency, getTopWords } from './components/wordUtils';



const App = () => {
  const [histogramData, setHistogramData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await fetch(
        'https://www.terriblytinytales.com/test.txt'
      );
      const text = await response.text();

      const wordFrequencyMap = countWordFrequency(text);
      const topWords = getTopWords(wordFrequencyMap, 20);

      setHistogramData(topWords);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleExport = () => {
    const csvContent = `data:text/csv;charset=utf-8,${histogramData
      .map((item) => `${item.word},${item.frequency}`)
      .join('\n')}`;

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'histogram_data.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div>
    <h1 className="head-content" style={{margin:"10px"}}> Assignment of Terribly Tiny Tales</h1>
    <div>
      <Button onClick={fetchData} />
      <div className="content">
      {histogramData.length > 0 && <Histogram data={histogramData}  />}
      {histogramData.length > 0 && (
        <button className="export" id="btn-submit" onClick={handleExport}>Export</button>
      )}
      </div>
    </div>
    </div>
  );
};

export default App;
