import { createContext, useContext, useReducer, useState } from "react";

const leadContext = createContext()

const leadsReducer = (leads, action)=>{
    switch (action.type) {
        case 'SET_Leads':
            return  {leads: action.payload}

        case 'DELETE_LEAD':
            const new_array = leads.leads.filter(lead => lead._id != action.payload._id)
            return {leads: new_array}
    
        default:
            return leads;
    }
}

export const LeadsContextProvider = ({children})=>{
    const [leadsState, dispatchLeads] = useReducer(leadsReducer, {leads: []})
    const [searchTerm, setSearchTerm] = useState('')
    const [filterStatus, setFilterStatus] = useState('all')
    
    return (
        <leadContext.Provider value={{leads: leadsState.leads, dispatchLeads, searchTerm, setSearchTerm, filterStatus, setFilterStatus}}>
            {children}
        </leadContext.Provider>
    )
}


// Hook for leads context
export const useLeadsContext = () => {
  const context = useContext(leadContext)

  if(!context) {
    throw Error('useLeadsContext must be used inside an leadsContextProvider')
  }

  return context
}