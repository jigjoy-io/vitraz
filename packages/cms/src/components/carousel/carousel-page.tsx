import React, { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { motion, AnimatePresence } from "framer-motion"
import { carouselPageSwitched, pageUpdated } from "../../reducers/page-reducer"
import CloseIcon from "../../icons/close-icon"
import Button from "../button/button"
import Progress from "../progress/progress"
import Content from "../page-content"
import { useCurrentCarouselPage, usePage, useRootPage } from "../../util/store"

export default function CarouselPage(props) {
	const [current, setCurrent] = useState(0)
	const [direction, setDirection] = useState(0)
	const activeCarousel = useCurrentCarouselPage()
	const [percentage, setPercentage] = useState(0)
	const [pages, setPages] = useState(props.config.pages)
	const page = usePage()
	const rootPage = useRootPage()
	const dispatch = useDispatch()
	const { previous, next, home } = props.config.buttons

	const backToHome = async () => {
		dispatch(pageUpdated(rootPage))
		if (rootPage.type === "carousel") {
			dispatch(carouselPageSwitched(rootPage.config.pages[0].id))
		}
	}

	const calculatePercentage = (pageNumber) => {
		let percentage = (pageNumber / (pages.length - 1)) * 100
		setPercentage(percentage)
	}

	const refreshCarousel = () => {
		let currentIndex = pages.findIndex((p) => p.id === activeCarousel)
		if (currentIndex !== -1) {
			setCurrent(currentIndex)
			calculatePercentage(currentIndex)
		}
	}

	useEffect(() => {
		refreshCarousel()
	}, [activeCarousel])

	useEffect(() => {
		setPages(props.config.pages)
	}, [props.config.pages])

	useEffect(() => {
		refreshCarousel()
	}, [pages])

	const nextPage = () => {
		setDirection(1)
		let nextPage = pages[current + 1]
		dispatch(carouselPageSwitched(nextPage.id))
	}

	const previousPage = () => {
		setDirection(-1)
		let previousPage = pages[current - 1]
		dispatch(carouselPageSwitched(previousPage.id))
	}

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

	return (
		<>
			{page && (
				<div className="flex max-h-[100dvh] h-[100dvh] w-full justify-center">
					<div className="flex flex-col w-full md:max-w-[360px]">
						<div className="flex flex-row p-3">
							<Progress percentage={percentage} />
							<div className="w-max p-1 rounded-[5px] cursor-pointer" onClick={backToHome}>
								<CloseIcon />
							</div>
						</div>

						<div className="relative h-full">
							<AnimatePresence initial={true} custom={direction} mode="wait">
								<motion.div
									key={pages[current].id}
									custom={direction}
									variants={variants}
									initial="enter"
									animate="center"
									exit="exit"
									className="absolute w-full h-full p-3"
								>
									<Content config={pages[current].config} key={pages[current].id} id={pages[current].id} />
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
	)
}
