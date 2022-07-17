import styled from "styled-components"

export const PaginationWrapper = styled.div`
    margin: 3% auto;
    display: flex; flex-flow: row nowrap;
    justify-content: center;
    border: 1px solid grey; border-radius: 5px;
`

export const PageNumber = styled.div`
    display: flex; justify-content: center; align-content:center;align-items: center;
    font-size:1rem;
    height:1.5rem; width: 1.5rem;margin: 1%;
    border: 2px solid lightgrey;
    border-radius: 50%;
    ${ ({currentActivePage}) => currentActivePage && 'border: 1px solid red'}
`
