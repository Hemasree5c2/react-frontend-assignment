import React, { useEffect, useState } from "react";
import Card from "../atoms/Card";
import Dropdown from "../atoms/Dropdown";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const ExpiredVsNotExpGraph = ({ data, companiesList }) => {
  const [selectedCompany, setSelectedCompany] = useState(companiesList?.[0]);
  const [pieChartInfo, setPieChartInfo] = useState([0, 0]);
  const pieData = {
    labels: ["Expired", "Not Expired"],
    datasets: [
      {
        label: "Pie chart",
        data: pieChartInfo,
        backgroundColor: ["rgb(255, 99, 132)", "rgb(54, 162, 235)"],
        hoverOffset: 4,
      },
    ],
  };

  useEffect(() => {
    setSelectedCompany(companiesList?.[0]);
    fetchPieChartInfo(companiesList?.[0]);
  }, [companiesList]);

  const handleDropDown = (e, val) => {
    setSelectedCompany(val);
    fetchPieChartInfo(val);
  };

  const fetchPieChartInfo = (company) => {
    let expired = 0,
      notExpired = 0;
    const filterData = data?.filter((d) => d?.company === company);
    filterData?.map((d) => {
      if (new Date(d?.exp) > new Date()) {
        notExpired += 1;
      } else {
        expired += 1;
      }
    });
    setPieChartInfo([expired, notExpired]);
  };

  return (
    <Card
      title={"Expired Vs Not Expired"}
      height={450}
      width={1290}
      body={
        <>
          <div style={{ float: "right" }}>
            <Dropdown
              options={companiesList}
              value={selectedCompany ?? ""}
              handleDropdownChange={handleDropDown}
              label="Company"
            />
          </div>
          <div style={{ height: "300px", width: "300px" }}>
            <Pie
              data={pieData}
              options={{
                barThickness: 50,
                responsive: true,
                plugins: {
                  legend: {
                    display: true,
                    position: "bottom",
                  },
                },
              }}
            />
          </div>
        </>
      }
    />
  );
};

export default ExpiredVsNotExpGraph;
