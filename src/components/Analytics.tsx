import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Tab } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import TableauEmbed from "./TableauEmbedded";

export default function Analytics() {
    const [value, setValue] = React.useState('1');

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
      setValue(newValue);
    };

    return (
        <div>
            <TabContext value={value}>
                <Box>
                    <TabList onChange={handleChange} aria-label="lab API tabs example">
                        <Tab label="World" value="1" />
                        <Tab label="Europe" value="2" />
                        <Tab label="Switzerland" value="3" />
                    </TabList>
                </Box>
                <TabPanel value="1">
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <TableauEmbed url={"https://public.tableau.com/views/WorldVisualizations/Worlddashboard"} />
                    </div>
                </TabPanel>
                <TabPanel value="2">
                    <TableauEmbed url={"https://public.tableau.com/views/EuropeWeather/EuropeDashboard"} />
                </TabPanel>
                <TabPanel value="3">
                    <TableauEmbed url={"https://public.tableau.com/views/SwitzerlandWeather/Switzerland"} />
                </TabPanel>
            </TabContext>
            <Box>
                
            </Box>
        </div>
    )
}
