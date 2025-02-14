import React, { useState, useRef } from "react";
import { QRCodeCanvas } from "qrcode.react";
import "./App.css";

const App = () => {
  const [url, setUrl] = useState("");
  const qrRef = useRef(null);

  // Function to validate and format the URL
  const formatUrl = (input) => {
    if (!input) return "";
    if (!input.startsWith("http://") && !input.startsWith("https://")) {
      return `https://${input}`;
    }
    return input;
  };

  // Function to download the QR code
  const downloadQRCode = () => {
    const canvas = qrRef.current.querySelector("canvas");
    const url = canvas.toDataURL("image/png");

    const a = document.createElement("a");
    a.href = url;
    a.download = "qr-code.png";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="app-container">
      <h1>QR Code Generator</h1>
      <input
        type="text"
        placeholder="Enter website URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />
      <div ref={qrRef} className="qr-container">
        {url && <QRCodeCanvas value={formatUrl(url)} size={200} />}
      </div>
      {url && <button onClick={downloadQRCode}>Download QR Code</button>}
    </div>
  );
};

export default App;
