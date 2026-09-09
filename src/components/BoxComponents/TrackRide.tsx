import moment from "moment";
import Image from "next/image";
import { AiOutlineCar, AiOutlineReload } from "react-icons/ai";
import { getMinutesDifference } from "src/utils/helperFunctions";
import emptyState from "../../../src/assets/image/empty.png";
import book from "../../assets/image/book.svg";
import tripComplete from "../../assets/image/tripComplete.svg";
import tripStart from "../../assets/image/tripStart.svg";
import warning from "../../assets/image/warning.svg";


const TrackRide = ({ trip, refreshHandler }: any) => {
  console.log(trip);
  const imageSort = (name: any) => {
    if (name === "Booking Confirmed") {
      return book;
    }
    if (name === "Trip Started") {
      return tripStart;
    }
    if (name === "Trip Cancelled") {
      return warning;
    }
    if (name === "Trip Completed") {
      return tripComplete;
    }
  };

  return trip ? (
    <div className="md:max-w-[40vw]">
      {/* <div className="flex justify-between gap-2 ">
        <div className="bg-[#BBAC69] rounded-md py-1  px-[14px] text-white w-[132px]">
          <div className="text-[12px] mb-3 font-semibold text-center">
            Distance Covered
          </div>
          <div className="text-[10px] text-center">
            {trip?.totalDistanceCovered
              ? trip?.totalDistanceCovered
              : "Trip yet to be completed"}
          </div>
        </div>
        <div className="bg-[#49D3BA] rounded-md py-1  px-[14px] text-white  w-[147px] ">
          <div className="text-[12px] mb-3 font-semibold text-center">Time</div>
          <div className="text-[10px] text-center">
            {trip?.tripDuration} minutes
          </div>
        </div>
        <div className="bg-darkPurple text-white text-[8px]  w-[78px] flex items-center justify-center rounded-md cursor-pointer">
          <span className="mr-1">
            <Image src={map} alt={""} />
          </span>
          View Route
        </div>
      </div> */}
      <div className="flex justify-between items-center mt-4  ">
        <div className="flex gap-2 items-center">
          <div className="text-sm text-grey font-bold">Timeline</div>
          {/* <div className="text-[#49D3BA] text-[10px]">Updated 5 mins ago</div> */}
        </div>
        <div className="flex gap-1">
       <AiOutlineReload color="rgb(1 149 255)"  size={12} />
          <div
            className="text-darkPurple text-[10px] cursor-pointer"
            onClick={refreshHandler}
          >
            Refresh
          </div>
        </div>
      </div>
      <div className="flex flex-col mt-6 ">
        {trip?.requestDateTime && (
          <div
            className={`justify-start flex border-b border-gray-300 mb-2 py-3`}
          >
            <div className="flex flex-col mr-1">
              <div className="flex w-[180px] ">
                <AiOutlineCar color="rgb(1 149 255)"  size={14} />
                <div className="text-grey text-[10px] ">
                  <span className="text-text ml-2">
                    {moment(trip?.requestDateTime).format(
                      "MM/DD/YYYY, h:mm:ss a"
                    )}
                  </span>
                </div>
              </div>
            </div>

            <div className=" flex flex-col gap-2">
              <div className="text-grey text-[12px]">Booking Made</div>
              <div className="text-text text-[12px]">
                {trip?.requestLocation}
              </div>
              <div className="text-[12px] text-lightPurple ">
                {/* {trip?.tripDuration} min */}
                <span className="mr-2">{getMinutesDifference(trip?.requestDateTime, trip?.requestAcceptanceTime)} </span>
              </div>
            </div>
          </div>
        )}
        {trip?.requestAcceptanceTime && (
          <div
            className={`justify-start flex  border-b border-gray-300 mb-2 py-3`}
          >
            <div className="flex flex-col mr-1">
              <div className="flex w-[180px] ">
                    <AiOutlineCar color="rgb(1 149 255)"  size={14} />
                <div className="text-grey text-[12px] ">
                  <span className="text-text ml-2">
                    {moment(trip?.requestAcceptanceTime).format("LT")}
                  </span>
                </div>
              </div>
            </div>

            <div className=" flex flex-col gap-2">
              <div className="text-grey text-[12px]">Booking Confirmed</div>
              <div className="text-text text-[12px]">
                {trip?.requestLocation}
              </div>
              <div className="text-[12px] text-lightPurple ">
                {/* {trip?.tripDuration} min */}
                <span className="mr-2">{getMinutesDifference(trip?.requestAcceptanceTime, trip?.driverArrivalTime)} </span>
              </div>
            </div>
          </div>
        )}
        {trip?.driverArrivalTime && (
          <div
            className={`justify-start flex border-b border-gray-300 mb-2 py-3`}
          >
            <div className="flex flex-col mr-1">
              <div className="flex w-[180px] ">
                    <AiOutlineCar color="rgb(1 149 255)"  size={14} />
                <div className="text-grey text-[12px] ">
                  <span className="text-text ml-2">
                    {moment(trip?.driverArrivalTime).format("LT")}
                  </span>
                </div>
              </div>
            </div>

            <div className=" flex flex-col gap-2">
              <div className="text-grey text-[12px]">Driver Arrived</div>
              <div className="text-text text-[12px]">
                {trip?.requestLocation}
              </div>
            <div className="text-[12px] text-lightPurple ">
                {/* {trip?.tripDuration} min */}
                <span className="mr-2">{getMinutesDifference(trip?.driverArrivalTime, trip?.startTime)} </span>
              </div>
            </div>
          </div>
        )}
        {trip?.startTime && (
          <div
            className={`justify-start flex border-b border-gray-300 mb-2 py-3`}
          >
            <div className="flex flex-col mr-1">
              <div className="flex w-[180px] ">
                    <AiOutlineCar color="rgb(1 149 255)"  size={14} />
                <div className="text-grey text-[12px] ">
                  <span className="text-text ml-2">
                    {moment(trip?.startTime).format("LT")}
                  </span>
                </div>
              </div>
            </div>

            <div className=" flex flex-col gap-2">
              <div className="text-grey text-[12px]">Trip Started</div>
              <div className="text-text text-[12px]">
                {trip?.startTripLocation}
              </div>
                 <div className="text-[12px] text-lightPurple ">
                {/* {trip?.tripDuration} min */}
                <span className="mr-2">{getMinutesDifference(trip?.startTime, trip?.endTime || trip?.cancelDateTime)} </span>
              </div>
            </div>
          </div>
        )}
        {trip?.cancelDateTime && (
          <div
            className={`justify-start flex border-b border-gray-300 mb-2 py-3`}
          >
            <div className="flex flex-col mr-1">
              <div className="flex w-[180px] ">
                    <AiOutlineCar color="rgb(1 149 255)"  size={14} />
                <div className="text-grey text-[12px] ">
                  <span className="text-text ml-2">
                    {moment(trip?.cancelDateTime).format("LT")}
                  </span>
                </div>
              </div>
            </div>

            <div className=" flex flex-col gap-2">
              <div className="text-grey text-[12px]">Trip Cancelled</div>
              <div className="text-text text-[12px]">
                {trip?.cancelLocation}
              </div>
            </div>
          </div>
        )}
        {trip?.endTime && (
          <div className={`justify-start flex `}>
            <div className="flex flex-col mr-1">
              <div className="flex w-[180px] ">
                  <AiOutlineCar color="rgb(1 149 255)"  size={14} />
                <div className="text-grey text-[12px] ">
                  <span className="text-text ml-2">
                    {moment(trip?.endTime).format("LT")}
                  </span>
                </div>
              </div>
            </div>

            <div className=" flex flex-col gap-2">
              <div className="text-grey text-[12px]">Trip Completed</div>
              <div className="text-text text-[12px]">
                {trip?.dropoffLocation}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  ) : (
    <div className="flex flex-col items-center justify-center mx-auto mt-10">
      <Image src={emptyState} alt="" />
      <div className="text-[#8487A3] text-xs -mt-2">No Trip Data</div>
    </div>
  );
};
export default TrackRide;
