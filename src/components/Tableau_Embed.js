import React, {useRef, useEffect} from 'react'
const { tableau } = window;

function TableauEmbed() {

    function initViz() {
        const containerDiv = document.getElementById("vizContainer");
        const url = "http://public.tableau.com/views/RegionalSampleWorkbook/Storms"
        const options = {
            hideTabs: true
        };
        new tableau.Viz(containerDiv, url, options)
    }


    useEffect(() => {
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