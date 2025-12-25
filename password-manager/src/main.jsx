import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Home from './components/Home.jsx'
import Layout from './Layout.jsx'
import { createBrowserRouter, RouterProvider, Route, createRoutesFromElements } from 'react-router-dom'
import SignIn from './components/SignIn.jsx'
import Login from './components/Login.jsx'
import Features from './components/Features.jsx'
import { AuthProvider } from './context/AuthContext.jsx'
import Manager from './components/Manager.jsx'
import PublicRoute from './components/PublicRoute.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'
import Dashboard from './components/Dashboard.jsx'


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout />} >
      <Route path='' element={<Home />}/>
      <Route path='signin' element={<PublicRoute>
            <SignIn />
          </PublicRoute>}/>
      <Route path='login' element={ <PublicRoute>
            <Login />
          </PublicRoute>}/>
      <Route path='features' element={<Features/>}/>
      <Route path='manager' element={ <ProtectedRoute>
            <Manager />
          </ProtectedRoute>
      }/>
      <Route path='dashboard' element={ <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
      }/>
      </Route>
  ))

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
    <RouterProvider router = {router}/>
    </AuthProvider>
  </StrictMode>,
)
