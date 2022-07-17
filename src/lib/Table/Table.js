import React from 'react';
import PropTypes from "prop-types"
import TableHeader from './Table-header'
import { TableWrapper, StyledTableHeader, StyledTable, StyledTableRow } from '../DataTable_style'
import moment from 'moment'

const Table = ({currentPage, sortListBy, searchTerm, tableHead}) => {

    const currentQuery = searchTerm
    
    /** @function tableRow 
     *  uses @type {Object} item passed by @function tableData
     *  and  @type {Array} tableHead
     *  to generate @function columnData
     *  @function columnData maps these together to produce @type{Markup} for each table data cell <td>
     *  if needed, it processes data from item object to prepare for render (@example using momentjs to format dates)
     *  @returns @type{Markup} StyledTableRow : each table row corresponding to an item object, mapped as table data cells
    */
    const tableRow = item => {
        // eslint-disable-next-line no-unused-vars
        const { key, value } = item
        const tableCell = [...tableHead]
        
        const columnData = tableCell.map( prop => {
            let valueToDisplay
            // Process incoming object values to send/display into table row
            // if prop is an object => ex: prop 'state': { name: 'xy', abbreviation: 'z' }
            if ( key[prop] instanceof Object && key[prop].constructor === Object ) { valueToDisplay = key[prop][0] }
            //  if prop is a DATE => format with MomentJS
            else if ( !isNaN(new Date(key[prop]).getDate()) ) { valueToDisplay = moment(key[prop]).format('MM/DD/YY') }
            // if prop is an array
            else if ( Array.isArray(key[prop])) {
                // console.log('VALUE IS ARRAY=', key[prop])
                // array has more than 1 value ? display values of array as a string, else display the only value
                key[prop].length > 1 ? valueToDisplay =  key[prop].join(' ') : valueToDisplay = key[prop][0];
            }
            // if ( prop === 'dob' || prop ==='startDate') { valueToDisplay = moment(key[prop]).format('MM/DD/YY') }
            else { valueToDisplay = key[prop] }
            
            let match = false;
            
            if (currentQuery.length > 2 && (valueToDisplay.toLowerCase().includes(currentQuery))  ) { match=true }

            return (<td key={Math.random()} style={{backgroundColor:match?'yellow':'none'}} >{valueToDisplay}</td>) 
        })        
        return (<StyledTableRow key={Math.random()}>{columnData}</StyledTableRow>)
    }

    /** @function tableData 
     *  maps currentPage @type{items[]} to key:index pairs
     *  for @function tableRow to use
     *  @returns {@function tableRow}
    */
    const tableData = () => { return currentPage.map((key, index) => tableRow({key, index}))  }

    return (
        <TableWrapper>
            <StyledTable>
                <StyledTableHeader>
                    <TableHeader sortListBy={sortListBy} tableHead={tableHead}/>
                </StyledTableHeader>
                <tbody>{tableData()}</tbody>    
            </StyledTable>
        </TableWrapper>
    )
}

export default Table
Table.propTypes = {
    currentPage: PropTypes.array,
    sortListBy: PropTypes.func,
    tableHead: PropTypes.arrayOf(PropTypes.string),
}