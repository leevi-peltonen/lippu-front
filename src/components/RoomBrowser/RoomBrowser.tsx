import { getAllRooms, onRoomsReceived, socket } from '../../services/socketService'
import { Room } from '../../models/room'
import { useEffect, useState } from 'react'
import TableButton from '../common/TableButton'
import './RoomBrowser.css'

interface RoomBrowserProps {
    joinRoom: (code: string) => void
}

const RoomBrowser = ({joinRoom}: RoomBrowserProps) => {
    const [rooms, setRooms] = useState([] as Room[])

    const handleRoomsReceived = (rooms: Room[]) => {
        setRooms(rooms)
    }

    useEffect(() => {
        onRoomsReceived(handleRoomsReceived)
        getAllRooms()

        return () => {
            socket.off('rooms', handleRoomsReceived)
        }
    }, [])


    return (
        <div className="container">
            {rooms.length > 0 ?
            <table className="styled-table">
                <thead>
                    <tr>
                        <th>Pelimuoto</th>
                        <th>Pelaajat</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {rooms.map(room => {
                        return (
                            <tr key={room.code}>
                                <td>{room.gamemode}</td>
                                <td>{room.users.length}/{2}</td>
                                <td>
                                    <TableButton 
                                        action={joinRoom}
                                        value={room.code}
                                        label="Liity"
                                    />
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table> : <p>Huoneita ei löytynyt</p>}
        </div>
    )
}

export default RoomBrowser