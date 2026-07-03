import { useState } from "react"
import { useLeadsContext } from "../context/leadsContext"
import { useAuthContext } from "../context/authContext"
import { getApiUrl } from "../api"

function LeadCard({lead}){
    const [Status, setStatus] = useState(lead.status)
    const {dispatchLeads} = useLeadsContext()
    const { user } = useAuthContext()

    const handleStatusChange = async (e)=>{
        if (!user) return

        setStatus(e.target.value)
        const newlead = {...lead, status:e.target.value}
        const response = await fetch(getApiUrl(`/leads/${lead._id}`),{
            method:'PUT',
            body: JSON.stringify(newlead),
            headers:{
                'Content-Type':'application/json',
                'Authorization': `Bearer ${user.token}`
            }
        })
        const json = await response.json()
        console.log(json)
    }
    const handleDelete = async ()=>{
        if (!user) return

        const response = await fetch(getApiUrl(`/leads/${lead._id}`),{
            method:'DELETE',
            headers:{
                'Authorization': `Bearer ${user.token}`
            }
        })
        const json = await response.json()
        dispatchLeads({type:'DELETE_LEAD', payload: json})
        
    }
    return (
        <div className="leadCard">
                <div>
                    <p><strong>{lead.name}</strong></p>
                    <button onClick={handleDelete}>Delete</button>
                </div>
                <div>
                    <div>
                        <p><strong>Email: </strong>{lead.email}</p>
                        <p><strong>Phone: </strong>{lead.phone}</p>
                    </div>
                    <div>
                        <p><strong>Status: </strong>
                        <select name="" id="status" value={Status} onChange={handleStatusChange}>
                            <option value="new">new</option>
                            <option value="contacted">contacted</option>
                            <option value="converted">converted</option>
                        </select></p>
                        <p><strong>Assigned to: </strong>{lead.assignedTo}</p>
                    </div>
                </div>
        </div>
    )
}

export default LeadCard