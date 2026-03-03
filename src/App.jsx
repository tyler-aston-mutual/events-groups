import { Routes, Route } from 'react-router-dom'
import Home from './screens/Home.jsx'

function App() {
  return (
    <div className="min-h-screen bg-white max-w-sm mx-auto">
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  )
}

export default App
