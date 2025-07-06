// Write your Slider component here
import React, {useState, useEffect} from 'react';
import axios from 'axios';

const Slider = () => {
  const [data, setData] = useState(null);
  const apiKey = process.env.REACT_APP_API_KEY; // Ensure you have your API key set in .env file

  useEffect(() => {
    const fetchStockData = async () => {
      try {
        const response = await axios.get(`https://api.example.com/stocks/${symbol}`);
        setStockData(response.data);
      } catch (error) {
        console.error('Error fetching stock data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStockData();
  }, [symbol]);

  if (loading) return <div>Loading...</div>;
  if (!stockData) return <div>No data available</div>;

  return (
    <div className="slider">
      <h2>{stockData.name} ({stockData.symbol})</h2>
      <p>Current Price: ${stockData.price}</p>
      <p>Change: {stockData.change}%</p>
    </div>
  );
}