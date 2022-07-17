import React from 'react';
import PropTypes from "prop-types"
import { PaginationWrapper, PageNumber } from './Pagination_style'

const Pagination = ({totalPages, currentActivePage, changePage}) => {

    return (

        <PaginationWrapper>
            
            {[...Array(totalPages)].map((x, i) =>
                <PageNumber
                    key={Math.random()}
                    currentActivePage={i===currentActivePage}
                    onClick={()=> changePage(i)}
                    >{i+1}</PageNumber>
            )}
        
        </PaginationWrapper>
    )
}
export default Pagination
Pagination.propTypes = {
    totalPages: PropTypes.number,
    currentActivePage: PropTypes.number,
    changePage: PropTypes.func.isRequired
}