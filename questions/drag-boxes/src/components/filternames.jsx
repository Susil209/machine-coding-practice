import { useState } from "react";

const initialArtists = [
  { id: 1, name: "John" },
  { id: 2, name: "David" },
  { id: 3, name: "Sayen" },
];

export default function Filternames() {
  const [artists, setArtists] = useState(initialArtists);

  return (
    <>
      <h1>Filter Names</h1>
      <ul>
        {artists.map((artist) => (
          <li key={artist.id} style={{padding: '10px'}}>
            {artist.name}
            <button style={{marginLeft: '5px'}}
                onClick={() => {
                    setArtists(
                        artists.filter(a => a.id !== artist.id)
                    );
                }}
            >Delete</button>
          </li>
        ))}
      </ul>
    </>
  );
}
