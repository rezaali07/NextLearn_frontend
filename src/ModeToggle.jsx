import React, { useState, useEffect } from "react";

const ModeToggle = () => {
  const [mode, setMode] = useState(() => {
    // Load initial mode from localStorage or default
    return localStorage.getItem("themeMode") || "default";
  });

  const [showOptions, setShowOptions] = useState(false);

  useEffect(() => {
    // Remove all modes first
    document.body.classList.remove("visual-aid", "dark-mode");

    // Add selected mode class
    if (mode === "visual-aid") {
      document.body.classList.add("visual-aid");
    } else if (mode === "dark") {
      document.body.classList.add("dark-mode");
    }

    // Save mode in localStorage
    localStorage.setItem("themeMode", mode);
  }, [mode]);

  const toggleOptions = () => {
    setShowOptions(!showOptions);
  };

  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <div
        onClick={toggleOptions}
        style={{
          cursor: "pointer",
          fontSize: "24px",
          marginRight: "10px",
        }}
      >
        👁️
      </div>
      {showOptions && (
        <select
          value={mode}
          onChange={(e) => setMode(e.target.value)}
          style={{ padding: "5px" }}
        >
          <option value="default">Default</option>
          <option value="visual-aid">Visual Aid</option>
          <option value="dark">Dark Mode</option>
        </select>
      )}
    </div>
  );
};

export default ModeToggle;