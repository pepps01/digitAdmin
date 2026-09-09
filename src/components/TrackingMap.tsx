import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api"
import { useEffect, useState } from "react"
import { useAppSelector } from "src/Hooks/use-redux"

const TrackingMap = () => {
  const [directions, setDirections] = useState([])
  const [markerPositions, setMarkerPositions] = useState([])
  const [selectedTrip, setSelectedTrip] = useState<any>("")
  const [duration, setDuration] = useState<any>(null)
  const [distance, setDistance] = useState<any>(null)
  const { activeTrips }: any = useAppSelector((state: any) => state.trip)
  const containerStyle = {
    width: "100%",
    height: "100%",
  }
  const options = {
    // styles: TrackingMapStyles,
    disableDefaultUI: true,
    zoomControl: true,
    zoomControlOptions: {
      position:
        typeof window !== "undefined" &&
        window.google?.maps.ControlPosition.RIGHT_CENTER,
    },
  }
  const { isLoaded } = useJsApiLoader({
    id: "google-TrackingMap-script",
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
  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      zoom={12}
      options={options}
      // ... Your GoogleMap Props ...
    >
      {/* {directions.map((direction, index) => (
        <Polyline
          path={direction.routes[0].overview_path}
          // ... Other polyline props ...
        />
      ))} */}

      {activeTrips.map((position, index) => (
        <Marker position={position?.currentLocation} key={index} />
      ))}
    </GoogleMap>
  ) : (
    <div>Loading.....</div>
  )
}

export default TrackingMap
