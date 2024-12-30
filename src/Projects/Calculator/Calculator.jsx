import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDeleteLeft } from '@fortawesome/free-solid-svg-icons';
import './Calculator.css';

function App() {
  const [display, setDisplay] = useState("");
  const [fontSize, setFontSize] = useState(32); // Default font size
  const [isDarkMode, setIsDarkMode] = useState(false); // State for dark mode

  useEffect(() => {
    adjustFontSize(display);
  }, [display]);

  useEffect(() => {
    const handleKeyPress = (event) => {
      const key = event.key;
      const validKeys = "0123456789/*-+.%=";
      if (validKeys.includes(key) || key === "Enter" || key === "Backspace" || key === "Escape") {
        const value = key === "Enter" ? "=" : key;
        handleButtonClick(value);

        // Add active class to the corresponding button
        const button = document.querySelector(`button[data-key="${value}"]`);
        if (button) {
          button.classList.add("button-active");
          setTimeout(() => {
            button.classList.remove("button-active");
          }, 150);
        }
      }
    };

    document.addEventListener("keydown", handleKeyPress);
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [display]);

  const adjustFontSize = (value) => {
    const maxLength = 10;
    const minFontSize = 20;
    const defaultFontSize = 32;
    const scaleFactor = defaultFontSize / maxLength;
    const newFontSize = Math.max(minFontSize, defaultFontSize - (value.length - maxLength) * scaleFactor);
    setFontSize(newFontSize);
  };

  const handleButtonClick = (value) => {
    if (value === "Escape") {
      setDisplay("");
    } else if (value === "Backspace") {
      setDisplay(display.slice(0, -1));
    } else if (value === "=") {
      try {
        setDisplay(eval(display).toString());
      } catch {
        setDisplay("Error");
      }
    } else {
      setDisplay(display + value);
    }
  };

  const toggleMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className={`change ${isDarkMode ? 'dark' : 'light'}`}>
      <button className="mode-toggle" onClick={toggleMode}>
        {isDarkMode ? 'Light Mode' : 'Dark Mode'}
      </button>
      <div className={`calculator ${isDarkMode ? 'dark' : 'light'}`}>
        <input
          type="text"
          id="display"
          value={display}
          readOnly
          style={{ fontSize: `${fontSize}px` }}
        />
        <div className="buttons">
          <button onClick={() => handleButtonClick("Escape")} data-key="Escape">C</button>
          <button onClick={() => handleButtonClick("Backspace")} data-key="Backspace"><FontAwesomeIcon icon={faDeleteLeft} /></button>
          <button onClick={() => handleButtonClick("%")} data-key="%">%</button>
          <button onClick={() => handleButtonClick("/")} data-key="/">/</button>

          <button onClick={() => handleButtonClick("7")} data-key="7">7</button>
          <button onClick={() => handleButtonClick("8")} data-key="8">8</button>
          <button onClick={() => handleButtonClick("9")} data-key="9">9</button>
          <button onClick={() => handleButtonClick("*")} data-key="*">*</button>

          <button onClick={() => handleButtonClick("4")} data-key="4">4</button>
          <button onClick={() => handleButtonClick("5")} data-key="5">5</button>
          <button onClick={() => handleButtonClick("6")} data-key="6">6</button>
          <button onClick={() => handleButtonClick("-")} data-key="-">-</button>

          <button onClick={() => handleButtonClick("1")} data-key="1">1</button>
          <button onClick={() => handleButtonClick("2")} data-key="2">2</button>
          <button onClick={() => handleButtonClick("3")} data-key="3">3</button>
          <button onClick={() => handleButtonClick("+")} data-key="+">+</button>

          <button onClick={() => handleButtonClick("0")} className="zero" data-key="0">0</button>
          <button onClick={() => handleButtonClick(".")} data-key=".">.</button>
          <button onClick={() => handleButtonClick("=")} className="equal" data-key="=">=</button>
        </div>
      </div>
    </div>
  );
}

export default App;
