import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import LineChart from '../components/Chart';
import axios from 'axios';

const Stocks = () => {
  const [chartData, setChartData] = useState(null);
  const [summary, setSummary] = useState(null);
  const [flag, setFlag] = useState(false);
  const { state } = useLocation(); // Correct usage of state
  const apiKey = process.env.REACT_APP_API_KEY;

  useEffect(() => {
    const fetchTrend = async () => {
      try {
        const options = {
          method: 'GET',
          url: `https://yfapi.net/v8/finance/chart/${state}?range=1mo&interval=1d`,
          headers: {
            'x-api-key': apiKey,
          },
        };

        const response = await axios.request(options);
        const result = response.data.chart.result[0];

        setChartData({
          labels: result.timestamp.map((t) =>
            new Date(t * 1000).toLocaleDateString("en-US")
          ),
          datasets: [
            {
              label: 'Changes Reflected Daily',
              data: result.indicators.quote[0].close,
              backgroundColor: [
                'rgba(75,192,192,1)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)',
              ],
              borderWidth: 5,
            },
          ],
        });

        setSummary(result.meta);
        setFlag(true);
      } catch (error) {
        console.error("Error fetching stock data:", error);
      }
    };

    fetchTrend();
  }, [apiKey, state]);

  return (
    <>
      {!flag ? (
        <div className="container">
          <div className="row">
            <div className="card rounded shadow-lg m-2 chart-true">
              <p className="error-message" style={{ padding: "9px" }}>
                Loading Data...
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="stock-row">
          <div className="stock-column-data">
            {summary ? (
              <>
                <h2>
                  <span className="summary-span" style={{ color: "black" }}>
                    {summary.exchangeName} {summary.symbol}
                  </span>{' '}
                  ${summary.regularMarketPrice}
                </h2>
                <div className="stock-headings">
                  <h4>
                    <span className="summary-span">Exchange Name:</span>{' '}
                    <span style={{ color: "black" }}>{summary.exchangeName}</span>
                  </h4>
                  <hr />
                  <br />
                  <h4>
                    <span className="summary-span">Instrument Type:</span>{' '}
                    <span style={{ color: "black" }}>{summary.instrumentType}</span>
                  </h4>
                  <hr />
                  <br />
                  <h4>
                    <span className="summary-span">Previous Close Price:</span>{' '}
                    <span style={{ color: "black" }}>{summary.chartPreviousClose}</span>
                  </h4>
                  <hr />
                  <br />
                  <h4>
                    <span className="summary-span">Current Price:</span>{' '}
                    <span style={{ color: "black" }}>{summary.regularMarketPrice}</span>
                  </h4>
                  <hr />
                  <br />
                </div>
              </>
            ) : (
              <div>Loading summary...</div>
            )}
          </div>
          <div className="stock-column-chart">
            <LineChart chartData={chartData} />
          </div>
        </div>
      )}
    </>
  );
};

export default Stocks;
