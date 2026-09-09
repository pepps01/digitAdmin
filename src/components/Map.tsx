/* eslint-disable react-hooks/rules-of-hooks */
import { Dialog } from "@mui/material"
import {
  DirectionsRenderer,
  GoogleMap,
  InfoWindow,
  Marker,
  useJsApiLoader,
} from "@react-google-maps/api"
import Image from "next/image"
import { useEffect, useMemo, useState } from "react"
import { Bars } from "react-loader-spinner"
import { useAppSelector } from "src/Hooks/use-redux"
import MapDialog from "./MapDialog"

const Map = ({
  address,
  name,
  type = "",
  image = "https://easy.unikmarketing.org/storage/profile/VhGIKKDrWcjFxwKx1MyS",
}: any) => {
  const { activeDrivers: drivers }: any = useAppSelector(
    (state: any) => state.user
  )
  const { activeTrips: active }: any = useAppSelector(
    (state: any) => state.trip
  )
  const [selectedTrip, setSelectedTrip] = useState<any>("")
  const [activeTrips, setActiveTrips] = useState<any[]>([])
  const [key, setKey] = useState<number>(0)
  const [directions, setDirections] = useState<any>(null)
  const [markerPositions, setMarkerPositions] = useState<any>()
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [duration, setDuration] = useState<any>(null)
  const [distance, setDistance] = useState<any>(null)
  const [img, setImg] = useState<any>({})
  const center = useMemo(() => {
    return {
      lat:
        type === "all"
          ? address?.latitude
          : active[0]?.currentLocation?.lat || 6.5548888,
      lng:
        type === "all"
          ? address?.longitude
          : active[0]?.currentLocation?.lng || 3.3820555,
    }
  }, [active, address?.latitude, address?.longitude, type])

  const handleAvatarClick = (data) => {
    setIsModalOpen(true)
    setImg(data)
  }

  const containerStyle = {
    width: "100%",
    height: "100%",
  }
  const options = {
    // styles: mapStyles,
    disableDefaultUI: true,
    zoomControl: true,
    zoomControlOptions: {
      position:
        typeof window !== "undefined" &&
        window.google?.maps.ControlPosition.RIGHT_CENTER,
    },
  }

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
  })

  useEffect(() => {
    const calculateRoute = async () => {
      const google = window.google
      const directionsService = new window.google.maps.DirectionsService()
      const routeData: any = {
        origin: selectedTrip?.currentLocation,
        destination: selectedTrip?.dropoff,
        travelMode: google.maps.TravelMode.DRIVING,
      }

      await directionsService
        ?.route(routeData)
        .then((results: any) => {
          console.log("rr", results)
          setDirections(results)
          setMarkerPositions(selectedTrip?.currentLocation)
          //           animateMarker(selectedTrip.currentLocation, results.routes[0].overview_path);
          const dist = results?.routes[0].legs[0].distance.text
          setDistance(dist)
          const dur = results?.routes[0].legs[0].duration.text
          setDuration(dur)
        })
        .catch((err) => {
          // console.log(err);
        })
    }

    if (selectedTrip) {
      calculateRoute()
    }
  }, [selectedTrip])

  useEffect(() => {
    if (type === "track") {
      setTimeout(() => {
        setActiveTrips(active)
      }, 3000)
    }
  }, [active, type])

  useEffect(() => {
    setKey(1)
  }, [])

  return isLoaded ? (
    <>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={12}
        options={options}
        key={key}
      >
        {/* <Marker position={center} key="admissn" /> */}
        {selectedTrip ? (
          <>
            {directions ? <DirectionsRenderer directions={directions} /> : null}
            <InfoWindow
              position={{
                lat: selectedTrip?.currentLocation.lat,
                lng: selectedTrip?.currentLocation.lng,
              }}
            >
              <h3>
                {distance} {duration}
              </h3>
            </InfoWindow>
          </>
        ) : (
          <>
            <Marker
              position={center}
              key={name + "user"}
              label={name}
              icon={{
                url: image,

                scaledSize: new window.google.maps.Size(20, 20), // adjust the size as needed
              }}
              clickable
              onClick={() => setIsOpen(true)}
            />

            {type === "track" &&
              activeTrips?.map((item, index) => (
                <Marker
                  position={item?.currentLocation}
                  key={`${item?.id}${index}`}
                  label={item?.driver?.name}
                  icon={{
                    url: item?.driver?.image,
                    scaledSize: new window.google.maps.Size(30, 30), // adjust the size as needed
                  }}
                  clickable
                  onClick={() => {
                    setSelectedTrip(null)
                    setDirections(null)
                    handleAvatarClick(item)
                  }}
                />
              ))}
            <Marker
              position={center}
              key={name}
              label={name}
              icon={{
                url: image,

                scaledSize: new window.google.maps.Size(20, 20), // adjust the size as needed
              }}
              clickable
              onClick={() => setIsOpen(true)}
            />
          </>
        )}
        <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
          <div>
            <h3>{name}</h3>
            <Image
              src={image}
              alt="Larger Avatar"
              style={{ width: "400px", height: "400px" }}
              width={400}
              height={400}
            />
          </div>
        </Dialog>
        <MapDialog
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          img={img}
          setSelectedTrip={setSelectedTrip}
        />
        {selectedTrip && (
          <button
            onClick={() => {
              setDirections(null)
              setSelectedTrip(null)
            }}
            className="absolute top-2  right-2 bg-darkPurple rounded-md  py-2 px-4 text-white text-sm hover:bg-blue-100 hover:text-darkPurple hover:border-blue-300"
          >
            Go Back
          </button>
        )}
      </GoogleMap>
    </>
  ) : (
    <Bars wrapperStyle={{ alignSelf: "center", display: "flex" }} />
  )
}

export default Map
