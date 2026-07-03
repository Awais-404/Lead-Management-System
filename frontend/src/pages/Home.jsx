import { useEffect } from "react"
import Dashboard from "../components/dashboard"
import LeadsList from "../components/leadslist"
import SearchBar from "../components/searchbar"
import { Link } from "react-router-dom"
import AddLeadForm from "./AddLeadForm"
import { useLeadsContext } from "../context/leadsContext"
import { useAuthContext } from "../context/authContext"

function Home(){
    // const [leads, setleads] = useState([])
    const {leads, dispatchLeads} = useLeadsContext()
    const {user} = useAuthContext()

    useEffect(()=>{
        if (!user) return

        const getLeads = async ()=>{
            const response = await fetch('http://localhost:4000/api/leads', {
                headers: {'Authorization': `Bearer ${user.token}`}
            })
            const json = await response.json()
            if(!response.ok){
                console.log(json.error)
                return
            }
            dispatchLeads({type: 'SET_Leads', payload: json})
        }

        getLeads()
    }, [user])

    return (
        <div className="home">
            <Dashboard />
            <SearchBar />
            <LeadsList />
        </div>
    )
}

export default Home