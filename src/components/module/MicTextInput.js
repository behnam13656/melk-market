// components/MicTextInput.jsx
"use client";
import React, { useRef, useState } from "react";

const MicTextInput = ({ title, name, profileData, setProfileData, placeholder }) => {
  const [listening, setListening] = useState(false);
  const recognitionRef = useRef(null);

  const startListening = () => {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) {
      alert("مرورگر شما از Speech Recognition پشتیبانی نمی‌کند!");
      return;
    }

    if (!recognitionRef.current) {
      const recognition = new SR();
      recognition.lang = "fa-IR";
      recognition.continuous = false;
      recognition.interimResults = true;

      recognition.onstart = () => setListening(true);
      recognition.onend = () => setListening(false);
      recognition.onresult = (e) => {
        let transcript = "";
        for (let i = e.resultIndex; i < e.results.length; i++) {
          transcript += e.results[i][0].transcript;
        }
        setProfileData((prev) => ({
          ...prev,
          [name]: (prev[name] + " " + transcript).trim(),
        }));
      };

      recognitionRef.current = recognition;
    }

    try {
      recognitionRef.current.start();
    } catch (err) {
      console.log("Recognition already started", err);
    }
  };

  return (
    <div style={{ marginBottom: "16px" }}>
      <label style={{ display: "block", marginBottom: "4px", fontWeight: 600 }}>
        {title}
      </label>
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <textarea
          name={name}
          value={profileData[name]}
          onChange={(e) =>
            setProfileData((prev) => ({ ...prev, [name]: e.target.value }))
          }
          placeholder={placeholder || title}
          rows={5}
          style={{
            flex: 1,
            padding: "10px",
            borderRadius: "8px",
            fontSize: "15px",
            resize: "vertical",
          }}
        />
        <button
          type="button"
          onClick={startListening}
          style={{
            width: "38px",
            height: "38px",
            borderRadius: "50%",
            backgroundColor: listening ? "#ef4444" : "#2563eb",
            color: "white",
            border: "none",
            cursor: "pointer",
            fontSize: "20px",
          }}
        >
          {listening ? "⏺️" : "🎤"}
        </button>
      </div>
    </div>
  );
};

export default MicTextInput;
