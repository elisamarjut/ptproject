import { Link, Outlet } from 'react-router-dom'

import './App.css'
import { AppBar, Typography } from '@mui/material'

function App() {

  return (
    <div className='App'>
      <AppBar position='absolute' color='transparent'>
        <Typography variant='h6'>Personal trainer</Typography>
        <nav>
          <Link to={"/"}>Home</Link><br />
          <Link to={"/customerlist"}>Customer list</Link><br />
          <Link to={"/traininglist"}>Training list</Link><br />
          <Link to={"/calendar"}>Training calendar</Link><br />
          <Link to={"/chart"}>Training chart</Link>
        </nav>
        <Outlet />
      </AppBar>

    </div>
  )
}

export default App
