import React, { useEffect } from "react";
import data from "./assets/data/data.json";
import * as Cesium from "cesium";
const { Cartesian3, Ion, createWorldTerrainAsync } = Cesium;
import dotenv from "dotenv";

import {
  Viewer,
  Entity,
  PointGraphics,
  EntityDescription,
  KmlDataSource,
  GeoJsonDataSource,
  Camera,
  CameraFlyTo,
} from "resium";

const terrainProvider = createWorldTerrainAsync();

export default function App() {
  const position = Cartesian3.fromDegrees(-6.251, 53.422, -1);
  const pointGraphics = { pixelSize: 5 };

  // Don't forget to change your token

  Ion.defaultAccessToken = process.env.MY_TOKEN;

  const flightData = (
    <Entity
      position={Cartesian3.fromDegrees(
        data[0].longitude,
        data[0].latitude,
        data[0].altitude
      )}
      model={{
        uri: "public/small-airplane-v3.gltf",
        minimumPixelSize: 128,
        maximumScale: 5,
      }}
    >
      <EntityDescription>
        <h1>{data[0].callSign}</h1>
        <p>{data[0].icao}</p>
      </EntityDescription>
    </Entity>
  );

  return (
    <div>
      <Viewer full>
        <Camera
          view={{
            destination: Cartesian3.fromDegrees(-6.25123, 53.42, 150),
            orientation: { pitch: Cesium.Math.toRadians(-20) },
          }}
        />

        <CameraFlyTo
          destination={Cartesian3.fromDegrees(-6.25123, 53.42, 150)}
          orientation={{ pitch: Cesium.Math.toRadians(-20) }}
          duration={4}
        />
        {flightData}
      </Viewer>
    </div>
  );
}
