import { useCallback, useEffect, useState } from "react"
// import "./index.css"
import { Greet, ScreenOn } from "../wailsjs/go/main/App"
import { Clock, Cronometer } from "./components"
import { EventsOn } from "../wailsjs/runtime/runtime"
import { obtenerFechaCompleta } from "./herpers"

function App() {
  let touch = 0
  const [show, setShow] = useState(true)
  const [slideVal, setSlideVal] = useState(0)

  useEffect(() => {
    EventsOn("temporizadorShow", data => {
      if (data) setShow(true)
    })
    EventsOn("tableroShow", data => {
      if (data) setShow(false)
    })
  }, [])

  useEffect(() => {
    const handleKeys = event => {
      if (event.key === "F11") {
        event.preventDefault()
        ScreenOn()
      }
      // if (event.key === "T" || event.key === "t") {
      //   event.preventDefault()
      //   setShow(true)
      // }
      // if (event.key === "P" || event.key === "p") {
      //   event.preventDefault()
      //   setShow(false)
      // }
    }
    document.addEventListener("keydown", handleKeys)

    const handleTouch = () => {
      touch++
      if (touch === 2) {
        setShow(!show)
        touch = 0
      }
      setTimeout(() => {
        touch = 0
      }, 1000) // Reiniciar después de 1 segundo
    }

    document.addEventListener("touchstart", handleTouch)

    return () => {
      document.removeEventListener("keydown", handleKeys)
      document.removeEventListener("touchstart", handleTouch)
    }
  }, [show])

  const changeColor = useCallback(() => {
    switch (slideVal) {
      case "1":
        return "bg-gray-50 border-2 border-slate-500"
      case "2":
        return "bg-gray-100 border-2 border-slate-500"
      case "3":
        return "bg-gray-200 border-2 border-slate-500"
      case "4":
        return "bg-gray-300 border-2 border-slate-500"
      case "5":
        return "bg-gray-400 border-2 border-slate-500"
      case "6":
        return "bg-gray-500 border-2 border-slate-500"
      default:
        return "bg-white border-2 border-slate-500"
    }
  }, [slideVal])

  return (
    <>
      <div
        id="content-app"
        // onClick={() => setShow(true)}
        // onDoubleClick={() => setShow(false)}
        className={`flex flex-col w-full h-screen ${
          !show && changeColor()
        } text-3xl`}
      >
        {show ? (
          <>
            <h3 className="text-right p-4">
              TEMPERATURA AMBIENTAL{" "}
              <b className="text-3xl text-red-500">23ºC</b>
            </h3>
            <div className="mt-44">
              <h3 className="text-center text-red-600 text-3xl">HORA</h3>
              <Clock />
              <p className="text-lg">
                <b className="text-red-600">
                  {obtenerFechaCompleta().split(",")[0]}
                </b>{" "}
                <b className="text-red-600">|</b>
                {obtenerFechaCompleta().split(",")[1]}
              </p>
              <Cronometer />
            </div>
          </>
        ) : (
          <div className="mt-auto">
            <input
              type="range"
              min="0"
              max="6"
              step="1"
              defaultValue={slideVal}
              onChange={e => setSlideVal(e.target.value)}
              className="cursor-col-resize h-5 bg-gray-200 rounded-full outline-none appearance-none"
            />
          </div>
        )}
      </div>
    </>
  )
}

export default App
