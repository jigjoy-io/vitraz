import React from "react"
import Group from "./Group"
import Item from "./Item"

export default class Sidebar extends React.Component<any>{

    render() {
        return <div className="shadow rounded-lg min-h-[100vh]">
            <nav className="flex flex-row min-w-[240px]">


                <div className="p-20 w-max min-h-[100vh] border-r-2 border-secondary-light">
                    <Group layout="column" >
                        <Item focus><div className="w-[200px]">Home</div></Item>
                        <Item><div>Title</div></Item>
                        <Item>Heading</Item>
                        <Item>Text</Item>
                        <Item>Tooltip</Item>
                        <Item>Menu</Item>
                        <Item>Sidebar</Item>
                    </Group>

                </div>


                <div className="p-20 flex-1">
                    {this.props.children}
                </div>

            </nav>
        </div>
    }

}