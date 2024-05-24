

import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import HomePage from './pages/HomePage/HomePage'
import NotFoundPage from './pages/NotFoundPage'
import CreateGamePage from './pages/CreateGamePage/CreateGamePage'
import MainLayout from './components/layouts/MainLayout'
import JoinGamePage from './pages/JoinGamePage/JoinGamePage'
import GameSettingsPage from './pages/GameSettingsPage/GameSettingsPage'
import GamePage from './pages/GamePage/GamePage'

function App() {
  return (
    <>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<MainLayout disableHomeButton><HomePage /></MainLayout>} />
                <Route path="/create-game" element={<MainLayout><CreateGamePage /></MainLayout>} />
                <Route path="/game-settings/:gamemode" element={<MainLayout><GameSettingsPage /></MainLayout>} />
                <Route path="/join-game" element={<MainLayout><JoinGamePage /></MainLayout>} />
                <Route path="/game/:gameId" element={<MainLayout><GamePage /></MainLayout>} />
                <Route path="*" element={<MainLayout><NotFoundPage /></MainLayout>} />
            </Routes>
        </BrowserRouter>
    </>
  )
}

export default App
