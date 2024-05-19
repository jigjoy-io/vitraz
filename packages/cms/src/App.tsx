import React from 'react'
import Heading from './components/building-blocks/Heading'
import Text from './components/building-blocks/Text'
import Title from './components/building-blocks/Title'
import { Tooltip } from './components/building-blocks/Tooltip'
import Menu from './components/building-blocks/menu/Menu'
import MenuItem from './components/building-blocks/menu/MenuItem'


function App() {
	return (

		<div className='p-20 pl-[100px]'>
			<div className='text-6xl'>JigJoy Building Blocks</div>
			<hr className='my-6' />
			<div className='text-4xl py-4 text-primary font-bold gap-6'>Title</div>
			<Title>The Title building block is used for creating large, prominent text headers.</Title>
			<div className='text-4xl py-4 text-primary font-bold'>Heading</div>
			<Heading>The Heading building block is used for creating large, prominent text headers.</Heading>
			<div className='text-4xl py-4 text-primary font-bold'>Text</div>
			<Text>Text block is the usualy the main body text defined to describe and show the main body text together with the different options.</Text>
			<div className='text-4xl py-4 text-primary font-bold'>Tooltip</div>
			<Tooltip message="jigjoy tooltip"><div className='border-2 border-[black] p-2 w-[150px] rounded-sm'><p>Hover me!</p></div></Tooltip>
			<div className='text-4xl py-4 text-primary font-bold'>Menu</div>
			<Menu>
				<MenuItem>Item 1</MenuItem>
				<MenuItem>Item 2</MenuItem>
			</Menu>
		</div>

	)
}

export default App