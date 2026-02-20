import { useContext, useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, AuthContext } from './context/AuthContext'
import { PaymentProvider } from './context/PaymentContext'
import { NotificationProvider } from './context/NotificationContext'
import Login from './pages/Login'
import Register from './pages/Register'
import Verify from './pages/Verify'
import Dashboard from './pages/Dashboard'
import SendMoney from './pages/SendMoney'
import RequestMoney from './pages/RequestMoney'
import Transactions from './pages/Transactions'
import Profile from './pages/Profile'
import NotFound from './pages/NotFound'
const LoadingScreen = () => (
    <div className="loading-screen">
        <div className="spinner"></div>
        <p>BikuePay</p>
    </div>
)
function ProtectedRoute({ children }) {
    const { isAuthenticated, loading } = useContext(AuthContext)
    if (loading) return <LoadingScreen />
    return isAuthenticated ? children : <Navigate to="/login" replace />
}
function AppContent() {
    const { isAuthenticated, loading, checkAuth } = useContext(AuthContext)
    useEffect(() => {
        checkAuth()
    }, [])
    if (loading) return <LoadingScreen />
    return (
        <Routes>
            {!isAuthenticated ? (
                <> 
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/verify" element={<Verify />} />
                    <Route path="*" element={<Navigate to="/login" replace />} />
                </>
            ) : (
                <> 
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/send" element={<SendMoney />} />
                    <Route path="/request" element={<RequestMoney />} />
                    <Route path="/transactions" element={<Transactions />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/404" element={<NotFound />} />
                    <Route path="*" element={<Navigate to="/" replace />} />
                </>
            )}
        </Routes>
    )
}
export default function App() {
    return (
        <NotificationProvider>
            <AuthProvider>
                <PaymentProvider>
                    <Router>
                        <AppContent />
                    </Router>
                </PaymentProvider>
            </AuthProvider>
        </NotificationProvider>
    )
}