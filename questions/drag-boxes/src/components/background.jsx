/* eslint-disable react/prop-types */

const Background = ({position}) => {
  return (
    <div 
    className="background"
      style={{
        position: 'absolute',
        transform: `translateX(${position.x}px, ${position.y}px)`,
      }}
    />
  )
}

export default Background