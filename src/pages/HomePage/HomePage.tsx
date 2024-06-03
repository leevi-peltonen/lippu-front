import { useNavigate } from "react-router-dom"
import { createRef } from "react"
import toast from "react-hot-toast"
import useUserStore from "../../features/userStore"
import LoadingSign from "../../components/common/LoadingSign"


const HomePage = () => {
    const navigate = useNavigate()
    const nameInput = createRef<HTMLInputElement>()

    const { userId, setUserId } = useUserStore()

    const createGame = () => {
        if(!nameInput.current?.value) return toast.error('Nimi puuttuu')
        setUserId(nameInput.current?.value)
        navigate('/create-game')
    }

    const joinGame = () => {
        if(!nameInput.current?.value) return toast.error('Nimi puuttuu')
        setUserId(nameInput.current?.value)
        navigate('/join-game')
    }

    return (
        <>
            <h2></h2>
            <input type="text" defaultValue={userId} placeholder="Kirjoita nimesi" ref={nameInput} />
            <button className="m-10" onClick={createGame}>Luo Peli</button>
            <button className="m-10" onClick={joinGame}>Liity Peliin</button>
        </>
    )
}

export default HomePage