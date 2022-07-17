import React, {useEffect, useState} from 'react';
import DataTable from 'react-data-table-component';
import Search from "../Search/Search";
import axios from "axios";

  
const customStyles = {
    rows: {
        style: {
            minHeight: '50px', // override the row height
            fontSize: '20px',
            
            backgroundColor: '#DCFFFD',
        },
    },


    pagination: {
		style: {
			fontSize: '15px',
            fontWeight: '1000px',
			minHeight: '56px',
			borderTopStyle: 'solid',
			borderTopWidth: '1px',
		},
    },

    headCells: {
        style: {
            paddingLeft: '8px', // override the cell padding for head cells
            paddingRight: '8px',
            backgroundColor: 'black',
            color: '#FFE5B4',
            fontSize: '25px',
            fontWeight: 800,

        },
    },
    cells: {
        style: {
            paddingLeft: '5px', // override the cell padding for data cells
            paddingRight: '8px',
           
            fontWeight: 500,
           
        },
    },

  
};








function App(props) {
    const columns = [

        {
            name: 'S.No.',
            cell: (row, index) => index + 1,
            width: "120px",
          },
        {
            name: 'Title',
            selector: row => row.title,
            sortable: true,
        },
        {
            name: 'Platform',
            selector: row => row.platform,
            sortable: true,
            width: "250px",
        },
        {
            name: 'Score',
            selector: row => row.score,
            sortable: true,
            width: "150px",
        },
        {
            name: 'Genre',
            selector: row => row.genre,
            sortable: true,
            width: "150px",
        },
        {
            name: 'Editors Choice',
            selector: row => row.editors_choice,
            sortable: true,
            width: "220px",
            
        },
    ];
    const [gameData, setGameData] = useState({});
    const [filterText, setFilterText] = React.useState('');

    useEffect(() => {
        getCharacters().then((response) => {
            const filteredData = response.filter((item, index) => index !== 0);
            console.log('filteredData', filteredData);
            setGameData(filteredData);
        });
    }, []);

    async function getCharacters() {
        const { data } = await axios.get(
            "https://s3-ap-southeast-1.amazonaws.com/he-public-data/gamesarena274f2bf.json"
        );
        return data;
    }

    const subHeaderComponentMemo = React.useMemo(() => {
        return (
            <Search setFilterText={setFilterText} />
        );
    }, [filterText]);
    return (
        <div>
            {Object.keys(gameData).length !== 0 ? <DataTable
               
                pagination="true"
                highlightOnHover
                fixedHeader
                responsive
                fixedHeaderScrollHeight='520px'
                customStyles={customStyles}
                columns={columns}
                data={gameData.filter(
                    item => item.title.toLowerCase().includes(filterText.toLowerCase()) ||
                        item.platform.toLowerCase().includes(filterText.toLowerCase()) ||
                        item.genre.toLowerCase().includes(filterText.toLowerCase())
                )}
                subHeader
                subHeaderComponent={subHeaderComponentMemo} /> : <div>loading...</div>}

        </div>
    );
}

export default App;
