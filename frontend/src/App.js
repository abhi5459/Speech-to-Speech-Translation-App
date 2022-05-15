import ReactAudioPlayer from 'react-audio-player';
import logo from './logo.svg';
import './App.css';
import Dropzone from 'react-dropzone';
import React, { useEffect, useState } from 'react';
import { FaCloudUploadAlt } from 'react-icons/fa'
import { AppBar, Toolbar, Typography, makeStyles } from "@material-ui/core";
import 'js-file-download';
import {BsDownload} from 'react-icons/bs'

const useStyles = makeStyles(() => ({
  header: {
    backgroundColor: "#400CCC",
  },
  logo: {
    fontFamily: "Work Sans, sans-serif",
    fontWeight: 800,
    color: "#FFFEFE",
    textAlign: "left",
  },
}));

function App() {
  const [getMessage, setGetMessage] = useState({})
  const [selectedFile, setSelectedFile] = useState(null);
  const [isFilePicked, setIsFilePicked] = useState(false);
  const [fileSubmitted, setFileSubmitted] = useState(false);
  const [fileReturned, setFileReturned] = useState(false);
  const [returnedOriginalText, setReturnedOriginalText] = useState();
  const [returnedNewText, setReturnedNewText] = useState();
  const [returnedNewAudio, setReturnedNewAudio] = useState(null);
  const [val, setVal] = useState(0);

  var fileDownload = require('js-file-download');
  const { header, logo } = useStyles();

  const displayDesktop = () => {
    return <Toolbar>{femmecubatorLogo}</Toolbar>;
  };

  const femmecubatorLogo = (
    <Typography variant="h6" component="h1" className={logo}>
      Speech to Speech Translation App 
      
    </Typography>
  );

  const headers = {
    "content-type": "multipart/form-data",
  };

  const focusedStyle = {
    borderColor: '#2196f3'
  };

  const downloadoriginal = () => {
    fileDownload(returnedOriginalText, 'OriginalText.txt');
  };

  const downloadtranslated = () => {
    fileDownload(returnedNewText, 'Translated_Text.txt');
  };

  const style = {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    borderWidth: 2,
    borderRadius: 2,
    borderColor: '#eeeeee',
    borderStyle: 'dashed',
    backgroundColor: '#fafafa',
    color: '#bdbdbd',
    outline: 'none',
    transition: 'border .24s ease-in-out'

  };
  const fileDrop = (files) => {
    setVal(1);
    console.log(files)
    const formData = new FormData();

    const file = files[0];
    formData.append("file", file);

    fetch("http://localhost:5000/flask/hello", {
      method: "POST",
      body: formData,
    }).then((res) => res.json())
      .then((json) => {
        console.log(json)
        var reader = new FileReader();
        reader.readAsDataURL(files[0]);
        reader.onload = function () {
          console.log("reader for sel file result is", reader.result);
          setSelectedFile(reader.result);
        };
        reader.onerror = function (error) {
          console.log('Error: ', error);
        };
        setReturnedNewAudio("data:audio/wav;base64,".concat(json.output))
        setReturnedOriginalText(json.original_text)
        setReturnedNewText(json.new_text)
        setFileReturned(true)
        setVal(0);
      })
  };

  return (
    <div class="full">
      <header>
        <AppBar className={header}>{displayDesktop()}</AppBar>
      </header>
      {/* <div>
      </div> */}
      <div class="App">
        <br></br>
        <div>
      {/* <img src="../public/logo512.png" /> */}
          <Dropzone
            onDrop={fileDrop}
            accept="audio/wav"
            minSize={0}
            maxSize={450000000}
          >
            {({ getRootProps, getInputProps, isDragActive, isDragReject, rejectedFiles }) => {
              const isFileTooLarge = rejectedFiles.length > 0 && rejectedFiles[0].size > 450000000;
              return (
                <div {...getRootProps({ style })}>
                  <input {...getInputProps()} />
                  {!isDragActive && <div><p>Click here or drop a file to upload!</p>
                    {/* <br></br> */}
                    <FaCloudUploadAlt size={40} />
                  </div>
                  }
                  {isDragActive && !isDragReject && "Drop it here"}
                  {isDragReject && "File type not accepted, sorry!"}
                  {isFileTooLarge && (
                    <div className="text-danger mt-2">
                      File is too large.
                    </div>
                  )}
                </div>
              )
            }
            }
          </Dropzone>
          {val == 1 ? <p>Audio File is Uploaded, waiting for the response......</p> : null}
        </div>
        <br></br>
        <div class="grid-container">
          <div class="original">
            <h2>Original Text {fileReturned ? <button class="btn" onClick={downloadoriginal}><BsDownload/></button> : null}</h2>
            <div>{fileReturned ? <div>
              <p>{returnedOriginalText}</p>
              <audio controls src={selectedFile} type="audio/mpeg" />
            </div> : null}</div>

          </div>
          <div class="translated">
            <h2>Translated Text {fileReturned ? <button class="btn" onClick={downloadtranslated}><BsDownload/></button> : null}</h2>
            <div>{fileReturned ? <div>
              <p>{returnedNewText}</p>
              <audio controls src={returnedNewAudio} type="audio/mpeg" />

            </div> : null}</div>
          </div>
        </div>
      </div>
      <br></br>
      <div class="footer">
        Developed by
        <a href='https://ltrc.iiit.ac.in/'> Language
          Technologies
          Research Center (LTRC)
        </a>
      </div>

    </div>
  );
}

export default App;
