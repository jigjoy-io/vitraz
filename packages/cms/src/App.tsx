import React from 'react'
import Heading from './components/building-blocks/Heading'
import Text from './components/building-blocks/Text'
import Title from './components/building-blocks/Title'
import { Tooltip } from './components/building-blocks/Tooltip'
import Group from './components/building-blocks/Group'
import Item from './components/building-blocks/Item'
import Popover from './components/building-blocks/popover/Popover'
import Trigger from './components/building-blocks/popover/Trigger'
import Content from './components/building-blocks/popover/Content'
import { connect } from 'react-redux'
import uuid4 from 'uuid4'
import Sidebar from './components/building-blocks/Sidebar'
import Button from './components/building-blocks/Button'
import Question from './components/building-blocks/question/Question'
import QuestionContent from './components/building-blocks/question/QuestionContent'
import QuestionAnswers from './components/building-blocks/question/QuestionAnswers'
import Image from './components/building-blocks/Image'


class App extends React.Component<any> {

	state = {
		blockEvents: this.props.blockEvents
	}

	componentDidUpdate(prevProps: any) {

		if (this.props.blockEvents != prevProps.blockEvents) {
			this.setState({ blockEvents: this.props.blockEvents })
		}

	}

	render() {
		return <div style={{ pointerEvents: this.state.blockEvents ? 'none' : 'auto', zIndex: 100 }} key="app">
			<Sidebar>
				<div className='flex flex-col w-[100%]'>
					<div className='w-[800px] translate-x-[50%]'>
						<div className='text-5xl'>JigJoy Playground</div>
						<hr className='my-6' />
						<div className='text-4xl py-4 text-primary font-bold gap-6'>Title</div>
						<Title id={uuid4()}>The Title building block is used for creating large, prominent text headers.</Title>
						<div className='text-4xl py-4 text-primary font-bold'>Heading</div>
						<Heading id={uuid4()}>The Heading building block is used for creating large, prominent text headers.</Heading>
						<div className='text-4xl py-4 text-primary font-bold'>Text</div>
						<Text id={uuid4()}>Text block is the usualy the main body text defined to describe and show the main body text together with the different options.</Text>
						<div className='text-4xl py-4 text-primary font-bold'>Tooltip</div>
						<Tooltip message="jigjoy tooltip"><div className='border-2 border-[black] p-2 rounded-sm'><p>Hover me!</p></div></Tooltip>
						<div className='text-4xl py-4 text-primary font-bold'>Group</div>
						
						<Group layout="column">
							<Item>Item 1</Item>
							<Item>Item 2</Item>
						</Group>

						<div className='text-4xl py-4 text-primary font-bold'>Button</div>
						<Button>primary</Button>

						<div className='text-4xl py-4 text-primary font-bold'>Popover</div>
						<Popover>
							<Trigger>
								<Tooltip message="Popoever will open on click"><div className='border-2 border-[black] p-2 rounded-sm w-fit'><p>Click me!</p></div></Tooltip>
							</Trigger>
							<Content>
								<Group layout="column">
									<Item><div className="w-[200px]">Item 1</div></Item>
									<Item>Item 2</Item>
									<Item>Item 3</Item>
								</Group>
							</Content>
						</Popover>

						<div className='text-4xl py-4 text-primary font-bold'>Question</div>
						<Question>
							<QuestionContent>
								<div className='text-4xl py-4 font-bold'>How much past tenses forms does French have?</div>
								<Image position='center'></Image>
							</QuestionContent>
							<QuestionAnswers>
								
								<Item correct={true}>One</Item>
								<Item correct={false}>Five</Item>
								<Item correct={false}>Ten</Item>

							</QuestionAnswers>
						</Question>


					</div>
				</div>

			</Sidebar>

		</div>

	}

}

const mapStateToProps = (state: any) => {
	return {
		blockEvents: state.page.blockEvents
	}
}

export default connect(mapStateToProps, null)(App)

