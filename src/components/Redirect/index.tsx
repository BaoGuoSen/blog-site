import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

interface RedirectProps {
  to: string
}
const Redirect: React.FC<RedirectProps> = ({ to }) => {
  const nav = useNavigate()

  useEffect(() => nav(to))
  return null
}

export default Redirect
