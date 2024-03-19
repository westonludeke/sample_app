import React, { useEffect, useState } from "react";
import html2canvas from "html2canvas";
import UAParser from "ua-parser-js";

const App = () => {
  const [ipAddress, setIpAddress] = useState('');
  const [browserInfo, setBrowserInfo] = useState({});

  useEffect(() => {
    // fetch user's IP Address
    fetch("https://api.ipify.org?format=json")
      .then((response) => response.json())
      .then((data) => {
        console.log("IP Address log:", data.ip);
        setIpAddress(data.ip);
      })
      .catch((error) => {
        console.error("Error fetching IP address:", error);
      });

    // get user's browser info using UAParser
    const parser = new UAParser();
    const result = parser.getResult();
    console.log(result);
    setBrowserInfo(result);
  }, []);

  // take screenshot
  const captureScreen = () => {
    html2canvas(document.body).then((canvas) => {
      canvas.toBlob((blob) => {
        const url = URL.createObjectURL(blob);
        window.open(url, "_blank");
        URL.revokeObjectURL(url);
      }, "image/png");

      const imgData = canvas.toDataURL("image/png");
      console.log("Screenshot:", imgData);
    });
  };

  return (
    <div>
      <h2>Hello World!</h2>
      <p>Testing 123</p>
      <form id="testForm">
        <label htmlFor="nameInput">Enter your name:</label>
        <input type="text" id="nameInput" name="name" />
      </form>

      <ul>
        <li>Test Item 1</li>
        <li>Test Item 2</li>
        <li>Test Item 3</li>
      </ul>

      <button id="captureBtn" onClick={captureScreen}>
        Capture
      </button>

      {/* Display IP Address and Browser Info */}
      <div>
        <p>IP Address: {ipAddress}</p>
        <p>Browser Name: {browserInfo.browser?.name}</p>
        <p>Browser Version: {browserInfo.browser?.version}</p>
        <p>Operating System: {browserInfo.os?.name}</p>
        <p>OS Version: {browserInfo.os?.version}</p>
      </div>
    </div>
  );
};

export default App;
