import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Bar } from 'react-chartjs-2';

const DashboardScreen = ({ history }) => {
  const [error, setError] = useState("");
  const [chartdata, setChartData] = useState("");

  useEffect(() => {

    const fetchChartData = async () => {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      };

      try {
        const { data } = await axios.get("/api/chartData", config);
        setChartData(data.data);
      } catch (error) {
        localStorage.removeItem("authToken");
        setError("You are not authorized please login");
      }
    };

    fetchChartData();
  }, []);

  let labelname = [], values = [];

  if (chartdata.length > 0) {
    chartdata.forEach(val => {
      labelname.push(val.title)
      values.push(parseInt(val.price))
    });
  }

  const state = {
    labels: labelname,
    datasets: [
      {
        label: 'Products',
        backgroundColor: 'rgba(75,192,192,1)',
        borderColor: 'rgba(0,0,0,1)',
        borderWidth: 2,
        data: values
      }
    ]
  }

  return error ? (
    <span className="error-message">Chart data not found</span>
  ) : (
      <div className="dashboard-screen">
      <Bar
        data={state}
        options={{
          title: {
            display: true,
            text: 'Average Rainfall per month',
            fontSize: 20
          },
          legend: {
            display: true,
            position: 'right'
          }
        }}
      />
    </div>
  )};

export default DashboardScreen;
