import { Avatar } from "@mui/material";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import Image from "next/image";
import { useRouter } from "next/router";
import { GetStaticProps } from "next/types";
import { useEffect, useState } from "react";
import { tripType } from "src/@types/data";
import Trip from "src/components/BoxComponents/Trip";
import ParentContainer from "src/components/ParentContainer";
import useHTTPGet from "src/Hooks/use-httpget";
import { useAppDispatch, useAppSelector } from "src/Hooks/use-redux";
import { getTripsByRider } from "src/redux/store/features/trip-slice";
import { clearError, clearMessage, getAUser } from "src/redux/store/features/user-slice";
import { uiActions } from "src/redux/store/ui-slice";
import { a11yProps, TabPanel } from "src/utils/helperFunctions";
import verify from "../../../src/assets/image/verify.svg";
import BankDetails from "../../../src/components/BoxComponents/BankDetails";
import TrackRide from "../../../src/components/BoxComponents/TrackRide";
import { MyRidersValue } from "../../../src/utils/boxValues";

const OneUser = ({ riderID }: any) => {
  const request = useHTTPGet();
  const dispatch = useAppDispatch();
  const router =useRouter()
  // const [user, setUser] = useState<riderType>();
  // const [trips, setTrips] = useState<tripType[]>([]);
  const [selected, setSelected] = useState(1);
  const [value, setValue] = useState(0);
  const { loading, success, message, error,user } = useAppSelector(
    (state: any) => state.user
  );
    const { loading:tripLoading, tripsByRider:trips }: {loading:boolean, tripsByRider:tripType[]} = useAppSelector(
    (state: any) => state.trip
  );
  console.log(trips);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  useEffect(() => {
    dispatch(getAUser(riderID))
      dispatch(getTripsByRider(riderID))
  
    // fetchAllTrips(riderID);
  }, [dispatch, riderID]);

  useEffect(() => {
    if (loading === true || tripLoading === true) {
      dispatch(uiActions.openLoader());
    }
    if (loading === false && tripLoading === false ) {
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
      setTimeout(() => {
        dispatch(clearMessage());
      }, 10000);
    }
  }, [loading, error, message, success, dispatch, tripLoading]);
  return (
    <ParentContainer>
      
      <div className="">
      <div className="flex justify-end w-full mb-[80px]">


              <button
        className="text-sm text-white bg-darkPurple py-3 px-4 rounded-md flex items-center justify-center"
        onClick={() => router.back()}
      >
        Back to List
      </button>
      </div>
        <div className="bg-lightPurple flex-col rounded-[20px] px-[8px] py-[13px] md:px-[28px] flex md:flex-row justify-between relative z-1 md:items-start items-center mt-[50px]">
          <div className="flex gap-[30px] items-start text-white md:w-[300px] w-full">
            {user?.image && <Avatar src={user?.image} alt={user?.fullName} />}
            <div className="flex flex-col gap-[14px]">
              <div className="flex gap-1">
                <div className="text-[16px] bg-red-300">{user?.fullName}</div>
                {user?.emailVerifiedStatus === "verified" && (
                  <div className="ml-1">
                    <Image src={verify} alt={""} />
                  </div>
                )}
              </div>
              <div className="flex  gap-[9px] items-center">
                <h4 className="text-[12px]">Email</h4>
                <div className="bg-white w-1 h-1 rounded-[50%]"></div>
                <div className="text-[12px]">{user?.email}</div>
              </div>
                <div className="flex  gap-[9px] items-center">
                <h4 className="text-[12px]">Gender</h4>
                <div className="bg-white w-1 h-1 rounded-[50%]"></div>
                <div className="text-[12px]">{user?.gender}</div>
              </div>
                <div className="flex  gap-[9px] items-center">
                <h4 className="text-[12px]">Phone</h4>
                <div className="bg-white w-1 h-1 rounded-[50%]"></div>
                <div className="text-[12px]">{user?.phone}</div>
              </div>
              {/* <div className="flex  gap-[9px] items-center">
                {user?.gender && (
                  <h4 className="text-[12px]">
                    {" "}
                    <span>
                      {" "}
                      <Image src={gender} alt={""} />
                    </span>
                    {user?.gender}
                  </h4>
                )}
                {user?.phone && user?.gender && (
                  <div className="bg-white w-1 h-1 rounded-[50%]"></div>
                )}

                {user?.phone && (
                  <div className="text-[12px]">
                    {" "}
                    <span>
                      {" "}
                      <Image src={birth} alt={""} />
                    </span>
                    {user?.phone}
                  </div>
                )}
              </div> */}

              <div className="md:w-[213px] w-full bg-faintWhite flex justify-between text-white p-3 rounded-md h-[53px] gap-3">
                <div className="flex flex-col justify-between">
                  <div className="text-[10px]">Escrow Balance</div>
                  <div className="text-xs font-[500]">
                    ₦ {user?.wallet?.escrowBalance}
                  </div>
                </div>
                <div className="flex flex-col justify-between">
                  <div className="text-[10px] ">Withdrawable Balance</div>
                  <div className="text-xs font-[500]">
                    {" "}
                    ₦ {user?.wallet?.withdrawableBalance}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col  gap-[30px] justify-around text-white md:w-[300px] w-full h-full mt-[30px]">
               <div className="flex  gap-[9px] items-center">
                <h4 className="text-[12px]">House Address</h4>
                <div className="bg-white w-1 h-1 rounded-[50%]"></div>
                <div className="text-[12px]">{user?.profile?.homeLocation?.homeAddress || 'not set'}</div>
              </div>
                <div className="flex  gap-[9px] items-center">
                <h4 className="text-[12px]">Work Location</h4>
                <div className="bg-white w-1 h-1 rounded-[50%]"></div>
                <div className="text-[12px]">{user?.profile?.workLocation?.workAddress || 'not set'}</div>
              </div>
                <div className="flex  gap-[9px] items-center">
                <h4 className="text-[12px]">Completed Rides</h4>
                <div className="bg-white w-1 h-1 rounded-[50%]"></div>
                <div className="text-[12px]">{user?.profile?.completedRides || 'nil'}</div>
              </div>
         
          </div>

          <div className="flex flex-col justify-around text-white w-full md:w-[200px]">
            <div className="text-white text-[13px] my-2 md:text-center">
              Total Trips
            </div>
            <div className="flex md:flex-col flex-row w-full gap-3 items-center">
              <div className="bg-faintWhite p-[11px] w-[117px] rounded-md ">
                <div className="text-[10px] ">Successful</div>
                <div className="text-sm font-semibold">
                  {" "}
                  {
                    trips?.filter((item: any) => item.status === "Completed")
                      .length
                  }
                </div>
              </div>
              <div className="bg-faintWhite p-[11px]  w-[117px] rounded-md ">
                <div className="text-[10px] ">Cancelled</div>
                <div className="text-sm font-semibold">
                  {" "}
                  {
                    trips?.filter((item: any) => item.status === "Canceled")
                      .length
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-[30px]">
          {" "}
          <Box
            sx={{ width: "100%" }}
            style={{
              background: "white",
              height: "100vh",
              fontFamily: "ClashDisplay",
            }}
          >
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <Tabs
                value={value}
                onChange={handleChange}
                aria-label="basic tabs example"
                style={{ background: "#edf2f7" }}
                // classes={{ flexContainer: classes.flexContainer }}
              >
                {MyRidersValue.map(value => (
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
              <Trip data={trips} type="rider" />
            </TabPanel>
            <TabPanel value={value} index={1}>
              <BankDetails data={user?.bank} />
            </TabPanel>
            <TabPanel value={value} index={2}>
              <div className="w-[500px]">
                {trips && <TrackRide trip={trips[0]} />}
              </div>
            </TabPanel>
          </Box>
        </div>
      </div>
    </ParentContainer>
  );
};
export const getServerSideProps: GetStaticProps = async (context: any) => {
  const riderID = context.params.riderId;
  return {
    props: {
      riderID,
    },
  };
};
export default OneUser;
