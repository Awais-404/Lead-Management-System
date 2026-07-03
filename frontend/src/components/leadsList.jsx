import { useState, useEffect } from "react"
import LeadCard from "./leadCard"
import { useLeadsContext } from "../context/leadsContext"

function LeadsList(){
    const {leads, searchTerm, filterStatus} = useLeadsContext()
    const [currentPage, setCurrentPage] = useState(1)
    const itemsPerPage = 5

    // Filter leads based on search term and status
    console.log("Leads in LeadsList:", leads)
    const filteredLeads = leads.filter(lead => {
        const matchesSearch = lead.name?.toLowerCase().includes(searchTerm.toLowerCase())
        const matchesStatus = filterStatus === 'all' || lead.status === filterStatus
        return matchesSearch && matchesStatus
    })

    // Calculate pagination
    const totalPages = Math.ceil(filteredLeads.length / itemsPerPage)
    const startIndex = (currentPage - 1) * itemsPerPage
    const paginatedLeads = filteredLeads.slice(startIndex, startIndex + itemsPerPage)

    // Handle page changes
    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1)
        }
    }

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1)
        }
    }

    // Reset to page 1 when search or filter changes
    useEffect(() => {
        setCurrentPage(1)
    }, [searchTerm, filterStatus])

    return (
        <div className="leadsList">
            <div>
                {paginatedLeads && paginatedLeads.map((lead)=>(
                    <LeadCard key={lead._id} lead={lead} />
                ))}
            </div>
            
            {filteredLeads.length > 0 && (
                <div className="pagination">
                    <button onClick={handlePrevPage} disabled={currentPage === 1}>
                        Previous
                    </button>
                    <span>
                        Page {currentPage} of {totalPages} (Total: {filteredLeads.length} leads)
                    </span>
                    <button onClick={handleNextPage} disabled={currentPage === totalPages}>
                        Next
                    </button>
                </div>
            )}
            
            {filteredLeads.length === 0 && (
                <p className="noResults">No leads found</p>
            )}
        </div>
    )
}

export default LeadsList