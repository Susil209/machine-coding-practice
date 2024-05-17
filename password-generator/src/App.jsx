import { useState } from "react";
import usePasswordGenerator from "./hooks/use-password-generator";
import PasswordStrengthIndicator from "./components/strength";
import Button from "./components/button";
import Checkbox from "./components/checkbox";

function App() {
  const initialData = [
    { id: "1", title: "Include Uppercase letters", state: false },
    { id: "2", title: "Include Lowercase letters", state: false },
    { id: "3", title: "Include Numbers", state: false },
    { id: "4", title: "Include Symbols", state: false },
  ];

  const [length, setLength] = useState(4);
  const [checkboxData, setCheckboxData] = useState(initialData);
  const [copy, setCopy] = useState(false);

  const handleCheckbox = (idx) => {
    const updatedCheckbox = [...checkboxData];

    // toggle state value
    updatedCheckbox[idx].state = !updatedCheckbox[idx].state;

    setCheckboxData(updatedCheckbox);
    setCopy(false);
  };

  const handleLength = (e) => {
    setLength(e.target.value);
    setCopy(false);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(password);
    setCopy(true);
  };

  const { password, error, generatePassword } = usePasswordGenerator();

  return (
    <div className="container">
      <div className="head__title">Password Generator</div>
      {password && (
        <div className="header">
          <div className="title">{password}</div>
          <Button
            onClick={handleCopy}
            text={copy ? "copied✅" : "copy"}
            customClass={"copyBtn"}
          />
        </div>
      )}

      <div className="charlength">
        <span>
          <label>Character Length</label>
          <label>{length}</label>
        </span>

        <input
          type="range"
          min={4}
          max={20}
          value={length}
          onChange={(e) => handleLength(e)}
        />
      </div>

      {/* Checkbox */}
      <div className="checkboxes">
        {checkboxData.map((checkbox) => (
          <Checkbox
            key={checkbox.id}
            title={checkbox.title}
            state={checkbox.state}
            onChange={() => handleCheckbox(checkbox.id - 1)}
          />
        ))}
      </div>
      {/* strength */}
      <PasswordStrengthIndicator password={password} />

      {/* Error message */}
      {error && <div className="errorMsg">{error}</div>}

      {/* Generate Password */}
      <Button
        onClick={() => {
          generatePassword(checkboxData, length);
          setCopy(false);
        }}
        text={"Generate Password"}
        customClass={"generateBtn"}
      />
    </div>
  );
}

export default App;
