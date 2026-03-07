import React from 'react'
import { Navigate } from 'react-router'
import { useAuth } from '../hooks/useAuth.js'
import Loading from '../components/Loading.jsx'

const Protected = ({ children }) => {
  const { loading, user } = useAuth()

  if (loading) {
    return <Loading message="Checking authentication..." />
  }

  if (!user) {
    return <Navigate to="/login" replace />
  }

  return children
}

export default Protected