import React from 'react'
import './Pagination.css'

function Pagination({ postsPerPage, totalPosts, paginate, currentPage }) {
    const pageNumbers = []

    for(let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
        pageNumbers.push(i)
    }

    return (
        <div className="pagination">
            <div className="pagination__list">
                {pageNumbers.map(number => (
                    <p onClick={() => paginate(number)} key={number} className={number===currentPage?"pagination__number pagination__numberBackground":"pagination__number"}>
                        {number}
                    </p>
                ))}
            </div>        
        </div>
    )
}

export default Pagination
