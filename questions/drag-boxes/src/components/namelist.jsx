import { useState } from "react";

let nextId = 0;

const initialArtists = [
    { id: 1, name: "John" },
    { id: 2, name: "David" },
    { id: 3, name: "Sayen" },
];

export default function Namelist() {


  const [name, setName] = useState("");
  const [artists, setArtists] = useState(initialArtists);

  return (
    <>
      <h1>Add Name Lists</h1>
      <input value={name} onChange={(e) => setName(e.target.value)} />

      <button
        style={{marginLeft: "5px"}}
        onClick={() => {
            // insert at last position
            //   setArtists([...artists, { id: nextId++, name }]);

            // insert at first position
        //   setArtists([ { id: nextId++, name }, ...artists,]);

            // insert at any given position
            const insertAt = 1;
            const nextArtists = [
                // Items before the insertion point:
                ...artists.slice(0, insertAt), 
                 // New item:
                { id: nextId++, name},
                 // Items after the insertion point:
                ...artists.slice(insertAt),
            ] 
            setArtists(nextArtists);
          setName('');
        }}
      >
        Add
      </button>

      <ul>
        {artists.map((artist, index) => (
          <li key={index}>{artist.name}</li>
        ))}
      </ul>
    </>
  );
}
