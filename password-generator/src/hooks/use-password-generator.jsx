import { useState } from "react";

const usePasswordGenerator = () => {
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")

    const generatePassword = (checkboxData, length) => {
        let charSet = "";
        let generatedPassword = "";

        // filter out only selected checkboxes
        const selectedOption = checkboxData.filter( checkbox => checkbox.state);

        // handle error
        if(selectedOption.length === 0) {
            setError("Select atleast one option")
            setPassword("")
            return;
        }

        selectedOption.forEach(option => {
            switch(option.title) {
                case "Include Uppercase letters":
                    charSet += "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
                    break;

                case "Include Lowercase letters":
                    charSet += "abcdefghijklmnopqrstuvwxyz";
                    break;
                case "Include Numbers":
                    charSet += "0123456789";
                    break;
                case "Include Symbols":
                    charSet += "!@#$%^&*()";
                    break;
                default:
                    break;
            }
        });

        // generate random password
        for (let i=0; i< length; i++){
            const randomIndex = Math.floor(Math.random() * charSet.length);

            generatedPassword += charSet[randomIndex]; 
        }

        setPassword(generatedPassword);
        setError("");
      
    }

    return {password, error, generatePassword};

}

export default usePasswordGenerator;