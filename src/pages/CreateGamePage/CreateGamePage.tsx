import { useNavigate } from 'react-router-dom'
import './CreateGamePage.css'

interface GameMode {
    id: number
    name: string
    description: string

}

const GameModes: GameMode[] = [
    {
        id: 1,
        name: 'Klassikko',
        description: 'Kahdestaan pelattava vuoropohjainen valtion lippujen arvauspeli'
    },
    {
        id: 2,
        name: 'Aikapommi',
        description: 'Nopeatempoinen versio klassikosta, jossa pelaajat vastaavat samaan aikaan'
    },

]



const CreateGamePage = () => {
    const navigate = useNavigate()
    const chooseGameMode = (mode: GameMode) => {
        navigate('/game-settings/' + mode.id)
    }

    return (
        <ul>
            {GameModes.map((mode) => {
                return (
                    <li 
                        key={mode.id}
                        onClick={() => chooseGameMode(mode)}
                    >
                        <h2>{mode.name}</h2>
                        <p>{mode.description}</p>
                    </li>
                )
            })}
        </ul>
    )
}

export default CreateGamePage