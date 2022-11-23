import React, { useState } from "react";
import "./style/App.css";
import axios from "axios";

export const App = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [image, setImage] = useState(null);
  const [imageAnalysis, setImageAnalysis] = useState(null);
  const [imageAnalysisConfidence, setImageAnalysisConfidence] = useState(null);

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
        setImageAnalysisConfidence(
          //response.data[0].confidence
          Math.round(response.data[0].confidence * 100)
        );
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
          {selectedFile ? (
            <img className="image" src={image} />
          ) : (
            <div className="image-placeholder">Select an image</div>
          )}
          {imageAnalysis ? (
            <div className="predictions">
              <div className="aircraft-name-prediction-placeholder">
                <div
                  className="aircraft-name"
                  style={{ display: "flex", fontWeight: 500, padding: "0.5vh" }}
                >
                  Drone Model:{" "}
                </div>
                <div className="analysis">{imageAnalysis}</div>
              </div>
              <div className="aircraft-confidence-prediction-placeholder">
                <div
                  className="aircraft-confidence"
                  style={{ display: "flex", fontWeight: 500, padding: "1vh" }}
                >
                  Confidence:{" "}
                </div>
                <div
                  className="analysis"
                  style={{
                    display: "flex",
                    fontWeight: 100,
                    alignContent: "center",
                    flexWrap: "nowrap",
                  }}
                >
                  {imageAnalysisConfidence + "%"}
                </div>
              </div>
            </div>
          ) : (
            <div className="predictions">
              <div className="aircraft-name-prediction-placeholder">
                <div
                  className="aircraft-name"
                  style={{
                    display: "flex",
                    fontWeight: 500,
                    fontsize: "100%",
                    flexWrap: "nowrap",
                    padding: "0.5vh",
                  }}
                >
                  {"Drone Model: "}
                </div>
                <div
                  className="analysis"
                  style={{
                    display: "flex",
                    fontWeight: 100,
                    alignContent: "center",
                  }}
                >
                  waiting for upload ...
                </div>
              </div>
              <div className="aircraft-confidence-prediction-placeholder">
                <div
                  className="aircraft-confidence"
                  style={{ display: "flex", fontWeight: 500, padding: "1vh" }}
                >
                  {"Confidence: "}
                </div>
                <div
                  className="analysis"
                  style={{
                    display: "flex",
                    fontWeight: 100,
                    alignContent: "center",
                    flexWrap: "nowrap",
                  }}
                >
                  waiting for upload ...
                </div>
              </div>
            </div>
          )}
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
