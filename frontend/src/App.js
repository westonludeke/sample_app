import React, { Component } from "react";
import { ScreenCapture } from 'react-screen-capture';
import UAParser from "ua-parser-js";
import './App.css';

class App extends Component {
  state = {
    screenCapture: '',
    ipAddress: '',
    browserInfo: {},
    name: '',
    clientScreenCapture: null,
  };

  componentDidMount() {
    // fetch user's IP Address
    fetch("https://api.ipify.org?format=json")
      .then((response) => response.json())
      .then((data) => {
        console.log("IP Address log:", data.ip);
        this.setState({ ipAddress: data.ip });
      })
      .catch((error) => {
        console.error("Error fetching IP address:", error);
      });

    // get user's browser info using UAParser
    const parser = new UAParser();
    const result = parser.getResult();
    console.log(result);
    this.setState({ browserInfo: result });
  }

  handleScreenCapture = screenCapture => {
    this.setState({ screenCapture });
  };

  handleSave = () => {
    const screenCaptureSource = this.state.screenCapture;
    const downloadLink = document.createElement('a');
    const fileName = 'react-screen-capture.png';

    downloadLink.href = screenCaptureSource;
    downloadLink.download = fileName;
    downloadLink.click();
  };

  handleInputChange = (event) => {
    this.setState({ name: event.target.value });
  };

  handleClientScreenCapture = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getDisplayMedia({ video: true });
      const videoTrack = mediaStream.getVideoTracks()[0];
      const imageCapture = new ImageCapture(videoTrack);
      const bitmap = await imageCapture.grabFrame();
      videoTrack.stop(); // Stop the video track to release the camera

      // Convert the bitmap to a data URL
      const canvas = document.createElement('canvas');
      canvas.width = bitmap.width;
      canvas.height = bitmap.height;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(bitmap, 0, 0);
      const dataUrl = canvas.toDataURL('image/png');

      this.setState({ clientScreenCapture: dataUrl });
    } catch (error) {
      console.error('Error capturing the screen:', error);
    }
  };

  render() {
    const { screenCapture, ipAddress, browserInfo, name, clientScreenCapture } = this.state;

    return (
      <ScreenCapture onEndCapture={this.handleScreenCapture}>
        {({ onStartCapture }) => (
          <div>
            <h2>Hello World!</h2>
            <p>Testing 123</p>
            <form id="testForm">
              <label htmlFor="nameInput">Enter your name:</label>
              <input 
                type="text"
                id="nameInput"
                name="name"
                value={name}
                onChange={this.handleInputChange}
              />
            </form>
            
            <button onClick={onStartCapture}>screenshot</button>
            <button onClick={this.handleClientScreenCapture}>Screen Capture</button> {/* New button for client-side screen capture */}

            {/* Display IP Address and Browser Info */}
            <div>
              <p>IP Address: {ipAddress}</p>
              <p>Browser Name: {browserInfo.browser?.name}</p>
              <p>Browser Version: {browserInfo.browser?.version}</p>
              <p>Operating System: {browserInfo.os?.name}</p>
              <p>OS Version: {browserInfo.os?.version}</p>
            </div>

            <center>
              {screenCapture && (
                <div>
                  <h3>Screenshot Preview:</h3>
                  <img src={screenCapture} alt='react-screen-capture' />
                  <button onClick={this.handleSave}>download screenshot</button>
                </div>
              )}
              {clientScreenCapture && (
                <div>
                  <h3>Client Screen Capture Preview:</h3>
                  <img src={clientScreenCapture} alt='Client Screen Capture' />
                  {/* You can add a download button here if needed */}
                </div>
              )}
            </center>
          </div>
        )}
      </ScreenCapture>
    );
  }
}

export default App;
