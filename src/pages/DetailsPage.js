import { Grid, makeStyles } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Card from "../components/atoms/Card";
import { Table } from "../components/atoms/Table";
import ExpiredVsNotExpGraph from "../components/molecules/ExpiredVsNotExpGraph";
import ProdExpireByDateGraph from "../components/molecules/ProdExpireByDateGraph";

const useStyles = makeStyles({
  body: {
    background: "#FAFDFF",
    height: "calc(100vh - 92px)",
    display: "flex",
    justifyContent: "center",
    paddingTop: "32px",
  },
});

const DetailsPage = () => {
  const classes = useStyles();
  const { state } = useLocation();
  const data = state?.data;
  const [companiesList, setCompaniesList] = useState([]);

  useEffect(() => {
    const options = new Set();
    data?.forEach((row) => {
      options.add(row?.company);
    });
    setCompaniesList([...options]);
  }, []);

  return (
    <div className={classes.body}>
      {data && data?.length > 0 ? (
        <Grid container direction="row" justifyContent="center">
          <Grid item>
            <Card
              title={"Inventory Data"}
              body={<Table data={state?.data} />}
              height={650}
              width={1290}
            />
          </Grid>
          <Grid item>
            <ProdExpireByDateGraph data={data} companiesList={companiesList} />
          </Grid>
          <Grid item>
            <ExpiredVsNotExpGraph data={data} companiesList={companiesList} />
          </Grid>
        </Grid>
      ) : (
        <>
          <h2>
            Please upload a csv file to view the details.{" "}
            <a href={"/"}>Redirect to home</a>
          </h2>
        </>
      )}
    </div>
  );
};

export default DetailsPage;
