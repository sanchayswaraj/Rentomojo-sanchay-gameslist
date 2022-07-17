import React, {useEffect, useState} from 'react';
import DataTable from 'react-data-table-component';
import Search from "../Search/Search";
import axios from "axios";

  


function App(props) {
    const columns = [
        {
            name: 'Title',
            selector: row => row.title,
            sortable: true,
        },
        {
            name: 'Platform',
            selector: row => row.platform,
            sortable: true,
        },
        {
            name: 'Score',
            selector: row => row.score,
            sortable: true,
        },
        {
            name: 'Genre',
            selector: row => row.genre,
            sortable: true,
        },
        {
            name: 'Editors Choice',
            selector: row => row.editors_choice,
            sortable: true,
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
                title="Game List"
                pagination="true"
                highlightOnHover
                columns={columns}
                data={gameData.filter(
                    item => item.title.toLowerCase().includes(filterText.toLowerCase()) ||
                        item.platform.toLowerCase().includes(filterText.toLowerCase()) ||
                        item.genre.toLowerCase().includes(filterText.toLowerCase())
                )}
                subHeader
                subHeaderComponent={subHeaderComponentMemo} /> : <div>loading..</div>}

        </div>
    );
}

export default App;
