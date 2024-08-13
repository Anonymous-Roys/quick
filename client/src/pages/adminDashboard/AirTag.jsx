import React, { useState } from 'react';

const airtagDetails = {
    "AT001": {
        mapLink: "https://maps.app.goo.gl/BXWAx2fhBBRD1AvE8",
        owner: "John Doe",
        item: "Laptop",
        course: "Computer Science"
    },
    "AT002": {
        mapLink: "https://maps.app.goo.gl/BXWAx2fhBBRD1AvE8",
        owner: "Jane Smith",
        item: "Backpack",
        course: "Engineering"
    },
    // Add more airtag details here...
};

const userAirtags = [
    { id: "AT001", item: "Laptop", owner: "John Doe" },
    { id: "AT002", item: "Backpack", owner: "Jane Smith" },
    // Add more airtags as needed
];

function AirTag() {
    const [airtagId, setAirtagId] = useState('');
    const [itemDetails, setItemDetails] = useState(null);

    const handleFind = (event) => {
        event.preventDefault();
        const id = airtagId.trim().toUpperCase();

        if (id && airtagDetails[id]) {
            setItemDetails(airtagDetails[id]);
        } else {
            alert(`Airtag ID ${id} not found in the database.`);
            setItemDetails(null);
        }

        setAirtagId('');
    };

    const handleListItemClick = (id) => {
        setAirtagId(id);
    };

    return (
        <div className="flex items-center justify-center h-screen bg-purple-50">
            <div className="p-8 bg-white rounded-lg shadow-lg">
                <h1 className="mb-6 text-2xl font-bold text-purple-800">Airtag Finder</h1>
                <form onSubmit={handleFind} className="flex flex-col">
                    <input
                        type="text"
                        id="airtag-id"
                        placeholder="Enter Airtag ID"
                        value={airtagId}
                        onChange={(e) => setAirtagId(e.target.value)}
                        className="p-2 mb-4 text-black border border-purple-500 rounded"
                        required
                    />
                    <button
                        type="submit"
                        className="p-2 text-black transition bg-purple-700 rounded hover:bg-purple-800"
                    >
                        Find
                    </button>
                </form>

                {itemDetails && (
                    <div className="mt-6 text-black">
                        <h2 className="mb-2 text-xl font-bold">Item Details</h2>
                        <p><strong>Airtag ID:</strong> {airtagId}</p>
                        <p><strong>Owner:</strong> {itemDetails.owner}</p>
                        <p><strong>Item:</strong> {itemDetails.item}</p>
                        <p><strong>Course:</strong> {itemDetails.course}</p>
                        <button
                            onClick={() => window.open(itemDetails.mapLink, '_blank')}
                            className="p-2 mt-4 text-black transition bg-purple-700 rounded hover:bg-purple-800"
                        >
                            Open Map Location
                        </button>
                    </div>
                )}

                <div className="mt-8">
                    <h2 className="mb-2 text-xl font-bold text-black">Your Registered Airtags</h2>
                    <ul className="p-0 list-none">
                        {userAirtags.map((airtag) => (
                            <li
                                key={airtag.id}
                                className="p-2 mb-2 text-black transition border border-purple-500 rounded cursor-pointer bg-purple-50 hover:bg-purple-100"
                                onClick={() => handleListItemClick(airtag.id)}
                            >
                                ID: {airtag.id}, Item: {airtag.item}, Owner: {airtag.owner}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default AirTag;
