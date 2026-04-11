import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import {
  getCurrentCustomer,
  loginCustomer,
  registerCustomer,
  updateCurrentCustomer,
} from '../services/authApi'

const AUTH_STORAGE_KEY = 'ecommerce_auth'

const AuthContext = createContext(null)

function readAuthStorage() {
  const raw = localStorage.getItem(AUTH_STORAGE_KEY)

  if (!raw) {
    return null
  }

  try {
    return JSON.parse(raw)
  } catch {
    return null
  }
}

export function AuthProvider({ children }) {
  const [token, setToken] = useState(null)
  const [customer, setCustomer] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const savedAuth = readAuthStorage()

    if (!savedAuth?.accessToken) {
      setIsLoading(false)
      return
    }

    setToken(savedAuth.accessToken)

    getCurrentCustomer(savedAuth.accessToken)
      .then((profile) => {
        setCustomer(profile)
      })
      .catch(() => {
        localStorage.removeItem(AUTH_STORAGE_KEY)
        setToken(null)
        setCustomer(null)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [])

  useEffect(() => {
    if (!token || !customer || customer.role) {
      return
    }

    getCurrentCustomer(token)
      .then((profile) => {
        setCustomer(profile)
        localStorage.setItem(
          AUTH_STORAGE_KEY,
          JSON.stringify({
            accessToken: token,
            customer: profile,
          }),
        )
      })
      .catch(() => {
        localStorage.removeItem(AUTH_STORAGE_KEY)
        setToken(null)
        setCustomer(null)
      })
  }, [token, customer])

  const persistAuth = (authData) => {
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(authData))
    setToken(authData.accessToken)
    setCustomer(authData.customer)
  }

  const login = async (payload) => {
    const authData = await loginCustomer(payload)
    persistAuth(authData)
    return authData
  }

  const register = async (payload) => {
    const authData = await registerCustomer(payload)
    persistAuth(authData)
    return authData
  }

  const refreshProfile = async () => {
    if (!token) {
      return null
    }

    const profile = await getCurrentCustomer(token)
    setCustomer(profile)

    const nextAuth = {
      accessToken: token,
      customer: profile,
    }

    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(nextAuth))
    return profile
  }

  const updateProfile = async (payload) => {
    if (!token) {
      throw new Error('Not authenticated')
    }

    const profile = await updateCurrentCustomer(token, payload)
    setCustomer(profile)

    const nextAuth = {
      accessToken: token,
      customer: profile,
    }

    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(nextAuth))
    return profile
  }

  const logout = () => {
    localStorage.removeItem(AUTH_STORAGE_KEY)
    setToken(null)
    setCustomer(null)
  }

  const value = useMemo(
    () => ({
      token,
      customer,
      isLoading,
      isAuthenticated: Boolean(token),
      isAdmin: customer?.role === 'admin',
      login,
      register,
      refreshProfile,
      updateProfile,
      logout,
    }),
    [token, customer, isLoading],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useAuth must be used inside AuthProvider')
  }

  return context
}
