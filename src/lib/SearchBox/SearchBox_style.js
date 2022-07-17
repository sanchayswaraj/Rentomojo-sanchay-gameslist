import styled from "styled-components"

export const SearchSectionWrapper = styled.section`
    margin-bottom: 2%;
`

export const SearchBoxWrapper = styled.div`
    width: 100%;
    border: 3px solid #ccc;
    background-color: black;
    display: inline-flex;
    margin-top: 2%;
    align-items: center;
    svg { margin: 1%; }
    
    ${({ suggestionsBoxIsActive }) => suggestionsBoxIsActive && 
        `border-top-right-radius: 15px;
        border-top-left-radius: 15px; `}
    
    ${({ suggestionsBoxIsActive }) => !suggestionsBoxIsActive && 
        `border-radius: 15px `}
`

export const SearchBoxInput = styled.input`
    width: 95%; height: 25px;
    border: none !important;
    outline: none;
    border-radius: 15px;
    padding: 0px 5px;
    ::placeholder { font-weight: light; opacity: 0.8; }
`

export const SearchSuggestionsWrapper = styled.div`
    position: absolute;
    width: 100%;
    z-index: 2;
    background-color: white;
    border: 2px solid #ccc;
    text-align: justify;
    margin-bottom: 2%;
    color: #888;
    ul {
        margin: 0;
        padding-left: 0;
        li { 
            min-height: 2rem;
            display: flex;
            align-items: center;
            padding: 1%;
            font-size: 0.8rem;
            &:hover { background-color: #ccc; color:white; }
        }
        li:not(:first-child) { border-top: 1px solid #ccc; }
    }

    border-bottom-right-radius: 15px;
    border-bottom-left-radius: 15px;
    -webkit-box-shadow: 0px 14px 21px -6px rgba(86,86,86,0.95); 
    box-shadow: 0px 14px 21px -6px rgba(86,86,86,0.95); 
`
