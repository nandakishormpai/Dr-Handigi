import React, { useState } from "react";
import "./App.css";
import { Form, Button, Row, Col, Image } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";

// const api_link = "https://shiportruck.herokuapp.com/";
const api_link = "https://handigi.herokuapp.com/";

function App() {
  const [baseImage, setBaseImage] = useState("");
  const [imgData, setImgData] = useState("");
  const [result, setResult] = useState("");
  const [isImageJustUploaded, setIsImageJustUploaded] = useState(true);

  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const uploadImage = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertBase64(file);
    setBaseImage(base64);
    const baseString = base64.split("base64,")[1];
    setImgData(baseString);
  };

  const identify = async () => {
    console.log(imgData);
    await axios
      .post(api_link, {
        file: imgData,
      })
      .then((res) => {
        console.log("result ==   " + res.data.value);
        console.log(JSON.stringify(res.data));
        setResult(res.data.value);
        setIsImageJustUploaded(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const copyTextToClipboard = (entryText) => {
    navigator.clipboard.writeText(entryText);
  };

  return (
    <div className="App">
      <h1 className="main-heading font-link">Dr.HanDiGi</h1>
      <br />
      <Form className="inputfile">
        <Form.Group controlId="formFile" className="mb-3 form-input-group">
          <Form.Label className="form-input-label">Input an image file : </Form.Label>
          <Form.Control
            type="file"
            onChange={(e) => {
              setBaseImage("");
              setIsImageJustUploaded(true);
              console.log();
              if (e.target.value !== "") {
                uploadImage(e);
              }

              setResult("");
            }}
          />
        </Form.Group>
      </Form>
      <br></br>
      <Row className={isImageJustUploaded ? "d-none " : " "}>
        <Col>
          <div>
            <Image src={baseImage} className={baseImage ? "d-inline-block" : "d-none"} width={300} height={300}></Image>
          </div>
        </Col>
        <Col>
          <Form.Group className="form-group-slot" id="text-content">
            <Form.Label className="form-label-slot">Recognized text</Form.Label>
            <Form.Control
              required
              placeholder="Here translated"
              as="textarea"
              rows={12}
              disabled
              value={result}
              // value={"Nicardia R 20 td\nLastix 40 bs\nRantac 150 bs\nEureset Ave tid\nAulin 100"}
              onChange={(e) => {}}
            />
          </Form.Group>
          <Button
            onClick={() => {
              console.log(result);
              // TODO Copy to clipboard....
              copyTextToClipboard(result);
            }}
          >
            Copy to clipboard
          </Button>
        </Col>
      </Row>

      <Row className={isImageJustUploaded ? " " : "d-none "}>
        <div>
          <img src={baseImage} className={baseImage ? "d-inline-block" : "d-none"} height="200px" alt="uploaded" />
        </div>
      </Row>

      {/* 


 */}

      {/* <h2 id="result-heading" className={result ? "d-block" : "d-none"}>
        It's a <span>{result.toUpperCase()}</span>
      </h2> */}
      <Button
        variant="primary"
        id="button-upload"
        className={isImageJustUploaded ? " " : "d-none "}
        onClick={() => {
          if (baseImage === "") {
            alert("No image uploaded");
          } else {
            setResult("");
            setIsImageJustUploaded(false);
            identify();
            setIsImageJustUploaded(false);
          }
        }}
      >
        <span className={"button-text " + (isImageJustUploaded ? " " : "d-none ")}>Convert to Text</span>
      </Button>

      {/* <Button
        onClick={() => {
          console.log(result);
        }}
      >
        debug
      </Button> */}
    </div>
  );
}

export default App;
