"use client";

import { useEffect, useState } from "react";
import ReactMapGL, {
  GeolocateControl,
  Source,
  Layer,
  FullscreenControl,
  Marker,
  NavigationControl,
  ScaleControl,
  LinearInterpolator,
  WebMercatorViewport,
  Popup,
} from "@goongmaps/goong-map-react";
import polyline from "@mapbox/polyline";
import { FeatureCollection } from "geojson";
import { mapService } from "@/services/api/map";
import { PiMapPinFill } from "react-icons/pi";

const geolocateStyle = {
  top: 0,
  left: 0,
  padding: "10px",
};

const positionOptions = { enableHighAccuracy: true };

const fullscreenControlStyle = {
  top: 36,
  left: 0,
  padding: "10px",
};

const navStyle = {
  top: 72,
  left: 0,
  padding: "10px",
};

const scaleControlStyle = {
  bottom: 36,
  left: 0,
  padding: "10px",
};

const MapTracking = ({
  startLocation,
  endLocation,
  stopLocations,
  showUserLocation,
}: {
  startLocation: any;
  endLocation: any;
  stopLocations: any;
  showUserLocation: boolean;
}) => {
  const [viewport, setViewport] = useState({
    width: 800,
    height: 600,
    latitude: 21.0285,
    longitude: 105.8542,
    zoom: 12,
    bearing: 0,
    pitch: 0,
    transitionDuration: 0,
    transitionInterpolator: new LinearInterpolator(),
  });
  const [route, setRoute] = useState<FeatureCollection | null>(null);
  const [distance, setDistance] = useState<number | null>(null);
  const [duration, setDuration] = useState<number | null>(null);
  const [midpoint, setMidpoint] = useState<[number, number] | null>(null);

  useEffect(() => {
    const getRoute = async () => {
      const response = await mapService.getTripRoute(
        startLocation.coordinates.join(","),
        endLocation.coordinates.join(","),
        stopLocations
          .map((location: any) => location.coordinates.join(","))
          .join(";")
      );

      const decodedPolyline = polyline.decode(response.data.trips[0].geometry);

      const coordinates = decodedPolyline.map(
        ([lat, lng]: [number, number]) => [lng, lat]
      );

      const geojson: FeatureCollection = {
        type: "FeatureCollection",
        features: [
          {
            type: "Feature",
            geometry: {
              type: "LineString",
              coordinates: coordinates,
            },
            properties: null,
          },
        ],
      };

      const bounds = coordinates.reduce(
        (acc: any, coord: any) => {
          return [
            [Math.min(acc[0][0], coord[0]), Math.min(acc[0][1], coord[1])],
            [Math.max(acc[1][0], coord[0]), Math.max(acc[1][1], coord[1])],
          ];
        },
        [coordinates[0], coordinates[0]]
      );

      const { longitude, latitude, zoom } = new WebMercatorViewport(
        viewport
      ).fitBounds(bounds, {
        padding: 20,
      });

      setRoute(geojson);
      setViewport({
        ...viewport,
        latitude,
        longitude,
        zoom,
        transitionDuration: 1000,
        transitionInterpolator: new LinearInterpolator(),
      });
      setDistance(response.data.trips[0].distance);
      setDuration(response.data.trips[0].duration);

      const midIndex = Math.floor(coordinates.length / 2);
      setMidpoint(coordinates[midIndex]);
    };
    if (
      startLocation &&
      endLocation &&
      stopLocations.every((location: any) => location.coordinates !== null)
    )
      getRoute();
    else {
      setRoute(null);
    }
  }, [startLocation, endLocation, stopLocations]);

  const formatDuration = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    if (hrs === 0) {
      return `${mins}phút`;
    }
    return `${hrs} giờ ${mins} phút`;
  };

  return (
    <ReactMapGL
      {...viewport}
      width="100%"
      height="100%"
      mapStyle="https://tiles.goong.io/assets/goong_map_web.json"
      onViewportChange={(newViewport: any) => setViewport(newViewport)}
      goongApiAccessToken={process.env.NEXT_PUBLIC_GOONG_MAPTILES_KEY}
    >
      {startLocation && (
        <Marker
          longitude={startLocation.coordinates[1]}
          latitude={startLocation.coordinates[0]}
          offsetLeft={-6}
          offsetTop={-12}
        >
          <div className="w-3 h-3 rounded-full border-2 border-black bg-white"></div>
        </Marker>
      )}
      {stopLocations
        ?.filter((stopLocation: any) => stopLocation.coordinates !== null)
        .map((stopLocation: any) => (
          <Marker
            key={stopLocation.coordinates[0]}
            longitude={stopLocation.coordinates[1]}
            latitude={stopLocation.coordinates[0]}
            offsetLeft={-6}
            offsetTop={-12}
          >
            <div className="w-3 h-3 rounded-full border-2 border-black bg-white"></div>
          </Marker>
        ))}
      {endLocation && (
        <Marker
          longitude={endLocation.coordinates[1]}
          latitude={endLocation.coordinates[0]}
          offsetLeft={-12}
          offsetTop={-24}
        >
          <PiMapPinFill size={24} color="#ea4335" />
        </Marker>
      )}
      {showUserLocation && (
        <GeolocateControl
          style={geolocateStyle}
          positionOptions={positionOptions}
          trackUserLocation
          auto
        />
      )}
      <FullscreenControl style={fullscreenControlStyle} />
      <NavigationControl style={navStyle} />
      <ScaleControl style={scaleControlStyle} />
      {route && (
        <Source id="route" type="geojson" data={route}>
          <Layer
            id="route"
            type="line"
            layout={{
              "line-join": "round",
              "line-cap": "round",
            }}
            paint={{
              "line-color": "#0f53ff",
              "line-width": 8,
            }}
          />
        </Source>
      )}
      {midpoint && route && (
        <Popup
          longitude={midpoint[0]}
          latitude={midpoint[1]}
          closeButton={false}
          anchor="bottom"
        >
          <div>
            <p className="text-sm font-semibold">
              {(distance! / 1000).toFixed(2)} km
            </p>
            <p className="text-[12px] font-semibold">
              {formatDuration(duration!)}
            </p>
          </div>
        </Popup>
      )}
    </ReactMapGL>
  );
};

export default MapTracking;
