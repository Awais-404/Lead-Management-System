import { useAuthContext } from '../context/authContext'
import { useLeadsContext } from '../context/leadsContext'

export const useLogout = () => {
  const { dispatch } = useAuthContext()
  const { dispatchLeads } = useLeadsContext()

  const logout = () => {
    // remove user from storage
    localStorage.removeItem('user')

    // dispatch logout action
    dispatch({ type: 'LOGOUT' })
    dispatchLeads({ type: 'SET_Leads', payload: [] })
  }

  return { logout }
}