import React, { useCallback, useRef } from "react"
import useClickOutside from "./useClickOutside"
import "./App.scss"

function App() {
  const ref = useRef<HTMLDivElement>(null)
  const { isListening, setListener, handleClose } = useClickOutside(ref)

  const handleSubmit = useCallback((e) => {
    e.preventDefault()
  }, [])

  return (
    <div className="App">
      <div ref={ref} className={`PopUp ${isListening ? "PopUp--active" : ""}`}>
        <form method="POST" onSubmit={handleSubmit}>
          <h1>Log in to your account!</h1>
          <div>
            <label>Nick:</label>
            <input type="text" id="nick" required />
          </div>
          <div>
            <label>Password:</label>
            <input type="password" id="password" required />
          </div>
          <div>
            <input type="submit" value="send" />
          </div>
          <button onClick={handleClose}>X</button>
        </form>
      </div>

      <button
        className={`PopUp__button ${
          isListening ? "PopUp__button--hidden" : ""
        }`}
        onClick={() => {
          setListener()
        }}
      >
        Log in!
      </button>
    </div>
  )
}

export default App
