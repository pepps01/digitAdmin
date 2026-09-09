import { Dialog, DialogActions, DialogContent } from "@mui/material"
import Image from "next/image"
import { useRouter } from "next/router"
import StatusCell from "./StatusCell"

const MapDialog = ({
  isModalOpen,
  setIsModalOpen,
  img,
  setSelectedTrip,
}: any) => {
  const router = useRouter()
  return (
    <Dialog open={isModalOpen} onClose={() => setIsModalOpen(false)}>
      <div className="p-[34px]">
        <h1 className="text-center text-xl text-secondary">
          {img && img?.pickupLocation}
        </h1>
        <h3 className="text-center text-2xl text-darkPurple">TO</h3>
        <h1 className="text-center text-xl text-secondary">
          {img && img?.dropoffLocation}
        </h1>

        <DialogContent>
          <div>
            <div className="flex mb-3 items-center justify-between md:flex-row flex-col">
              <div className="flex gap-3  items-center md:flex-row flex-col">
                <Image
                  src={img?.driver?.image}
                  alt="Larger Avatar"
                  style={{
                    width: "50px",
                    height: "50px",
                    borderRadius: "16px",
                  }}
                  width={50}
                  height={50}
                />
                <h3 className="font-bold">Driver's Name :</h3>
                <h3 className="text-md text-text">{img?.driver?.name}</h3>
              </div>
              <button
                onClick={() => router.push(`/cue/drivers/${img?.driver?.id}`)}
                className=" rounded-md  py-2 px-2 text-darkPurple  text-sm hover:bg-blue-100 hover:text-darkPurple hover:border-blue-300"
              >
                View Driver
              </button>
            </div>
            <div className="flex gap-3 items-center justify-between  mb-3 md:flex-row flex-col">
              <button
                onClick={() => router.push(`/cue/riders/${img?.riderId}`)}
                className=" rounded-md  py-2 px-2 text-darkPurple  text-sm hover:bg-blue-100 hover:text-darkPurple hover:border-blue-300"
              >
                View Rider
              </button>
              <div className="flex gap-3  items-center md:flex-row flex-col">
                <h3 className="font-bold">Rider's Name :</h3>
                <h3 className="text-md  text-text">{img?.riderName}</h3>
                <Image
                  src={img?.riderImage || ""}
                  alt={img?.riderName}
                  style={{
                    width: "50px",
                    height: "50px",
                    borderRadius: "16px",
                  }}
                  width={50}
                  height={50}
                />
              </div>
            </div>
          </div>
          <div className="flex gap-3 mb-3 items-center">
            <h3 className="font-bold">Vehicle Status :</h3>
            <h3 className="text-md text-text capitalize">
              {img?.vehicleStatus}
            </h3>
          </div>
          <div className="flex gap-3 mb-3 items-center  justify-end">
            <h3 className="font-bold">Trip Status :</h3>
            <StatusCell status={img?.status} />
          </div>
        </DialogContent>
      </div>
      <DialogActions>
        <button
          onClick={() => setIsModalOpen(false)}
          className="border border-red-500 rounded-md  py-2 px-4 text-red-500 text-sm  hover:bg-red-100 hover:text-white hover:border-none"
        >
          Cancel
        </button>
        <button
          onClick={() => {
            setIsModalOpen(false)
            setSelectedTrip(img)
          }}
          className="bg-darkPurple rounded-md  py-2 px-4 text-white text-sm hover:bg-blue-100 hover:text-darkPurple hover:border-blue-300"
        >
          View Path
        </button>
      </DialogActions>
    </Dialog>
  )
}

export default MapDialog
