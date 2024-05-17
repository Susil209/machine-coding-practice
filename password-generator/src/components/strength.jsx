/* eslint-disable react/prop-types */
const PasswordStrengthIndicator = ({ password = "" }) => {

    let colorStrength;

  const getPasswordStrength = () => {
    const passwordLength = password.length;
   
    if (passwordLength < 1) {
      return "";
    } else if (passwordLength < 4) {
      return "Very Weak";
    } else if (passwordLength < 8) {
        colorStrength = "red";
      return "Poor";
    } else if (passwordLength < 12) {
        colorStrength = "orange";
      return "Medium";
    } else if (passwordLength < 16) {
        colorStrength = "springgreen";
      return "Strong";
    } else {
        colorStrength = "green";
      return "Very Strong";
    }
  };

  const passwordStrength = getPasswordStrength();


  if (!passwordStrength) return <></>;


  return (
    <div className="password-strength">
      Strength: <span style={
        { fontWeight: "bold", color: colorStrength }}>{passwordStrength}</span>
    </div>
  );
};

export default PasswordStrengthIndicator;
