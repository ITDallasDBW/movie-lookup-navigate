import React, { useState } from "react";

const InputFn = ({onSubmit}) => {

const [inputValue, setInputValue] = useState("")

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = () => {
        onSubmit(inputValue);
        setInputValue("")
  };

  return (
    <>
    <h3>InputFn</h3>
      <input
        type="text"
        id="idBox"
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={(event) => event.key === "Enter" && handleSubmit()}
      />
      <button id="idBtn" onClick={handleSubmit}>
        Submit
      </button>
    </>
  );
};

export default InputFn;