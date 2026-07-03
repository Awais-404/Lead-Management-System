import { useState } from "react"
import { useAuthContext } from "../context/authContext"
import { getApiUrl } from "../api"

function AddLeadForm(){
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")
    const [status, setStatus] = useState("new")
    const [assignedTo, setAssignedTo] = useState("")
    const [error, setError] = useState(null)

    const {user} = useAuthContext()

    const handleSubmit = async (e)=>{
        e.preventDefault()
        if(!user){
            return
        }

        const lead = {name, email, phone, status, assignedTo}

        const response = await fetch(getApiUrl('/leads'),{
            method:'POST',
            body:JSON.stringify(lead),
            headers:{
                'Content-Type':'application/json',
                'Authorization': `Bearer ${user.token}`
            }
        })
        const josn = await response.json()
        console.log(josn)
    }


    return (
        <div className="formPage">
            <form className="addLeadForm" onSubmit={handleSubmit}>
                <h2>Add New Lead</h2>

                <div className="formGroup">
                    <label htmlFor="name">Name</label>
                    <input type="text" id="name" value={name} onChange={ e => setName(e.target.value)}/>
                </div>

                <div className="formGroup">
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" value={email} onChange={ e => setEmail(e.target.value)}/>
                </div>

                <div className="formGroup">
                    <label htmlFor="phone">Phone</label>
                    <input type="tel" id="phone" value={phone} onChange={ e => setPhone(e.target.value)}/>
                </div>

                <div className="formGroup">
                    <label htmlFor="assignedto">Assigned To</label>
                    <input type="text" id="assignedto" value={assignedTo} onChange={ e => setAssignedTo(e.target.value)}/>
                </div>

                <div className="formGroup">
                    <label htmlFor="status">Status</label>
                    <select name="status" id="status" value={status} onChange={ e => setStatus(e.target.value)}>
                        <option value="new">new</option>
                        <option value="contacted">contacted</option>
                        <option value="converted">converted</option>
                    </select>
                </div>

                <div className="formActions">
                    <button type="submit">Add Lead</button>
                </div>
                {error && <div className="error">{error}</div>}
            </form>
        </div>
    )
}

export default AddLeadForm