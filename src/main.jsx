import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import CustomerList from './components/CustomerList.jsx'
import TrainingList from './components/TrainingList.jsx'
import Home from './components/Home.jsx'
import './index.css'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Error />,
    children: [
      {
        element: <Home />,
        index: true
      },
      {
        path: "customerlist",
        element: <CustomerList />
      },
      {
        path: "traininglist",
        element: <TrainingList />
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
