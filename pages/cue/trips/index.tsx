import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import { useEffect, useState } from "react";
import ParentContainer from "src/components/ParentContainer";
import TripTable from "src/components/tables/TripTable";
import { useAppDispatch, useAppSelector } from "src/Hooks/use-redux";
import {
  clearError,
  clearMessage,
  fetchMyTrips,
  getMyTrips
} from "src/redux/store/features/trip-slice";
import { uiActions } from "src/redux/store/ui-slice";
import { MyTripValue } from "src/utils/boxValues";
import { a11yProps, TabPanel } from "src/utils/helperFunctions";

const Trips = () => {
  const { token } = useAppSelector((state: any) => state.auth);
  const { trips, loading, success, error, message } = useAppSelector(
    state => state.trip
  );
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
    if (success) {
      dispatch(uiActions.closeModal());
      dispatch(
        uiActions.openToastAndSetContent({
          toastContent: message,
          backgroundColor: "#49D3BA",
        })
      );
      dispatch(fetchMyTrips(token));
      setTimeout(() => {
        dispatch(clearMessage());
      }, 10000);
    }
  }, [loading, error, message, success, dispatch, token]);
  useEffect(() => {
    dispatch(getMyTrips(token));
  }, [dispatch, token]);
  return (
    <ParentContainer>
   
          <div className=" h-screen">
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
              {MyTripValue.map((value: any) => (
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
               <TripTable data={trips.filter(item => item?.status?.toLowerCase() === 'requested' || item?.status?.toLowerCase()=== 'arrived' || item?.status?.toLowerCase() === 'ongoing'  || item?.status?.toLowerCase() === 'accepted')} />
          </TabPanel>
          <TabPanel value={value} index={1}>
       <TripTable data={trips} /> 
          </TabPanel>
        </Box>
      </div>
    </ParentContainer>
  );
};
export default Trips;
