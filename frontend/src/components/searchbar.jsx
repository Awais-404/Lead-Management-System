import { useLeadsContext } from "../context/leadsContext"

function SearchBar(){
    const { searchTerm, setSearchTerm, filterStatus, setFilterStatus } = useLeadsContext()
    
    return (
        <div className="searchBar">
            <input 
                type="text" 
                placeholder="Search by name..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <select 
                value={filterStatus} 
                onChange={(e) => setFilterStatus(e.target.value)}
            >
                <option value="all">All Status</option>
                <option value="new">New</option>
                <option value="contacted">Contacted</option>
                <option value="converted">Converted</option>
            </select>
        </div>
    )
}

export default SearchBar