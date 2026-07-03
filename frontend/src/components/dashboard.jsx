import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from "recharts"
import { useAuthContext } from "../context/authContext"

function Dashboard(){
    const [info, setInfo] = useState({})
    const {user} = useAuthContext()
    
    useEffect(()=>{
        if (!user) return

        const getInfo = async ()=>{
            const response = await fetch('http://localhost:4000/api/leads/info', {
                headers: {'Authorization': `Bearer ${user.token}`}
            })
            const json = await response.json()
            if(response.ok){
                setInfo(json)
            }
        }
        getInfo()
    }, [user])

    const chartData = [
        {
            name: 'New Leads',
            value: info.new || 0,
            fill: '#10b981'
        },
        {
            name: 'Contacted',
            value: info.contacted || 0,
            fill: '#3b82f6'
        },
        {
            name: 'Converted',
            value: info.converted || 0,
            fill: '#ff4d4d'
        }
    ]

    return (
        <div className="dashboard">
            <div>
                <p><strong>Total leads: </strong>{info.total}</p>
                <p><strong>New: </strong>{info.new}</p>
                <p><strong>Contacted: </strong>{info.contacted}</p>
                <p><strong>Converted: </strong>{info.converted}</p>
                <Link to='/AddLeadForm'><button>Add Lead</button></Link>
            </div>
            {/* <div> */}
                <ResponsiveContainer width="70%" height={300}>
                    <PieChart>
                        <Pie
                            data={chartData}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            label={({ name, value }) => `${name}: ${value}`}
                            outerRadius={100}
                            fill="#8884d8"
                            dataKey="value"
                        >
                            {chartData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.fill} />
                            ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                    </PieChart>
                </ResponsiveContainer>
            {/* </div> */}
        </div>
    )
}

export default Dashboard