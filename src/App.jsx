import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/home/Home'
import Leaderboard from './pages/leaderboard/Leaderboard'

const routes = [
  {
    path: '/',
    exact: true,
    children: <Home/>
  },
  {
    path: '/leaderboard',
    exact: true,
    children: <Leaderboard/>
  },
]

function App() {
  const isMobile = navigator.userAgentData.mobile

  if (isMobile) return (
    <>
    <div className="is-mobile-container">
      <div className='is-mobile-message'>Please Open in Desktop Browser</div>
      <div className='is-mobile-message'>Thank you.</div>
    </div>
    </>
  )

  return (
    <BrowserRouter>
      <Routes>
        {routes.map((route, id) => {
          return (
            <Route key={id} path={route.path} element={route.children} />
          )
        })}
      </Routes>
    </BrowserRouter>
  )
}

export default App
