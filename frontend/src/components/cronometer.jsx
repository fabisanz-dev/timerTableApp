import React, { useState, useRef, useCallback } from "react"

const IconPlay = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="w-6 h-6"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z"
    />
  </svg>
)

const IconStop = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="w-6 h-6"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M5.25 7.5A2.25 2.25 0 0 1 7.5 5.25h9a2.25 2.25 0 0 1 2.25 2.25v9a2.25 2.25 0 0 1-2.25 2.25h-9a2.25 2.25 0 0 1-2.25-2.25v-9Z"
    />
  </svg>
)

const IconRestart = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="w-6 h-6"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
    />
  </svg>
)

function Cronometer() {
  const [isRunning, setIsRunning] = useState(false)
  const [elapsedTime, setElapsedTime] = useState(0)
  const intervalRef = useRef(0)

  const startStopwatch = () => {
    setIsRunning(!isRunning)
    if (isRunning) {
      //clearInterval(intervalRef.current)
      cancelAnimationFrame(intervalRef.current)
    } else {
      setElapsedTime(0)
      clearInterval(intervalRef.current)
      const startTime = Date.now() - elapsedTime
      // intervalRef.current = setInterval(() => {
      //   setElapsedTime(Date.now() - startTime)
      // }, 10)
      const step = () => {
        setElapsedTime(Date.now() - startTime)
        intervalRef.current = requestAnimationFrame(step)
      }
      step()
    }
  }

  const resetStopwatch = () => {
    clearInterval(intervalRef.current)
    setElapsedTime(0)
    setIsRunning(false)
  }

  const formatTime = useCallback(
    time => {
      const minutes = Math.floor(time / 60000)
      const seconds = Math.floor((time % 60000) / 1000)
      const milliseconds = Math.floor((time % 1000) / 10)
      return `${minutes < 10 ? "0" : ""}${minutes}:${
        seconds < 10 ? "0" : ""
      }${seconds}:${milliseconds < 10 ? "0" : ""}${milliseconds}`
    },
    [elapsedTime]
  )

  return (
    <div>
      <div className="text-9xl w-full font-digi mt-2">
        {formatTime(elapsedTime)}
      </div>
      <div style={{ display: "flex", gap: 10, justifyContent: "center" }}>
        <button
          className="text-slate-100 p-3 rounded-full
          text-4xl bg-red-600 focus:drop-shadow-[0_2px_2px_rgba(255,255,255,1)]"
          onClick={startStopwatch}
        >
          {isRunning ? <IconStop /> : <IconPlay />}
        </button>
        <button
          className="text-slate-600 bg-stone-100 p-3 rounded-full
         text-lg transition-transform transform-gpu focus:scale-90"
          onClick={resetStopwatch}
        >
          <IconRestart />
        </button>
      </div>
    </div>
  )
}

export default Cronometer
