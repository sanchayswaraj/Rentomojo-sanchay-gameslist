import React from 'react';

const Search = (props) => {

    const {setFilterText} = props

    const onSearchHandler = (val) => {
        setFilterText(val)
    }

    return (
        <>
            <input placeholder="Search in table"
                   onKeyUp={(e) => onSearchHandler(e.target.value)}
                   type="text"/>
        </>
    );
};

export default Search;
