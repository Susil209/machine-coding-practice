import { useState } from "react"
import Background from "./components/background"
import Box from "./components/box"
import Namelist from "./components/namelist"
import Filternames from "./components/filternames"
import TaskApp from "./components/taskapp"



const initialPosition = {
  x: 0, y: 0,
}

function App() {

  const [shape,setShape] = useState({
    color: 'orange',
    position: initialPosition,
  })


  const handleMove = function(dx,dy) {
    setShape({
      ...shape,
      position: {
        x: shape.position.x += dx,
        y: shape.position.y += dy,
      }
    })
  }

  function handleColorChange(e) {
    setShape({
      ...shape,
      color: e.target.value,
    })
  }


  return (
    <>
      {/* <select
        value={shape.color}
        onChange={handleColorChange}
      >
        <option value='orange'>orange</option>
        <option value='blue'>blue</option>
        <option value='pink'>pink</option>
      </select>

      <Background position={initialPosition} />
      <Box
        color={shape.color}
        position={shape.position}
        onMove={handleMove}
      >
        Drag me!
      </Box> */}

      <Namelist />

      <Filternames />

      <TaskApp />

      
    </>
  )
}

export default App
