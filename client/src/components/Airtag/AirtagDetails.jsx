import React from 'react';

function AirtagDetails({ details }) {
    const handleOpenMap = () => {
        alert(`
            Airtag ID: ${details.airtagId}
            Owner: ${details.owner}
            Item: ${details.item}
            Course: ${details.course}

            Opening Google Maps location.
        `);
        window.open(details.mapLink, '_blank');
    };

    return (
        <div id="item-details text-black">
            <h2>Item Details</h2>
            <p><strong>Owner:</strong> {details.owner}</p>
            <p><strong>Item:</strong> {details.item}</p>
            <p><strong>Course:</strong> {details.course}</p>
            <button onClick={handleOpenMap}>Open Map Location</button>
        </div>
    );
}

export default AirtagDetails;
