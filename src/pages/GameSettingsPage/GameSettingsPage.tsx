import { useParams, useNavigate } from "react-router-dom"
import { createRoom } from "../../services/socketService"
import { createRef } from "react"

import './GameSettingsPage.css'
import toast from "react-hot-toast"
import useUserStore from "../../features/userStore"


const GameSettingsPage = () => {
    const { gamemode } = useParams()
    const navigate = useNavigate()
    const { userId } = useUserStore()
    const difficultyRef = createRef<HTMLSelectElement>()
    const lengthRef = createRef<HTMLSelectElement>()
    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault()
        createRoom({userId: userId, difficulty:getDifficulty(), length: getLength()}, (roomCode: string) => {
            console.log('Room created:', roomCode)
            if(!roomCode) return toast.error('Huoneen luonti epäonnistui')
            toast.success('Huone luotu onnistuneesti koodilla: ' + roomCode)
            navigate('/game/' + roomCode)
        })
    }

    const getDifficulty = () => {
        switch(difficultyRef.current?.value) {
            case 'easy':
                return 'easy'
            case 'medium':
                return 'medium'
            case 'hard':
                return 'hard'
            default:
                return 'easy'
        }
    }

    const getLength = () => {
        switch(lengthRef.current?.value) {
            case '5':
                return 5
            case '10':
                return 10
            case '15':
                return 15
            case '20':
                return 20
            default:
                return 5
        }
    }

    return (
        <>
            <h1>Pelin Asetukset</h1>
            <form onSubmit={handleSubmit}>
                <section>
                    <label htmlFor="rounds">Kierroksia</label>
                    <select id="rounds" ref={lengthRef}>
                        <optgroup label="Kierroksia">
                            <option value="5">5</option>
                            <option value="10">10</option>
                            <option value="15">15</option>
                            <option value="20">20</option>
                        </optgroup>
                    </select>
                </section>


                <section>
                    <label htmlFor="difficulty">Vaikeusaste</label>
                    <select id="difficulty" ref={difficultyRef}>
                        <optgroup label="Vaikeusaste">
                            <option value="easy">Helppo</option>
                            <option value="medium">Keskivaikea</option>
                            <option value="hard">Vaikea</option>
                        </optgroup>
                    </select>
                </section>

                {gamemode === '1' && (
                <section>
                    <label htmlFor="checkbox-enable-answers">Vastausvaihtoehdot?</label>
                    <input type="checkbox" id="checkbox-enable-answers" defaultChecked />
                </section>
                )}

                <section>
                    <button type="submit">Aloita peli</button>
                </section>
                
            </form>
        </>
    )

}

export default GameSettingsPage