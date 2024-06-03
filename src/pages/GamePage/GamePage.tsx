import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { sendMessage, onMessageReceived, onError, leaveRoom, onUsersUpdated, socket  } from '../../services/socketService'
import toast from 'react-hot-toast'
import useUserStore from '../../features/userStore'

import './GamePage.css'
import LoadingSign from '../../components/common/LoadingSign'

interface Country {
    name: string
    code: string
}


const GamePage = () => {

    const { gameId } = useParams()

    const [message, setMessage] = useState<string>('')
    const [messages, setMessages] = useState<{ userId: string, message: string }[]>([])
    const [roomCode, setRoomCode] = useState<string>('')
    const [users, setUsers] = useState<string[]>([])
    const [error, setError] = useState<string>('')

    const [gameRunning, setGameRunning] = useState<boolean>(false)

    const [currentTurn, setCurrentTurn] = useState<string>('')
    const [currentFlag, setCurrentFlag] = useState<Country>({name: '', code: ''})
    const [currentTurnNumber, setCurrentTurnNumber] = useState<number>(1)
    const [options, setOptions] = useState<Country[]>([])
    const [points, setPoints] = useState<{ [userId: string]: number }>({})

    const [gameOver, setGameOver] = useState<boolean>(false)

    const { userId } = useUserStore()

    useEffect(() => {
        if(!gameId) return
        setRoomCode(gameId)

        return () => {
            setRoomCode('')
        }
    }, [gameId])

    useEffect(() => {


        const handleMessageReceived = (data: { userId: string, message: string }) => {
            setMessages((prevMessages) => [...prevMessages, data]);
        };
      
        const handleError = (errorMessage: string) => {
            setError(errorMessage);
        };
      
        const handleUsersUpdated = (users: string[]) => {
            setUsers(users);
        };

        const handleGameState = (gameState: { currentTurn: string, currentFlag: Country, options: Country[], guesses: { [userId: string]: string }, points: { [userId: string]: number}, currentTurnNumber: number, gameOver: boolean }) => {
            setCurrentTurn(gameState.currentTurn);
            setCurrentFlag(gameState.currentFlag);
            setOptions(shuffleAnswers(gameState.options, gameState.currentFlag));
            setPoints(gameState.points);
            setGameOver(gameState.gameOver)
            setCurrentTurnNumber(Math.floor(gameState.currentTurnNumber / 2) + 1)
        };


        onMessageReceived(handleMessageReceived);
        onError(handleError);
        onUsersUpdated(handleUsersUpdated);
        socket.on('updateGameState', handleGameState)
        

        return () => {
            socket.off('message', handleMessageReceived)
            socket.off('error', handleError)
            socket.off('updateUsers', handleUsersUpdated)
            socket.off('updateGameState', handleGameState)
        }

    }, [])

    useEffect(() => {
        return () => {
            if(roomCode) leaveRoom(roomCode, userId)
        }
    }, [roomCode, userId])

    useEffect(() => {
        if(users.length === 2) {
            toast.success('Pelaajat liittyneet, peli alkaa pian!')
            setTimeout(() => {
                setGameRunning(true)
            }, 5000)
        }
    }, [users])

    useEffect(() => {
        if (error) toast.error(error)
    }, [error])


    const handleMakeGuess = (guess: string) => {
        socket.emit('makeGuess', { roomCode, guess, userId })
    }

    const shuffleAnswers = (options: Country[], correctAnswer: Country) => {
        const answers = [correctAnswer, ...options]
        return answers.sort(() => Math.random() - 0.5)
    }

    const findWinner = (points: { [userId: string]: number }) => {
        let winner = ''
        let highestScore = 0
        for (const [user, score] of Object.entries(points)) {
            if(score === highestScore) {
                winner = 'Peli Päättyi Tasan!'
            }
            if(score > highestScore) {
                winner = `Voittaja on ${user}!`
                highestScore = score
            }
        }
        return winner
    }

    if(gameOver) return (
        <div>
            <h1>Peli ohi! {findWinner(points)}</h1>
            <h2>Lopulliset pisteet</h2>
            <ul>
              {Object.entries(points).map(([user, point], index) => (
                <li key={index}>{`${user}: ${point}`}</li>
              ))}
            </ul>
        </div>
    )

    if(gameRunning) return (
        <div className="game-container">
            <p className="turn-number">Vuoro Numero {currentTurnNumber}</p>
            
            {currentTurn === userId ? (
            <div className="player-turn">
              <p className="highlight">Sinun vuorosi!</p>
              <img className="flag" src={`https://flagcdn.com/${currentFlag.code.toLowerCase()}.svg`} alt="Current flag" width="500" />
              <div className="options">
                {options.map((option, index) => (
                  <button className="option-button" key={index} onClick={() => handleMakeGuess(option.code)}>
                    {option.name}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="opponent-turn">
              <p>Vastustajan vuoro<LoadingSign/></p>
              <img className="flag"src={`https://flagcdn.com/${currentFlag.code.toLowerCase()}.svg`} alt="Current flag" width="500" />
              <div className="options">
                {options.map((option, index) => (
                  <button className="option-button" key={index} disabled>
                    {option.name}
                  </button>
                ))}
              </div>
            </div>
          )}
            <div className="points-container">
                <h2>Pisteet:</h2>
                <ul className="points-list">
                {Object.entries(points).map(([user, point], index) => (
                    <li className="points-item" key={index}>{`${user}: ${point}`}</li>
                ))}
                </ul>
            </div>
        </div>
    )


    return (
        <div>
            <h1>Liity koodilla {roomCode}</h1>
            {users.length === 1 &&
                <h3>Odotetaan vastustajaa...</h3>
            }

            {users.length === 2 &&
                <>
                    <h3>Pelaajat:</h3>
                    <ul>
                        {users.map((user, index) => {
                            return (
                                <li key={index}>{user}</li>
                            )
                        })}
                    </ul>
                </>
            }

            <form onSubmit={(event) => {
                event.preventDefault()
                sendMessage(roomCode, message, userId)
                setMessage('')
            }}>
                <input
                    type="text"
                    value={message}
                    onChange={(event) => setMessage(event.target.value)}
                />
                <button type="submit">Send</button>
            </form>

            <ul className="chat-box">
                {messages.map((msg, index) => {
                    return (
                        <li key={index} className="chat-item">
                            <p>{msg.userId}: {msg.message}</p>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}

export default GamePage