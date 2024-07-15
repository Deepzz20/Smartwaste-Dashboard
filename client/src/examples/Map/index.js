import { useEffect, useState } from "react";
import { Card } from "@mui/material";

import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";

import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import axios from "axios";


export default function Map() {

    // Function to get bins data
    const getBins = async () => {
        try {
            const response = await axios.get('/bins/getAllBins');
            initializeMap(response.data);
        } catch (error) {
            const errorMessage = error.response?.data || error.message || 'Unknown error occurred';
            console.error('Error getting bins data:', errorMessage);
        }
    };

    useEffect(() => {
        getBins();
    }, []);


    const initializeMap = (binsData) => {
        // Set Mapbox access token
        mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_API_KEY;

        // Initialize the map
        const map = new mapboxgl.Map({
            container: "map",
            style: "mapbox://styles/mapbox/navigation-night-v1",
            center: [80.2, 13.05],
            zoom: 11,
            attributionControl: false,
        });

        // Add navigation control
        map.addControl(new mapboxgl.NavigationControl({ showCompass: true, showZoom: true, visualizePitch: true }));

        // Load custom marker image
        map.on("load", () => {
            binsData.forEach(bin => {
                const coordinatesArray = bin.coordinates.split(',').map(coord => parseFloat(coord.trim()));
                coordinatesArray.reverse();
                addMarker(map, coordinatesArray, bin.binLevel);
            });
        });

        // Set minimum zoom level
        map.on("zoom", () => {
            const minZoom = 10.5;
            if (map.getZoom() < minZoom) {
                map.setZoom(minZoom);
            }
        });

    }

    // Function to add markers based on the number
    const addMarker = (map, coordinates, number) => {
        const color = number < 35 ? "green" : number < 75 ? "orange" : "red";

        const marker = new mapboxgl.Marker({ color, draggable: false });
        marker.setLngLat(coordinates).addTo(map);
        // console.log("Marker Added at : ", coordinates, number);
    };

    return (
        <Card>
            <VuiTypography variant="lg" color="white" fontWeight="bold">
                Full Map
            </VuiTypography>
            <VuiBox padding="10px" style={{ width: "100%", height: "500px" }}>
                <div id="map" style={{ width: "100%", height: "100%" }}></div>
            </VuiBox>
        </Card>
    );
}
