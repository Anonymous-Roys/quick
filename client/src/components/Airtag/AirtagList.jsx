import React from 'react';

function AirtagList({ airtags, onSelect }) {
    return (
        <div className="registered-airtags">
            <h2>Your Registered Airtags</h2>
            <ul>
                {airtags.map((airtag) => (
                    <li key={airtag.id} onClick={() => onSelect(airtag.id)}>
                        ID: {airtag.id}, Item: {airtag.item}, Owner: {airtag.owner}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default AirtagList;
