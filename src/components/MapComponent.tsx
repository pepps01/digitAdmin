/* eslint-disable react-hooks/rules-of-hooks */
import {
  DirectionsRenderer,
  GoogleMap,
  Marker,
  useJsApiLoader,
} from "@react-google-maps/api"
import { useEffect, useMemo, useState } from "react"
import { getLatLng } from "src/utils/helperFunctions"

const MapComponent = ({ pickup, dropoff }: any) => {
  const [loc, setLoc] = useState()
  const [org, setOrg] = useState<any>()
  const [directionResponse, setDirectionResponse] = useState(null)
  const center = useMemo(() => {
    return {
      lat: org?.lat,
      lng: org?.lat,
    }
  }, [org])
  const containerStyle = {
    width: "100%",
    height: "100%",
  }
  console.log(pickup, dropoff)
  const options = {
    disableDefaultUI: true,
    zoomControl: true,
    zoomControlOptions: {
      position: window.google?.maps.ControlPosition.RIGHT_CENTER,
    },
  }

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
  })

  useEffect(() => {
    const fetchData = async () => {
      const result = await getLatLng(pickup)
      const resultR = await getLatLng(dropoff)
      setLoc(result)
      setOrg(resultR)
      console.log(result, resultR)
    }
    fetchData()
  }, [pickup, dropoff])

  useMemo(() => {
    const calculateRoute = async () => {
      const google = window.google
      const directionsService = new window.google.maps.DirectionsService()
      const routeData: any = {
        origin: org,
        destination: loc,
        travelMode: google.maps.TravelMode.DRIVING,
      }

      await directionsService
        ?.route(routeData)
        .then((results: any) => {
          console.log("rr", results)
          setDirectionResponse(results)
          const dist = results?.routes[0].legs[0].distance.text
          const dur = results?.routes[0].legs[0].duration.text
        })
        .catch((err) => {
          // console.log(err);
        })
    }

    setTimeout(() => {
      calculateRoute()
    }, 3000)
  }, [org, loc])
  console.log("kkk", org, loc)

  return isLoaded ? (
    <>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={12}
        options={options}
      >
        <Marker position={center} />

        {directionResponse && (
          <DirectionsRenderer directions={directionResponse} />
        )}
      </GoogleMap>
    </>
  ) : (
    <div>Loading.....</div>
  )
}

export default MapComponent
