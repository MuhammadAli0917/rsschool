import React from 'react';

interface Pokemon {
    name: string;
    url: string;
}

interface ResultsProps {
    items: Pokemon[];
}

const Results: React.FC<ResultsProps> = ({ items }) => (
    <div className="results">
        <ul>
            {items.map((item, index) => (
                <lire key={index}>
                    <h3>{item.name}</h3>
                    <p>{item.url}</p>
                </lire>
            ))}
        </ul>
    </div>
);

export default Results;
