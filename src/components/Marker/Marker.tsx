import React from 'react'; 

import './styles.css'

interface IMarkerProps {
    _id: string;
}

const Marker: React.FC<any> = props => {
    return(
        <div className="marker" />
    )
}

export default Marker;