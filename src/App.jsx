import { Routes, Route } from 'react-router-dom'
import Home from './screens/Home.jsx'

function App() {
  return (
    <div className="max-w-sm mx-auto" style={{ height: '100dvh', overflow: 'hidden' }}>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  )
}

export default App
