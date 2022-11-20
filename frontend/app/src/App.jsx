import React, { useState } from "react";
import "./style/App.css";
import axios from "axios";

export const App = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [image, setImage] = useState(null);
  const [imageAnalysis, setImageAnalysis] = useState(null);

  const fileSelectedHandler = (event) => {
    console.log(event.target.files[0]);
    setSelectedFile(event.target.files[0]);
    setImage(URL.createObjectURL(event.target.files[0]));
    console.log(selectedFile);
  };

  const fileUploadHandler = async (event) => {
    event.preventDefault();
    const fd = new FormData();
    fd.append("file", selectedFile);

    try {
      const response = await axios({
        method: "post",
        url: "http://0.0.0.0:8888/analyse",
        data: fd,
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
        onUploadProgress: (progressEvent) => {
          console.log(
            "Upload Progress: " +
              Math.round((progressEvent.loaded / progressEvent.total) * 100) +
              "%"
          );
        },
      }).then((response) => {
        setImageAnalysis(response.data[0].name);
        console.log("Results");
        console.log(response.data[0].name);
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <section className="App">
      <div className="container">
        <div className="title-holder">
          <div className="title">what's-my-aircraft</div>
        </div>
        <div className="results">
          <img className="image" src={image} />
          <div className="analysis">{imageAnalysis}</div>
        </div>
        <div className="uploader">
          <input type="file" onChange={fileSelectedHandler} />
          <button onClick={fileUploadHandler}>Upload</button>
        </div>
      </div>
    </section>
  );
};

export default App;
