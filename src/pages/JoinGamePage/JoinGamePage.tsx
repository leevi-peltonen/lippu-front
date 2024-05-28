import { useState } from 'react'
import toast from "react-hot-toast"
import DigitInput from "../../components/DigitInput/DigitInput"
import { joinRoom } from "../../services/socketService"
import useUserStore from "../../features/userStore"
import { useNavigate } from 'react-router-dom'
import RoomBrowser from '../../components/RoomBrowser/RoomBrowser'
import TableButton from '../../components/common/TableButton'

import './JoinGamePage.css'

const JoinGamePage = () => {
    const [gameCode, setGameCode] = useState<string>('')

    const { userId } = useUserStore()

    const navigate = useNavigate()

    const joinGame = (code: string) => {
        if (code) {
            toast(`Liitytään peliin koodilla ${code}`, {style: { backgroundColor: "#747bff", color: "#fff" } , icon: '🚀' })
            joinRoom(code, userId, (success) => {
                if (!success) {
                    toast('Liittyminen epäonnistui', { style: { backgroundColor: '#8B0000', color: '#fff' }, icon: '❌' })
                    return
                }
                if(success) {
                    toast('Liitytty peliin', { style: { backgroundColor: '#00FF00', color: '#fff' }, icon: '✅' })
                    navigate('/game/' + code)
                }
                
            }
            )
            
        } else {
            toast('Syötä koodi ensin', { style: { backgroundColor: '#8B0000', color: '#fff' }, icon: '❌' })
        }
    }




    return (
        <>
            <h2>Syötä aulan koodi</h2>
            <DigitInput onInputComplete={(code: string) => setGameCode(code)} />
            <TableButton
                action={joinGame}
                value={gameCode}
                label="Liity"
            />
            <hr/>
            <RoomBrowser joinRoom={joinGame} />
        </>
    )
}

export default JoinGamePage