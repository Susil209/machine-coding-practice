/* eslint-disable react/prop-types */

import { useState } from "react";

const Folder = ({
  handleInsertNode,
  handleDeleteNode,
  handleUpdateNode,
  data,
}) => {
  console.log(data);

  const [expand, setExpand] = useState(false);
  const [inputState, setInputState] = useState({
    visible: false,
    isFolder: false,
  });

  const handleInput = (e, isFolder) => {
    e.stopPropagation();
    setExpand(true);
    setInputState({
      visible: true,
      isFolder,
    });
  };

  const handleAddFolder = (e) => {
    // when enter key is pressed
    if (e.key === "Enter" || e.keyCode === 13) {
      // adding new folder logic
      handleInsertNode(data.id, e.target.value, inputState.isFolder);
      setInputState({ ...inputState, visible: false });
    }
  };

  const handleUpdate = (isFolder) => {
    console.log(data.name)
    setInputState({ visible: true, isFolder });
  };

  const handleDelete = () => {
    // console.log(data.id);
    handleDeleteNode(data.id);
  };



  if (data.isFolder) {
    return (
      <div>
        <div className="folder" onClick={() => setExpand(!expand)}>
          <span>
            {expand ? "📂" : "📁"} {data.name}
          </span>
          <div>
            <button onClick={(e) => handleInput(e, true)}>Folder +</button>
            <button onClick={(e) => handleInput(e, false)}>File +</button>
            <button onClick={() => handleUpdate(true)}>Update</button>
            <button onClick={() => handleDelete()}>Delete</button>
          </div>
        </div>

        <div
          style={{ display: expand ? "block" : "none", paddingLeft: "25px" }}
        >
          {inputState.visible && (
            <>
              <div className="inputContainer">
                <span>{inputState.isFolder ? "📁" : "📄"}</span>
                <input
                  className="inputContainer__input"
                  type="text"
                  onKeyDown={(e) => handleAddFolder(e)}
                  onBlur={() =>
                    setInputState({ ...inputState, visible: false })
                  }
                  autoFocus
                />
              </div>
            </>
          )}

          {data.items.map((exp) => (
            <Folder
              handleInsertNode={handleInsertNode}
              handleDeleteNode={handleDeleteNode}
              handleUpdateNode={handleUpdateNode}
              data={exp}
              key={exp.id}
            /> // bingo
          ))}
        </div>
      </div>
    );
  } else {
    return (
      <div className="fileContainer">
        <span className="file">📄 {data.name}</span>
        <div>
          <button onClick={() => handleUpdate()}>Update</button>
          <button onClick={() => handleDelete()}>Delete</button>
        </div>
      </div>
    );
  }
};

export default Folder;
