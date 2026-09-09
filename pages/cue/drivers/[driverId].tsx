import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import { doc, onSnapshot } from "firebase/firestore";
import Image from "next/image";
import { useRouter } from "next/router";
import { GetStaticProps } from "next/types";
import { useEffect, useState } from "react";
import { tripType } from "src/@types/data";
import ImageDialog from "src/components/ImageDialog";
import Map from "src/components/Map";
import ParentContainer from "src/components/ParentContainer";
import useHTTPGet from "src/Hooks/use-httpget";
import { useAppDispatch, useAppSelector } from "src/Hooks/use-redux";
import { getTripsByDriver } from "src/redux/store/features/trip-slice";
import { clearError, clearMessage, getAUser } from "src/redux/store/features/user-slice";
import { uiActions } from "src/redux/store/ui-slice";
import { a11yProps, TabPanel } from "src/utils/helperFunctions";
import { db } from "../../../firebase";
import verify from "../../../src/assets/image/verify.svg";
import GeneralInfo from "../../../src/components/BoxComponents/GeneralInfo";
import TrackRide from "../../../src/components/BoxComponents/TrackRide";
import Trip from "../../../src/components/BoxComponents/Trip";
import { MyDriversValue } from "../../../src/utils/boxValues";

const OneDriver = ({ driverId }: any) => {
  const request = useHTTPGet();
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [driverLocation, setDriverLocation] = useState();
  const [selected, setSelected] = useState(1);
  const [value, setValue] = useState(0);
  const { user:driver, loading, success, error, message }: any = useAppSelector(
    state => state.user
  );
      const { loading:tripLoading, tripsByDriver:trips }: {loading:boolean, tripsByDriver:tripType[]} = useAppSelector(
    (state: any) => state.trip
  );

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  useEffect(() => {
   
     dispatch(getAUser(driverId))
      dispatch(getTripsByDriver(driverId))
  }, [dispatch, driverId]);

  useEffect(() => {
    // setLoading(true);
    const unsub = onSnapshot(
      doc(db, "driver/" + driver?.profile?.driverID),
      (s: any) => {
        const data = s.data();
        console.log(data);
        setDriverLocation(data?.currentLocation);
        // setDriver(s.data());
        // setLoading(false);
      }
    );
    // console.log("New active driver", activeTrip?.driver);
    return () => unsub();
  }, [driver?.profile?.driverID]);

  useEffect(() => {
  if (loading === true || tripLoading === true) {
      dispatch(uiActions.openLoader());
    }
    if (loading === false || tripLoading === false ) {
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
 dispatch(getAUser(driverId))
      setTimeout(() => {
        dispatch(clearMessage());
      }, 10000);
    }
  }, [loading, error, message, success, dispatch, driverId, tripLoading]);
console.log(driverLocation)

  return (
    <ParentContainer>
      <div className=" p-[10px] md:p-[30px] absolute top-0 z-20 bg-white w-full h-[150vh]">
        <div className="absolute top-0 left-0 w-full h-full -z-10">
          <Map address={driverLocation} name={driver?.fullName}  image={driver?.image ||  ''}
           />
        </div>
        <div className="mt-14">
          <button
            className="text-base text-text bg-white mb-4 py-[18px] px-[21px] rounded-2xl flex items-center justify-center "
            onClick={() => router.back()}
          >
            <span style={{ marginRight: "5px", fontSize: "20px" }}>&lt;</span>
            All Drivers
          </button>
          <div className="rounded-[20px] bg-darkPurple w-[435px] p-5">
            <div className="flex justify-between">
              <div className="flex gap-[17px]">
                <div>
                  {driver?.image && (
                    <ImageDialog  image={driver?.image} name={driver?.fullName}  style={ {objectFit: "cover", borderRadius: "50px", width:'50px', height:'50px' }} />
            
                  )}
                </div>
               <div className="flex flex-col gap-[14px]">
              <div className="flex gap-1">
                <div className="text-[16px] text-white">{driver?.fullName}</div>
                {driver?.emailVerifiedStatus === "verified" && (
                  <div className="ml-1">
                    <Image src={verify} alt={""} />
                  </div>
                )}
              </div>
                  <div className="text-textD text-xs">
                    <span className="w-1 h-1 rounded-[50%] bg-white mr-1"></span>
                    {driver?.isActive ? "Active" : "Inactive"}
                  </div>
                </div>
              </div>
               {/* {driver?.image ? <Avatar src={driver?.image} alt={driver?.fullName} /> : <Avatar />}  */}
              {/* <div className="flex gap-[17px]">
                <div>
                  <Image src={message} alt={""} />
                </div>
                <div>
                  <Image src={call} alt={""} />
                </div>
              </div> */}
            </div>
            {driver?.profile?.vehicle && (
              <div className="flex justify-between mt-[37px]">
                <div className="flex flex-col gap-3">
                  <div className="text-textD text-[10px]">Vehicle Type</div>
                  <div className="text-white text-xs">{driver?.profile?.vehicle?.manufacturer || 'not set'}</div>
                </div>
                <div className="flex flex-col gap-3">
                  <div className="text-textD text-[10px]">Vehicle (Model)</div>
                  <div className="text-white text-xs">{driver?.profile?.vehicle?.model || 'not set'}</div>
                </div>
                <div className="flex flex-col gap-3">
                  <div className="text-textD text-[10px]">Vehicle Color</div>
                  <div className="text-white text-xs">{driver?.profile?.vehicle?.color || 'not set'}</div>
                </div>
                <div className="flex flex-col gap-3">
                  <div className="text-textD text-[10px]">
                    Vehicle Plate Number
                  </div>
                  <div className="text-white text-xs">{driver?.profile?.vehicle?.plate_number || 'not set'}</div>
                </div>
              </div>
            )}
          </div>
          <div className="rounded-[20px] bg-white w-[435px] p-2  md:p-5 mt-[23px]">
            <Box
              sx={{ width: "100%" }}
              style={{
                background: "white",
                height: "100vh",
                maxWidth: "100vw",
                overflow: "auto",
              }}
            >
              <Box sx={{ borderBottom: 1, borderColor: "rgba(75,0,129, .2)" }}>
                <Tabs
                  value={value}
                  onChange={handleChange}
                  aria-label="basic tabs example"
                  style={{ background: "white" }}
                  // classes={{ flexContainer: classes.flexContainer }}
                >
                  {MyDriversValue.map(value => (
                    <Tab
                      key={value.id}
                      label={value.label}
                      {...a11yProps(value.id)}
                      style={{
                        backgroundColor:
                          selected === value.id ? "#49D3BA" : "transparent",
                        fontFamily: "Steradian",
                        fontStyle: "normal",
                        fontWeight: "normal",
                        fontSize: "14px",
                        lineHeight: "136.52%",
                        textAlign: "center",
                        color: selected === value.id ? "white" : "#979797",
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
                <GeneralInfo data={driver} />
              </TabPanel>
              <TabPanel value={value} index={1}>
                <Trip data={trips} type="driver" />
              </TabPanel>
              <TabPanel value={value} index={2}>
                {trips && <TrackRide trip={trips[0]} />}
              </TabPanel>
            </Box>
          </div>
        </div>
      </div>
    </ParentContainer>
  );
};
export const getServerSideProps: GetStaticProps = async (context: any) => {
  const driverId = context.params.driverId;
  return {
    props: {
      driverId,
    },
  };
};
export default OneDriver;
