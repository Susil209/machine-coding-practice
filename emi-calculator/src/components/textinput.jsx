/* eslint-disable react/prop-types */

const TextInput = ({title, state, setState, isTotalCost}) => {
  return (
    <>
        <span className="title">{title}</span>
      <input
        type="number"
        value={state > 100 && !isTotalCost ? 100 : state}
        onChange={(e) => setState(e.target.value)}
        placeholder={title}
      />
    </>
  )
}

export default TextInput