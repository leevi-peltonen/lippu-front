import { useNavigate } from 'react-router-dom'
import { Gamemode } from '../../models/game'
import './CreateGamePage.css'



const GameModes: Gamemode[] = [
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
    {
        id: 3,
        name: 'Juoksuhauta',
        description: 'Lippujen vaikeusaste kasvaa, mitä pidemmälle peli etenee. Peli päättyy väärään vastaukseen'
    }
]



const CreateGamePage = () => {
    const navigate = useNavigate()
    const chooseGameMode = (mode: Gamemode) => {
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