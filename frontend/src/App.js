import './App.css';
import html2canvas from 'html2canvas';
import React from 'react';

function App() {
  const capture = () => {
    // Select the element you want to capture. 
    // This example captures the entire div with className="App"
    const element = document.querySelector('.App');
    html2canvas(element)
      .then((canvas) => {
        // You can then display the canvas as you wish, or convert it to an image URL
        const imgData = canvas.toDataURL('image/png');
        console.log('Capture:', imgData);
        // For example, to display the image in a new window:
        const newWindow = window.open();
        newWindow.document.write('<img src="' + imgData + '" />');
      })
      .catch((error) => {
        console.error('Error capturing image:', error);
      });
  };

  return (
    <div className="App">
      <header className="App-header">
        <button onClick={capture}>Capture</button>
      </header>
    </div>
  );
}

export default App;
