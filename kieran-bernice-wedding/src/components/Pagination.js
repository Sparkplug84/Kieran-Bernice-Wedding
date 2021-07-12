import React from 'react'
import './Pagination.css'

function Pagination({ postsPerPage, totalPosts, paginate }) {
    const pageNumbers = []

    for(let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
        pageNumbers.push(i)
    }

    return (
        <div className="pagination">
            <div className="pagination__list">
                {pageNumbers.map(number => (
                    <p key={number} className="pagination__number">
                        <a onClick={() => paginate(number)} href="!#" className="pagination__link">
                            {number}
                        </a>
                    </p>
                ))}
            </div>        
        </div>
    )
}

export default Pagination
