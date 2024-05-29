import React from 'react'
import Alert from './components/alert/Alert'
import Button from './components/button/Button'
import Heading from './components/heading/Heading'
import Title from './components/title/Title'
import Text from './components/text/Text'
import Image from './components/image/Image'
import Popover from './components/popover/Popover'
import Trigger from './components/popover/Trigger'
import Content from './components/popover/Content'
import Item from './components/item/Item'
import OpenMenuIcon from './icons/OpenMenuIcon'
import Grid from './components/grid/Grid'


function App() {
	return (<>



		<div><Title text="JigJoy 🦄"></Title></div>
		<div><Heading text="JigJoy 🦄"></Heading></div>
		<div><Text text="JigJoy 🦄"></Text></div>

		<Alert type="success" title="JigJoy 🦄" message="Alert description" />
		<Button text="JigJoy 🦄"></Button>
		<Image imageUrl="https://s3.eu-west-1.amazonaws.com/create.jigjoy.io/assets/image+4.png"></Image>


		<Button text="JigJoy 🦄"></Button>
		<Popover>
			<Trigger><OpenMenuIcon /></Trigger>
			<Content>
				<Grid numberOfCols={1}>
					<Item text="Item 1"><div className="w-[200px]">Item 1</div></Item>
					<Item>Item 2</Item>
					<Item>Item 3</Item>
					<Item>Item 4</Item>
					<Item>Item 5</Item>
				</Grid>
			</Content>
		</Popover>
	</>
	)
}

export default App