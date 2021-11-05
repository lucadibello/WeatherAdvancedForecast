import React from 'react'
const { tableau } = window;

function TableauEmbed(props) {

    const initViz = () => {
        const containerDiv = document.getElementById("vizContainer");
        const url = props.url
        const options = {
            hideTabs: true,
            width: 1400,
            height: 1000
        };
        new tableau.Viz(containerDiv, url, options)
    }

    React.useEffect(() => {
        initViz();
    }, [])

    return (
        <div id="vizContainer">
            <div></div>
        </div>
    );
}

export default TableauEmbed;