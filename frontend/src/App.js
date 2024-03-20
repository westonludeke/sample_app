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

  render() {
    const { screenCapture, ipAddress, browserInfo, name } = this.state;

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
            </center>
          </div>
        )}
      </ScreenCapture>
    );
  }
}

export default App;
