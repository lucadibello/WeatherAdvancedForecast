import React from 'react'
const { tableau } = window;

function TableauEmbed() {

    const initViz = () => {
        const containerDiv = document.getElementById("vizContainer");
        const url = "http://public.tableau.com/views/RegionalSampleWorkbook/Storms"
        const options = {
            hideTabs: true
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