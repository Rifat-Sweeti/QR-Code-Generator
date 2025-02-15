import React, { useState, useRef, useEffect } from "react";
import { QRCodeCanvas } from "qrcode.react";
import "./App.css";

const App = () => {
  const [url, setUrl] = useState("");
  const [qrBlob, setQrBlob] = useState(null);
  const qrRef = useRef(null);

  // Function to validate and format the URL
  const formatUrl = (input) => {
    if (!input) return "";
    if (!input.startsWith("http://") && !input.startsWith("https://")) {
      return `https://${input}`;
    }
    return input;
  };

  // Function to generate a Blob from QR code
  useEffect(() => {
    if (url) {
      const canvas = qrRef.current.querySelector("canvas");
      canvas.toBlob((blob) => {
        setQrBlob(blob);
      }, "image/png");
    }
  }, [url]);

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

  // Dragging Functionality for External Apps
  const handleDragStart = (e) => {
    if (qrBlob) {
      const file = new File([qrBlob], "qr-code.png", { type: "image/png" });
      const dataTransfer = e.dataTransfer;
      dataTransfer.effectAllowed = "copy";
      dataTransfer.items.add(file);
    }
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
      <div
        ref={qrRef}
        className="qr-container"
        draggable="true"
        onDragStart={handleDragStart}
      >
        {url && <QRCodeCanvas value={formatUrl(url)} size={200} />}
      </div>
      {url && <button onClick={downloadQRCode}>Download QR Code</button>}
    </div>
  );
};

export default App;
