import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import CustomerList from './components/Customer/CustomerList.jsx'
import TrainingList from './components/Training/TrainingList.jsx'
import Home from './components/Home.jsx'
import './index.css'
import TrainingCalendar from './components/Training/TrainingCalendar.jsx'
import TrainingChart from './components/Training/TrainingChart.jsx'

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
      },
      {
        path: "calendar",
        element: <TrainingCalendar />
      },
      {
        path: "chart",
        element: <TrainingChart />
      }
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
