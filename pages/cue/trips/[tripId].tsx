import moment from "moment"
import Image from "next/image"
import { useRouter } from "next/router"
import { GetStaticProps } from "next/types"
import { useEffect } from "react"
import MapComponent from "src/components/MapComponent"
import ParentContainer from "src/components/ParentContainer"
import useLocation from "src/components/useLocation"
import useHTTPGet from "src/Hooks/use-httpget"
import { useAppDispatch, useAppSelector } from "src/Hooks/use-redux"
import { fetchATrip } from "src/redux/store/features/trip-slice"
import { uiActions } from "src/redux/store/ui-slice"
import { getMinutesDifference } from "src/utils/helperFunctions"
import verify from "../../../src/assets/image/verify.svg"
import TrackRide from "../../../src/components/BoxComponents/TrackRide"

const OneTrip = ({ tripId }: any) => {
  const request = useHTTPGet()
  const router = useRouter()
  const dispatch = useAppDispatch()
  const { trip, loading } = useAppSelector((state) => state.trip)
  const { location } = useLocation()

  useEffect(() => {
    dispatch(fetchATrip(tripId))
    // fetchATrip(tripId);
  }, [])
  console.log(trip)
  useEffect(() => {
    if (loading === true) {
      dispatch(uiActions.openLoader())
    }
    if (loading === false) {
      dispatch(uiActions.closeLoader())
    }
  }, [dispatch, loading])

  return (
    <ParentContainer>
      <div className=" p-[10px] md:p-[30px]">
        <div className="w-full flex items-center justify-end pb-5 gap-3 z-30 relative">
          <button
            className="text-sm text-white bg-darkPurple py-3 px-4 rounded-md flex items-center justify-center"
            onClick={() => router.back()}
          >
            <span style={{ marginRight: "5px", fontSize: "20px" }}>&lt;</span>
            Back to List
          </button>
        </div>
        <div className="bg-lightPurple flex-col rounded-[20px] px-[8px] py-[13px] md:px-[28px] flex md:flex-row justify-between mb-5 gap-3">
          <div className="text-white flex flex-col rounded-[20px] px-4 w-1/3">
            <div className="text-[13px] my-4">Trip Details</div>
            <div className="flex gap-[30px] items-start text-white flex-col">
              <div className="flex gap-[9px] items-center">
                <div className="text-[10px] ">Pickup Address</div>
                <div className="bg-white w-1 h-1 rounded-[50%]"></div>
                <div className="text-[10px]"> {trip?.pickupLocation}</div>
              </div>
              <div className="flex gap-[9px] items-center">
                <div className="text-[10px]  ">Dropoff Address</div>
                <div className="bg-white w-1 h-1 rounded-[50%]"></div>
                <div className="text-[10px]"> {trip?.dropoffLocation}</div>
              </div>
              <div className="flex gap-[9px] justify-start items-center">
                <div className="text-[10px]">Trip Date</div>
                <div className="bg-white w-1 h-1 rounded-[50%]"></div>
                <div className="text-[10px]">
                  {" "}
                  {moment(trip?.tripDate).format("ll")}
                </div>
              </div>
              <div className="w-[293px] bg-faintWhite gap-2 flex justify-between text-white p-3 rounded-md h-[53px]">
                <div className="flex flex-col justify-between">
                  <div className="text-[8px]">Price</div>
                  <div className="text-xs font-[500]">
                    ₦ {trip?.totalPrice || trip?.basePrice || 0}
                  </div>
                </div>
                <div className="flex flex-col justify-between">
                  <div className="text-[8px] ">Trip Duration</div>
                  <div className="text-xs font-[500]">
                    {getMinutesDifference(
                      trip?.requestDateTime,
                      trip?.endTime || trip?.cancelDateTime
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="text-white flex flex-col bg-lightPurple rounded-[20px] px-4 w-1/3">
            <div className="text-[13px] my-4">Driver Details</div>
            <div className="flex gap-[30px] items-start text-white flex-col">
              <div className="flex justify-between gap-[9px] items-center">
                <div className="text-[10px]">Full Name</div>
                <div className="bg-white w-1 h-1 rounded-[50%]"></div>
                <div className="flex gap-1">
                  <div className="text-[10px]">{trip?.driver?.fullName}</div>
                  <div className="">
                    {" "}
                    {trip?.driver?.emailVerifiedStatus === "verified" && (
                      <Image src={verify} alt={""} />
                    )}
                  </div>
                </div>
              </div>
              <div className="flex justify-between gap-[9px] items-center">
                <div className="text-[10px]">Phone Number</div>
                <div className="bg-white w-1 h-1 rounded-[50%]"></div>
                <div className="text-[10px]"> {trip?.driver?.phone}</div>
              </div>
              <div className="flex justify-between gap-[9px] items-center">
                <div className="text-[10px]">Email</div>
                <div className="bg-white w-1 h-1 rounded-[50%]"></div>
                <div className="text-[10px]"> {trip?.driver?.email}</div>
              </div>
              <div className="flex justify-between gap-[9px] items-center">
                <div className="text-[10px]">Gender</div>
                <div className="bg-white w-1 h-1 rounded-[50%]"></div>
                <div className="text-[10px]"> {trip?.driver?.gender}</div>
              </div>
            </div>
          </div>
          <div className="text-white flex flex-col bg-lightPurple rounded-[20px] px-4 w-1/3">
            <div className="text-[13px] my-4 ">Rider Details</div>
            <div className="flex gap-[30px] items-start text-white flex-col">
              <div className="flex justify-between gap-[9px] items-center">
                <div className="text-[10px]">Full Name</div>
                <div className="bg-white w-1 h-1 rounded-[50%]"></div>
                <div className="flex gap-1">
                  <div className="text-[10px]"> {trip?.rider?.fullName}</div>
                  <div className="left-1">
                    {" "}
                    {trip?.rider?.emailVerifiedStatus === "verified" ? (
                      <Image src={verify} alt={""} />
                    ) : null}
                  </div>
                </div>
              </div>
              <div className="flex justify-between gap-[9px] items-center">
                <div className="text-[10px]">Phone Number</div>
                <div className="bg-white w-1 h-1 rounded-[50%]"></div>
                <div className="text-[10px]"> {trip?.rider?.phone}</div>
              </div>
              <div className="flex justify-between gap-[9px] items-center">
                <div className="text-[10px]">Email</div>
                <div className="bg-white w-1 h-1 rounded-[50%]"></div>
                <div className="text-[10px]"> {trip?.rider?.email}</div>
              </div>
              <div className="flex justify-between gap-[9px] items-center">
                <div className="text-[10px]">Gender</div>
                <div className="bg-white w-1 h-1 rounded-[50%]"></div>
                <div className="text-[10px]"> {trip?.rider?.gender}</div>
              </div>
            </div>
          </div>
        </div>{" "}
        <div className="w-full flex flex-col  md:flex-row gap-4 h-auto min-h-[400px]">
          <div className="w-1/2">
            <TrackRide
              trip={trip}
              refreshHandler={() => dispatch(fetchATrip(tripId))}
            />
          </div>
          <div className="md:w-1/2  w-full h-[500px] border border-gray-400 rounded-md p-1">
            <MapComponent
              pickup={trip?.pickupLocation}
              dropoff={trip?.dropoffLocation}
            />
          </div>
        </div>
      </div>
    </ParentContainer>
  )
}
export const getServerSideProps: GetStaticProps = async (context: any) => {
  const tripId = context.params.tripId
  return {
    props: {
      tripId,
    },
  }
}
export default OneTrip
