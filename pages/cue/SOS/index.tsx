import { Box, Tab, Tabs } from "@mui/material";
import { makeStyles } from "@material-ui/core/styles";
import { useEffect, useState } from "react";
import ParentContainer from "src/components/ParentContainer";
import ServiceCategory from "src/components/ServiceCategory";
import { useAppDispatch, useAppSelector } from "src/Hooks/use-redux";
import { MyServiceValue, MySosValue } from "src/utils/boxValues";
import { a11yProps, TabPanel } from "src/utils/helperFunctions";
import { uiActions } from "../../../src/redux/store/ui-slice";
import {
  clearError,
  clearMessage,
  fetchService,
  getMyservice,
} from "src/redux/store/features/service-slice";
import ServiceTable from "src/components/tables/ServiceTable";
import { getStates } from "src/redux/store/features/user-slice";
import SosTable from "src/components/tables/SosTable";
import SosReportTable from "src/components/tables/SosReportTable";
import {
  getAllSOS,
  getAllSOSReports,
} from "src/redux/store/features/sos-slice";

const Service = () => {
  const dispatch = useAppDispatch();
  const { sos, sosReports, loading, error, message, success }: any =
    useAppSelector(state => state.sos);
  const { token } = useAppSelector(state => state.auth);
  const [selected, setSelected] = useState(1);
  const [value, setValue] = useState(0);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  useEffect(() => {
    if (loading === true) {
      dispatch(uiActions.openLoader());
    }

    if (loading === false) {
      dispatch(uiActions.closeLoader());
    }
    if (error.length > 0) {
      dispatch(
        uiActions.openToastAndSetContent({
          toastContent: error,
          backgroundColor: "red",
        })
      );

      setTimeout(() => {
        dispatch(clearError());
      }, 10000);
    }
    if (success) {
      dispatch(fetchService(token));
      dispatch(uiActions.closeModal());
      dispatch(uiActions.closedrawer());
      dispatch(
        uiActions.openToastAndSetContent({
          toastContent: message,
          backgroundColor: "#49D3BA",
        })
      );

      setTimeout(() => {
        dispatch(clearMessage());
      }, 10000);
    }
  }, [loading, error, message, success, dispatch, token]);

  useEffect(() => {
    dispatch(getAllSOS(token));
    dispatch(getAllSOSReports(token));
  }, [dispatch, token]);
  return (
    <ParentContainer>
      <Box
        sx={{ width: "100%" }}
        style={{ background: "white", height: "100vh" }}
      >
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
            style={{ background: "#edf2f7" }}
            // classes={{ flexContainer: classes.flexContainer }}
          >
            {MySosValue.map(value => (
              <Tab
                label={value.label}
                {...a11yProps(value.id)}
                key={value.id}
                style={{
                  backgroundColor:
                    selected === value.id ? "white" : "transparent",
                  fontStyle: "normal",
                  fontWeight: "normal",
                  fontSize: "12px",
                  lineHeight: "136.52%",
                  textAlign: "center",
                  color: "rgba(132, 135, 163, 1)",
                  textTransform: "capitalize",
                }}
                onClick={() => {
                  setSelected(value.id);
                }}
              />
            ))}
          </Tabs>
        </Box>

        <TabPanel value={value} index={0}>
          <div>
            <SosTable data={sos} />
          </div>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <SosReportTable data={sosReports} />
        </TabPanel>
      </Box>
    </ParentContainer>
  );
};
export default Service;
