import { width } from '@mui/system';
import React from 'react'
const { tableau } = window;

function TableauEmbed() {

    const initViz = () => {
        const containerDiv = document.getElementById("vizContainer");
        const url = "https://public.tableau.com/views/WorldVisualizations/Worlddashboard"
        const options = {
            hideTabs: true,
            width: 1200,
            height: 1000
        };
        new tableau.Viz(containerDiv, url, options)
    }

    React.useEffect(() => {
        initViz();
    }, [])

    return (
        <div id="vizContainer">
            <p>Tableau Dashboard</p>
            <div></div>
        </div>
    );
}

export default TableauEmbed;