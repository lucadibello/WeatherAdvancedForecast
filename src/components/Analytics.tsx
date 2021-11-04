import { render } from "@testing-library/react";
import React from "react";
import CustomDrawer from "./CustomDrawer";
import TableauEmbed from "./TableauEmbedded";

export default function Analytics () {
    React.useEffect(() => {
    })
    return(
        <div style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>
            <TableauEmbed/>
        </div>      
    )
}
