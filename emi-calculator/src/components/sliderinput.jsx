/* eslint-disable react/prop-types */
import { numberWithCommas } from "../utils/config"


const SliderInput = ({title, state, min, max, labelMin, labelMax,  onChange, underlyingTitle}) => {
  return (
    <>
    <span className="title">{title}</span>
      {state > 0 && <span className="title" style={{ textDecoration: "underline" }}>
        {underlyingTitle}
      </span>}
      <div>
        <input
          className="slider"
          type="range"
          min={min}
          max={max}
          value={state}
          onChange={onChange}
        />
        <div className="labels">
          <label>{labelMin ?? numberWithCommas(min)}</label>
          <b>{numberWithCommas(state)}</b>
          <label>{labelMax ?? numberWithCommas(max)}</label>
        </div>
      </div>
    </>
  )
}

export default SliderInput