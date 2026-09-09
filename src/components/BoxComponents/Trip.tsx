import moment from "moment"
import Image from "next/image"
import { useRouter } from "next/router"
import { BsArrowRight } from "react-icons/bs"
import emptyState from "../../../src/assets/image/empty.png"
import finish from "../../../src/assets/image/finish.svg"
import line from "../../../src/assets/image/line.svg"
import point from "../../../src/assets/image/points.svg"
import profileDriv from "../../../src/assets/image/profileDriv.svg"
import progress from "../../../src/assets/image/progres.svg"
import StatusCell from "../StatusCell"

const Trip = ({ data, type }: any) => {
  const router = useRouter()
  console.log(data)
  return data.length > 0 ? (
    <div className="flex flex-col gap-4 w-full md:w-[400px] max-h-[700px] overflow-auto">
      {data?.map((item: any) => (
        <div
          className="shadow-tableShadow w-full p-[10px] md:p-[20px]"
          key={item?.tripID}
        >
          <div className="flex justify-between items-start mb-5">
            <div className=" w-[70px]">
              <div className="text-text text-[10px] mt-[10px]">
                {moment(item?.requestDateTime).calendar()}
              </div>
              <div className="text-grey text-[20px]">
                {item.totalDistanceCovered}
              </div>
            </div>

            <div className="flex flex-col gap-1 ">
              <Image src={point} alt={""} />
              <Image src={line} alt={""} />
              <Image
                src={item.status === "completed" ? progress : finish}
                alt={""}
              />
            </div>
            <div className=" w-[250px]">
              <div>
                <div className="text-text text-[10px] ">Pickup Location</div>
                <div className="text-grey text-[10px] md:text-xs w-[200px]">
                  {item.pickupLocation}{" "}
                </div>
              </div>
              <div>
                <div className="text-text text-[10px] mt-[10px]">Drop-Off</div>
                <div className="text-grey text-[10px] md:text-xs ">
                  {item.dropoffLocation}{" "}
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-between">
            <div className="flex gap-2">
              <div></div>
              {type === "rider" ? (
                <div>
                  {item?.driver?.image ? (
                    <Image
                      src={item?.driver?.image}
                      alt={""}
                      width={30}
                      height={30}
                      style={{ borderRadius: "50%" }}
                    />
                  ) : (
                    <Image src={profileDriv} alt={""} width={20} height={20} />
                  )}
                </div>
              ) : (
                <div>
                  {item?.rider?.image ? (
                    <Image
                      src={item?.rider?.image}
                      alt={""}
                      width={30}
                      height={30}
                      style={{ borderRadius: "50%" }}
                    />
                  ) : (
                    <Image src={profileDriv} alt={""} width={20} height={20} />
                  )}
                </div>
              )}

              <div className="flex flex-col gap-2">
                <div className="text-grey text-[10px] md:text-xs ">
                  {type === "rider"
                    ? item?.driver?.fullName
                    : item?.rider?.fullName}
                </div>
                <div className="text-text text-[10px] ">
                  {" "}
                  {type === "rider" ? item?.driver?.email : item.rider?.email}
                </div>
                <div className={`text-[8px]`}>
                  <StatusCell status={item?.status} />
                </div>
              </div>
            </div>
            <div
              className="flex flex-row mr-3 gap-3 items-center hover:border-b hover:border-offWhite h-[20px]"
              onClick={() => router.push(`/cue/trips/${item?.tripID}`)}
            >
              <div className="text-[12px] text-text cursor-pointer">
                View Trip
              </div>
              <BsArrowRight color="rgba(132, 135, 163, 1)" />
            </div>
          </div>
        </div>
      ))}
    </div>
  ) : (
    <div className="flex flex-col items-center justify-center mx-auto mt-10 ">
      <Image src={emptyState} alt="" />
      <div className="text-[#8487A3] text-xs -mt-2">No Trips Available</div>
    </div>
  )
}
export default Trip
