// Write your Cards component here
import React, { useState, useEffect } from "react";
import axios from 'axios';
import Stocks from "../pages/Stocks"; 
import Card from "../components/SingleCard"; 

const Cards = ({ searchString }) => {
  const [trend, setTrend] = useState(null);
  const apiKey = process.env.REACT_APP_API_KEY;

  const findValue = (elem) =>
    elem.toUpperCase().includes(searchString.toLowerCase());

  useEffect(() => {
    const fetchTrend = async () => {
      try {
        const options = {
          method: 'GET',
          url: 'https://yfapi.net/v1/finance/trending/US',
          headers: {
            'x-api-key': apiKey
          }
        };
        const response = await axios.request(options);
        setTrend(response.data.finance.result[0]);
      } catch (error) {
        console.error(error);
      }
    };
    fetchTrend();
  }, [apiKey]);

  return (
    <>
      {trend ? (
        <div className="container-fluid">
          <div className="row text-center wrapper">
            {trend.quotes.slice(0, 10).map((stock) => {
              if (findValue(stock.symbol)) {
                return (
                  <Card key={stock.symbol} symbol={stock.symbol} />
                );
              } else {
                return null;
              }
            })}
          </div>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </>
  );
};

export default Cards;
