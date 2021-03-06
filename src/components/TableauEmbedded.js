import { Typography } from '@mui/material';
import { Box } from '@mui/system';
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
        <Box id="vizContainer" sx={{
            padding: "20px"
        }}>
            <Typography component="h1" variant="h6" sx={{
                textAlign: "left"
            }}>
                Tableau Dashboard
            </Typography>
        </Box>
    );
}

export default TableauEmbed;