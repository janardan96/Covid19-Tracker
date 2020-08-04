import React from 'react'
import { Map as LeafletMap, TileLayer } from "react-leaflet"
import { showDataOnMap } from "./utils"
import "./Map.css";

function Map({ countries, casesType, center, zoom }) {
    return (
        <div>
            <LeafletMap center={center} zoom={zoom} style={{ height: '410px' }}>
                <TileLayer
                    attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                {showDataOnMap(countries, casesType)}
            </LeafletMap>

        </div>
    )
}

export default Map


// https://vod-progressive.akamaized.net/exp=1596566869~acl=%2Fvimeo-prod-skyfire-std-us%2F01%2F3053%2F16%2F415266687%2F1787689841.mp4~hmac=bce2938d679fe582a1f8e435233cd9233326ea47ba540b44e37cb6f416ac2a99/vimeo-prod-skyfire-std-us/01/3053/16/415266687/1787689841.mp4?filename=Whiteboard+Webinar+JS+%28Version+1%29.mp4