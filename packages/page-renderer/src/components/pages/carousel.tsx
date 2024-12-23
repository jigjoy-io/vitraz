import React, { lazy, Suspense, useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

import PageContent from "./page-content"

const Button = lazy(() => import("@jigjoy-ui/button"))
const Progress = lazy(() => import("@jigjoy-ui/progress"))
const CloseIcon = lazy(() => import("@jigjoy-ui/icons/close-icon"))

const springConfig = {
	type: "spring",
	stiffness: 200,
	damping: 25,
	mass: 1.5,
}

const variants = {
	enter: (direction) => ({
		x: direction > 0 ? 20 : -20,
		opacity: 0,
		transition: {
			x: springConfig,
			opacity: { duration: 0.2 },
		},
	}),
	center: {
		x: 0,
		opacity: 1,
		transition: {
			x: springConfig,
			opacity: { duration: 0.3 },
		},
	},
	exit: (direction) => ({
		x: direction > 0 ? -20 : 20,
		opacity: 0,
		transition: {
			x: springConfig,
			opacity: { duration: 0.2 },
		},
	}),
}

export default function Carousel(props) {
	const [current, setCurrent] = useState(0)
	const [direction, setDirection] = useState(0)

	const [percentage, setPercentage] = useState(0)
	const [pages, setPages] = useState(props.config.pages)

	const { previous, next, home } = props.config.buttons

	const backToHome = async () => {
		props.switchPage(props.parentPage)
	}

	const calculatePercentage = (pageNumber) => {
		let percentage = (pageNumber / (pages.length - 1)) * 100
		setPercentage(percentage)
	}

	useEffect(() => {
		if (current !== -1) {
			calculatePercentage(current)
		}
	}, [current])

	useEffect(() => {
		setPages(props.config.pages)
		setCurrent(0)
	}, [props.config.pages])

	const nextPage = () => {
		setDirection(1)
		setCurrent(current + 1)
	}

	const previousPage = () => {
		setDirection(-1)
		setCurrent(current - 1)
	}

	return (
		<Suspense>
			<>
				{pages[current] && (
					<div className="flex max-h-[100dvh] h-[100dvh] w-full justify-center">
						<div className="flex flex-col w-full md:max-w-[360px]">
							<div className="flex flex-row p-3 w-full min-w-[360px]">
								<Progress percentage={percentage} />
								<div className="w-max p-1 rounded-[5px] cursor-pointer" onClick={backToHome}>
									<CloseIcon />
								</div>
							</div>

							<div className="relative h-full">
								<AnimatePresence initial={true} custom={direction} mode="wait">
									<motion.div key={pages[current].id} custom={direction} variants={variants} initial="enter" animate="center" exit="exit" className="w-full h-full p-3">
										<PageContent config={pages[current].config} key={pages[current].id} id={pages[current].id} switchPage={props.switchPage} />
									</motion.div>
								</AnimatePresence>
							</div>

							{current === 0 && (
								<div className="flex flex-row fixed bottom-0 gap-3 p-3 mt-3  w-full md:max-w-[360px]">
									<Button width="w-full" text={next} action={nextPage} rounded />
								</div>
							)}
							{current !== pages.length - 1 && current !== 0 && (
								<div className="flex flex-row fixed bottom-0 gap-3 p-3 mt-3  w-full md:max-w-[360px]">
									<Button width="w-full" text={previous} action={previousPage} rounded />
									<Button width="w-full" text={next} action={nextPage} rounded />
								</div>
							)}
							{current === pages.length - 1 && (
								<div className="flex flex-row fixed bottom-0 gap-3 p-3 mt-3  w-full md:max-w-[360px]">
									<Button width="w-full" text={home} action={backToHome} rounded />
								</div>
							)}
						</div>
					</div>
				)}
			</>
		</Suspense>
	)
}
