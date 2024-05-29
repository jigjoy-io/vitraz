import React from "react"
import Grid from "../grid/Grid"
import Item from "../item/Item"

export default function Sidebar(props: any) {

    return <div className="shadow rounded-lg min-h-[100vh]">
        <nav className="flex min-w-[240px]">


            <div className="p-20 min-h-[100vh] border-r-2 border-default-light">
                <Grid layout="column" >
                    <Item focus><div className="w-[200px]">Home</div></Item>
                    <Item><div>Title</div></Item>
                    <Item>Heading</Item>
                    <Item>Text</Item>
                    <Item>Tooltip</Item>
                    <Item>Menu</Item>
                    <Item>Sidebar</Item>
                </Grid>

            </div>


            <div className="py-20 flex-1">
                {props.children}
            </div>

        </nav>
    </div>

}