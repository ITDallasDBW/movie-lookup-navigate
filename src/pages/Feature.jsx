import React from "react";
import { Link, useNavigate } from "react-router-dom";
import ShowFeature from "../ShowFeature";

const Feature = () => {
  let navigate=useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  }

  return (
    <div>
      <h1>Feature.jsx</h1>
      <Link to={"/"}>Home</Link>
      <button onClick={handleGoBack}>Go Back</button>
      <ShowFeature />
    </div>
  );
};

export default Feature;
