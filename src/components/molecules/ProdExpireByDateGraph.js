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
import { Bar } from "react-chartjs-2";
import { Grid } from "@material-ui/core";
import DatePicker from "../atoms/DatePicker";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const ProdExpireByDateGraph = ({ data, companiesList }) => {
  const [selectedCompany, setSelectedCompany] = useState(
    companiesList?.[0] ?? ""
  );
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [barChartInfo, setBarChartInfo] = useState({});
  const barChartData = {
    labels: Object.keys(barChartInfo) ?? [],
    datasets: [
      {
        data: Object.values(barChartInfo) ?? [],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(255, 159, 64, 0.2)",
          "rgba(255, 205, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(201, 203, 207, 0.2)",
        ],
        borderColor: [
          "rgb(255, 99, 132)",
          "rgb(255, 159, 64)",
          "rgb(255, 205, 86)",
          "rgb(75, 192, 192)",
          "rgb(54, 162, 235)",
          "rgb(153, 102, 255)",
          "rgb(201, 203, 207)",
        ],
        borderWidth: 1,
      },
    ],
  };

  useEffect(() => {
    setSelectedCompany(companiesList?.[0]);
  }, [companiesList]);

  useEffect(() => {
    fetchBarChartInfo();
  }, [selectedCompany, selectedDate]);

  const handleDropDown = (e, val) => {
    setSelectedCompany(val);
  };

  const fetchBarChartInfo = () => {
    let res = {};
    const filterData = data?.filter(
      (d) => d?.company === selectedCompany && new Date(d?.exp) <= selectedDate
    );
    filterData?.map((d) => {
      if (Object.keys(res)?.includes(d?.name)) {
        res[d?.name] = res[d?.name] + 1;
      } else {
        res[d?.name] = 1;
      }
    });
    setBarChartInfo({ ...res });
  };

  return (
    <Card
      title={"Products expiring by certain date"}
      height={650}
      width={1290}
      body={
        <>
          <Grid container direction="row" justifyContent="flex-end" spacing={2}>
            <Grid item>
              <Dropdown
                options={companiesList}
                value={selectedCompany ?? ""}
                handleDropdownChange={handleDropDown}
                label="Company"
              />
            </Grid>
            <Grid item>
              <DatePicker
                selectedDate={selectedDate ?? ""}
                handleDateChange={(date) => {
                  setSelectedDate(date);
                }}
              />
            </Grid>
          </Grid>
          <div style={{ height: "900px", width: "900px" }}>
            <Bar
              data={barChartData}
              options={{
                barThickness: 50,
                responsive: true,
                plugins: {
                  legend: {
                    display: false,
                    position: "right",
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

export default ProdExpireByDateGraph;
