import { Lock, Mail, Eye } from 'lucide-react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Login.css'

const Login = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    navigate('/dashboard')
  }

  return (
    <main className="login-page">
      <form className="login-card" onSubmit={handleSubmit}>
        <h1>Login</h1>

        <label className="login-field">
          <span>Email</span>
          <div className="login-input-wrap">
            <Mail size={14} strokeWidth={2} />
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="Example@gmail.com"
            />
          </div>
        </label>

        <label className="login-field">
          <span>Password</span>
          <div className="login-input-wrap">
            <Lock size={14} strokeWidth={2} />
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="********"
            />
            <Eye className="login-eye" size={14} strokeWidth={2} />
          </div>
        </label>

        <button className="login-submit" type="submit">
          Login
        </button>
      </form>
    </main>
  )
}

export default Login
