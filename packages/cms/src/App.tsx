import React from 'react'
import Text from './components/building-blocks/Text'


function App() {
	return (

		<div className='p-10'>
			<div className='text-6xl text-primary'>JigJoy Building Blocks</div>
			<hr className='my-6' />
			<div className='text-3xl pb-4'>Text</div>
			<Text>Text block is the usualy the main body text defined to describe and show the main body text together with the different options.</Text>

		</div>

	)
}

export default App