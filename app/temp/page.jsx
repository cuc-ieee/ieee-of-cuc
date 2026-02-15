"use client";
import { useEffect, useState } from "react";

export default function UploadPage() {
  const [scriptLoaded, setScriptLoaded] = useState(false);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://upload-widget.cloudinary.com/latest/global/all.js";
    script.async = true;
    script.onload = () => {
      console.log("Cloudinary script loaded successfully");
      setScriptLoaded(true);
    };
    script.onerror = () => {
      console.error("Failed to load Cloudinary script");
      alert("Failed to load upload widget");
    };
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const openWidget = () => {
    console.log("Button clicked");
    console.log("Window.cloudinary exists:", !!window.cloudinary);

    if (!window.cloudinary) {
      alert("Cloudinary widget not loaded yet. Please wait and try again.");
      return;
    }

    try {
      const widget = window.cloudinary.createUploadWidget(
        {
          cloudName: "dtlt5iw3v", // your cloud name
          uploadPreset: "ieee_uploads", // CHANGE THIS to your unsigned preset
          multiple: true, // allow multiple images
          folder: "3mrc", // upload to 3mrc folder
          sources: ["local", "url", "camera"],
          maxFiles: 10,
        },
        (error, result) => {
          console.log("Widget callback:", { error, result });
          
          if (error) {
            console.error("Upload Error:", error);
            alert("Upload failed: " + JSON.stringify(error));
          }
          
          if (result?.event === "success") {
            console.log("Uploaded successfully:", result.info);
            console.log("Secure URL:", result.info.secure_url);
            console.log("Public ID:", result.info.public_id);
            alert("Image uploaded successfully! URL: " + result.info.secure_url);
          }
        },
      );

      console.log("Opening widget...");
      widget.open();
    } catch (err) {
      console.error("Error creating widget:", err);
      alert("Error: " + err.message);
    }
  };

  return (
    <div style={{ padding: 40 }}>
      <h1>Upload Images</h1>
      <button
        onClick={openWidget}
        style={{
          padding: "12px 24px",
          background: "#4A8FFF",
          color: "white",
          borderRadius: 8,
          border: "none",
          cursor: "pointer",
        }}
      >
        Upload Photos
      </button>
    </div>
  );
}
