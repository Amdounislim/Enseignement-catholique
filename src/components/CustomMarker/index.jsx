import React from 'react'
import { Marker } from "react-map-gl";



const CustomMarker = ({ city, inputCategory, setShowPopup }) => {

    return <Marker
        longitude={city.lng}
        latitude={city.lat}
        anchor="bottom"
        onClick={(e) => {

            e.originalEvent.stopPropagation();
            setShowPopup(city);
        }}
        color={city.categories.find(el => el.name === inputCategory)?.color || city.categories[0].color}
    />
}

export default CustomMarker