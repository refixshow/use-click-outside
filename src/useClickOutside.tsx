import { useCallback, useState, useEffect, RefObject, useRef } from "react"

const useClickOutside = (ref: RefObject<HTMLElement>) => {
  const [isListening, setIsListening] = useState(false)
  const background = useRef(document.createElement("div"))
  const root = useRef(document.getElementById("root"))

  const setListener = useCallback(() => {
    if (ref.current && root.current) {
      if (root.current.contains(background.current)) {
        throw new Error("Too many listeners")
      }

      ref.current.style.zIndex = "9999"
      background.current.className = "background"
      root.current.appendChild(background.current)

      setIsListening(true)
    }
  }, [ref])

  const handleClose = useCallback(() => {
    if (isListening && root.current && ref.current) {
      if (!root.current.contains(background.current)) {
        throw new Error("There is nothing to close")
      }
      ref.current.style.zIndex = ""
      root.current.removeChild(background.current)

      setIsListening(false)
    }
  }, [ref, isListening])

  const handleClickEvent = useCallback(
    (e) => {
      if (ref.current && e.target) {
        const isRefEqualToTarget = ref.current === e.target
        const doesRefContainTarget = ref.current.contains(e.target)
        const isNotInRef = !isRefEqualToTarget && !doesRefContainTarget

        if (isNotInRef) {
          handleClose()
        }
      }
    },
    [ref, handleClose]
  )

  useEffect(() => {
    if (!isListening) {
      window.removeEventListener("click", handleClickEvent)
    } else {
      window.addEventListener("click", handleClickEvent)
    }

    return () => window.removeEventListener("click", handleClickEvent)
  }, [isListening, handleClickEvent])

  return {
    isListening,
    setListener,
    handleClose,
  }
}

export default useClickOutside
