import { Link, Outlet } from 'react-router-dom'

import './App.css'

function App() {

  return (
    <div className='App'>
      <nav>
        <Link to={"/"}>Home</Link><br />
        <Link to={"/customerlist"}>Customer list</Link><br />
        <Link to={"/traininglist"}>Training list</Link>
      </nav>
      <Outlet />
    </div>
  )
}

export default App
