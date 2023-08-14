import React, { useState, useEffect, useRef } from 'react';
import './App.css';

function App() {
  const [breakLength, setBreakLength] = useState(5);
  const [sessionLength, setSessionLength] = useState(25);
  const [timerLabel, setTimerLabel] = useState('Session');
  const [timeLeft, setTimeLeft] = useState(sessionLength * 60);
  const [isRunning, setIsRunning] = useState(false);

  const audioRef = useRef(null);

  useEffect(() => {
    if (isRunning) {
      const interval = setInterval(() => {
        setTimeLeft((prevTimeLeft) => prevTimeLeft - 1);
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [isRunning]);

  useEffect(() => {
    if (timeLeft === 0) {
      audioRef.current.play();
      if (timerLabel === 'Session') {
        setTimerLabel('Break');
        setTimeLeft(breakLength * 60);
      } else {
        setTimerLabel('Session');
        setTimeLeft(sessionLength * 60);
      }
    }
  }, [timeLeft, breakLength, sessionLength, timerLabel]);

  const handleStartStop = () => {
    setIsRunning(!isRunning);
  };

  const handleReset = () => {
    audioRef.current.pause();
    audioRef.current.currentTime = 0;
    setIsRunning(false);
    setBreakLength(5);
    setSessionLength(25);
    setTimerLabel('Session');
    setTimeLeft(25 * 60);
  };

  const handleBreakDecrement = () => {
    if (breakLength > 1) {
      setBreakLength(breakLength - 1);
    }
  };

  const handleBreakIncrement = () => {
    if (breakLength < 60) {
      setBreakLength(breakLength + 1);
    }
  };

  const handleSessionDecrement = () => {
    if (sessionLength > 1) {
      setSessionLength(sessionLength - 1);
      if (!isRunning) {
        setTimeLeft((sessionLength - 1) * 60);
      }
    }
  };

  const handleSessionIncrement = () => {
    if (sessionLength < 60) {
      setSessionLength(sessionLength + 1);
      if (!isRunning) {
        setTimeLeft((sessionLength + 1) * 60);
      }
    }
  };

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="container">
      <div className="label" id="break-label">Break Length</div>
      <div className="value" id="break-length">{breakLength}</div>
      <div className="buttons">
        <button className="button" id="break-decrement" onClick={handleBreakDecrement}>-</button>
        <button className="button" id="break-increment" onClick={handleBreakIncrement}>+</button>
      </div>
      <div className="label" id="session-label">Session Length</div>
      <div className="value" id="session-length">{sessionLength}</div>
      <div className="buttons">
        <button className="button" id="session-decrement" onClick={handleSessionDecrement}>-</button>
        <button className="button" id="session-increment" onClick={handleSessionIncrement}>+</button>
      </div>
      <div className="timer" id="timer-label">{timerLabel}</div>
      <div className="timer" id="time-left">{formatTime(timeLeft)}</div>
      <div className="controls">
        <button className="control-button" id="start_stop" onClick={handleStartStop}>
          {isRunning ? "Stop" : "Start"}
        </button>
        <button className="control-button" id="reset" onClick={handleReset}>Reset</button>
      </div>
      <audio id="beep" ref={audioRef} src="twentyfive-plus-five-clock\src\assets\AlarmSound.mp3" />
    </div>
  );
}

export default App;