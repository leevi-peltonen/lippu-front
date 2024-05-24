import { useState, useEffect, ChangeEvent, KeyboardEvent } from "react"
import "./DigitInput.css"

interface DigitInputProps {
    onInputComplete: (code: string) => void
}

const DigitInput = ({ onInputComplete }: DigitInputProps) => {
  const [digits, setDigits] = useState<string[]>(new Array(6).fill(""))

  useEffect(() => {
    const code = digits.join("")
    if (code.length === 6) {
      onInputComplete(code)
    }
  }, [digits, onInputComplete])

  const handleChange = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    const newDigits = [...digits]
    newDigits[index] = e.target.value
    setDigits(newDigits)

    if (e.target.value.length === 1 && index < 5) {
      document.getElementById(`digit-${index + 1}`)?.focus()
    }
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Backspace" && !digits[index] && index > 0) {
      document.getElementById(`digit-${index - 1}`)?.focus()
    }
  }

  return (
    <div className="digit-input-container">
      {digits.map((digit, index) => (
        <input
          key={index}
          id={`digit-${index}`}
          type="text"
          maxLength={1}
          value={digit}
          onChange={(e) => handleChange(e, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          className="digit-input-box"
        />
      ))}
    </div>
  )
}

export default DigitInput