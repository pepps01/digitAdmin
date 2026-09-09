import ParentContainer from "src/components/ParentContainer";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "src/Hooks/use-redux";
import {
  clearError,
  getAdminlogs,
  getAllLogs,
} from "src/redux/store/features/log-slice";
import LogTable from "src/components/tables/LogTable";
import { uiActions } from "src/redux/store/ui-slice";
import { TabPanel, a11yProps } from "src/utils/helperFunctions";
import { Box, Tab, Tabs } from "@mui/material";
import { MyLogsValue } from "src/utils/boxValues";

const Audit = () => {
  const { allLogs, adminLogs, loading, error } = useAppSelector(
    state => state.log
  );
  const { token } = useAppSelector(state => state.auth);
  const dispatch = useAppDispatch();

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
  }, [loading, error, dispatch]);

  useEffect(() => {
    dispatch(getAdminlogs({ token }));
    dispatch(getAllLogs({ token }));
  }, [dispatch, token]);

  return (
    <ParentContainer>
      <div className="mt-12">
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
              {MyLogsValue.map((value: any) => (
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
            <LogTable data={allLogs} />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <LogTable data={adminLogs} />
          </TabPanel>
        </Box>
      </div>
    </ParentContainer>
  );
};
export default Audit;
