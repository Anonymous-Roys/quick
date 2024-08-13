import React, { useState } from 'react';

function AirtagForm({ onSearch }) {
    const [airtagId, setAirtagId] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        onSearch(airtagId.trim().toUpperCase());
        setAirtagId('');
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={airtagId}
                onChange={(e) => setAirtagId(e.target.value)}
                placeholder="Enter Airtag ID"
                required
            />
            <button type="submit">Find</button>
        </form>
    );
}

export default AirtagForm;
