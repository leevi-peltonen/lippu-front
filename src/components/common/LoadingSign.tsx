
import { useEffect, useState } from "react"

interface LoadingSignProps {
    variant: 'dots' | 'spinner'
}

const LoadingSign = () => {

    const [dots, setDots] = useState(1)

    useEffect(() => {
        const timer = setInterval(() => {
            setDots(prevDots => (prevDots % 3) + 1)
        }, 500)

        return () => {
            clearInterval(timer)
        }
    }, [])

    return (
        <span>{'.'.repeat(dots)}</span>
    )
}

export default LoadingSign