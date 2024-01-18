import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'//use to select user to see if they are logged in

//* even though protected, prevents a non logged in user from seeing the new ticket page
export const useAuthStatus = () => {
  const [loggedIn, setLoggedIn] = useState(false)
  const [checkingStatus, setCheckingStatus] = useState(true)

  const { user } = useSelector((state) => state.auth) //user is on state.auth

  useEffect(() => {
    if (user) {
      setLoggedIn(true)
    } else {
      setLoggedIn(false)
    }
    setCheckingStatus(false) //reset setCheckingStatus to default value
  }, [user]) //user is a dependency (runs whenever user changes)

  return { loggedIn, checkingStatus }
}