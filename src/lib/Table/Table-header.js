import React from "react"
import { faArrowCircleDown } from "@fortawesome/free-solid-svg-icons";
import { faArrowCircleUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { TableHeaderIconWrapper } from  '../DataTable_style'


const TableHeader = ( { sortListBy, tableHead } ) => { 

    return (
        <React.Fragment>
            <tr>
                { tableHead.map(h => (
                    <th key={Math.random()}>
                        {h}
                        <TableHeaderIconWrapper>
                            <FontAwesomeIcon icon={faArrowCircleDown} onClick={() => sortListBy(h, false)}/>
                            <FontAwesomeIcon icon={faArrowCircleUp} onClick={() => sortListBy(h, true)} />
                        </TableHeaderIconWrapper>
                    </th>
                ))}
            </tr>
        </React.Fragment>
    )
}
export default TableHeader