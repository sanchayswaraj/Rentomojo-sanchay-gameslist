import React, {useEffect, useReducer, useState} from 'react'
import PropTypes from 'prop-types'
import {initialState, reducer} from './datatable_state'
import {searchSuggestions} from './searchText'

import {ComponentWrapper} from './DataTable_style'

import Table from './Table/Table'
import Pagination from "./Pagination/Pagination"
import SelectEntriesBox from './SelectEntriesBox/SelectEntriesBox'
import SearchBox from './SearchBox/SearchBox'


const Datatable = ({entriesOptions, tableHead, dataSrc}) => {

    const [state, dispatch] = useReducer(reducer, initialState)

    // reinit page action depends on datasource nature
    const resetPage = (mockDataSrc) => {
        return mockDataSrc ? dispatch({type: 'initWithMock'}) : dispatch({type: 'init', payload: dataSrc})
    }

    useEffect(() => {
        // use mockdata as data source
        if (!dataSrc) {
            dispatch({type: 'initWithMock'})
        } else {
            dispatch({type: 'init', payload: dataSrc})
        }

    }, [dataSrc])

    useEffect(() => {
        console.log('state changed:', state)
    }, [state])


    const selectEntriesAmount = (n) => {
        dispatch({type: 'setEntriesPerPage', value: n})
    }
    const currentlyShowing = state.currentPage?.length
    const listTotal = state.collection?.length

    const changePage = (pageNumber) => {
        dispatch({type: 'setCurrentPage', value: pageNumber})
    }
    const sortListBy = (sortParam, reverse) => {
        dispatch({type: 'sortList', value: {sortParam, reverse}})
    }

    const input = document.querySelector('input')
    const [searchInputValues, setSearchInputValues] = useState("")
    const [suggestions, setSuggestions] = useState([])

    const handleSearchChange = e => {
        let query = e.target.value
        dispatch({type: 'searchList', value: query})
        if (query.length > 2) {
            let sugg = searchSuggestions(query, state.collection)
            setSuggestions(sugg)
        } else {
            setSuggestions([])
            resetPage()
        }
    }
    const handleKeyDown = e => {
        const key = e.code;
        if (key === 'Enter') {
            validateCurrentSearch()
        }
    }
    const validateCurrentSearch = () => {
        let suggestedResults = Array.from(suggestions.values()).flat()
        dispatch({type: 'setCollection', value: suggestedResults})
        dispatch({type: 'setEntriesPerPage', value: state.entries})
        setSuggestions([])
    }
    const clearInput = () => {
        if (input.value !== "") {
            setSearchInputValues("")
            input.value = ""
            setSuggestions([])
            resetPage()
        } else {
            return
        }
    }
    const selectSuggestion = (suggestion) => {
        input.value = suggestion
        let resultsOfClickedSuggestion = suggestions.get(suggestion)
        setSuggestions([])
        dispatch({type: 'setCollection', value: resultsOfClickedSuggestion})
        dispatch({type: 'setEntriesPerPage', value: state.entries})
    }
    const handleSearchSubmit = () => {
        return input.value !== "" ? validateCurrentSearch() : null
    }


    return (
        <ComponentWrapper>
            <SelectEntriesBox
                options={entriesOptions}
                selectEntriesAmount={selectEntriesAmount}
                currentlyshowing={currentlyShowing}
                listTotal={listTotal}
                entries={state.entries}
            />
            <SearchBox
                handleSearchChange={handleSearchChange}
                handleSearchSubmit={handleSearchSubmit}
                clearInput={clearInput}
                values={searchInputValues}
                suggestions={suggestions}
                selectSuggestion={selectSuggestion}
                handleKeyDown={handleKeyDown}
            />
            {state.collectionAsPages &&
            <Table
                tableHead={tableHead}
                currentPage={state.currentPage}
                sortListBy={sortListBy}
                searchTerm={state.searchTerm}
            />
            }
            <Pagination
                totalPages={state.totalPages}
                currentPage={state.currentPage}
                changePage={changePage}
            />
        </ComponentWrapper>
    )
}
export default Datatable

Datatable.propTypes = {
    entriesOptions: PropTypes.array,
    tableHead: PropTypes.arrayOf(PropTypes.string),
    dataSrc: PropTypes.arrayOf(PropTypes.object)
}

Datatable.defaultProps = {
    mockDataSrc: true,
    entriesOptions: [15, 30, 50],
    tableHead: ['firstName', 'lastName', 'dob', 'startDate', 'street', 'city', 'state', 'zipcode', 'department'],
    dataSrc: null
}
