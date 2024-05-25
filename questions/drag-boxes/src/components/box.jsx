/* eslint-disable react/prop-types */

import { useState } from "react"


const Box = ({children,color,position, onMove}) => {

    const [lastPosition, setLastPosition] = useState(null);

    function handlePointerDown(e) {
        e.target.setPointerCapture(e.pointerId);
        setLastPosition({
            x: e.clientX,
            y: e.clientY
        })
    }
    function handlePointerMove(e) { 
        if (lastPosition) {
            setLastPosition({
              x: e.clientX,
              y: e.clientY,
            });
            const dx = e.clientX - lastPosition.x;
            const dy = e.clientY - lastPosition.y;
    
            onMove(dx,dy);
        }
    }
    function handlePointerUp() { 
        setLastPosition(null);
     }

  return (
    <div
        className="box"
        style={{
            backgroundColor: color,
            transform: `translate(
                ${position.x}px,
                ${position.y}px
            )`
        }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
    >
        {children}
    </div>
  )
}

export default Box