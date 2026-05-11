import { useState } from 'react'

const useToast = () => {
  const [toast, setToast] = useState(null)

  const showToast = (message) => {
    setToast(message)
    setTimeout(() => setToast(null), 2500)
  }

  return { toast, showToast }
}

export default useToast