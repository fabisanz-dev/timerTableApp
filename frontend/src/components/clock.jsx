import React, { useState, useEffect } from "react"

function Clock() {
  const [time, setTime] = useState(getCurrentTime())

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(getCurrentTime())
    }, 1000)

    return () => {
      clearInterval(interval)
    }
  }, [])

  function getCurrentTime() {
    const now = new Date()
    const options = { timeZone: "America/Mexico_City" }
    return now.toLocaleTimeString("it-IT", options)
  }

  return (
    <div className="font-digi">
      <h1 className="text-7xl">{time}</h1>
    </div>
  )
}

export default Clock
