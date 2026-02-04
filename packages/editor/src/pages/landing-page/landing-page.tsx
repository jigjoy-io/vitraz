import { useNavigate } from "@tanstack/react-router"
import { LazyMotion, m, useSpring, useTransform } from "framer-motion"
import React, { useEffect } from "react"
import JigJoy from "../../icons/jigjoy"
import Footer from "./footer"

const container = {
	hidden: { opacity: 0 },
	show: {
		opacity: 1,
		transition: {
			staggerChildren: 0.3,
		},
	},
}

const item = {
	hidden: { opacity: 0 },
	show: { opacity: 1 },
}

// Make sure to return the specific export containing the feature section.
const loadFeatures = () => import("../../util/style-helper/animations").then((res) => res.default)

function LandingPage() {
	const navigate = useNavigate()

	// Pulsing animation
	const pulse = useSpring(0, { damping: 0, mass: 5, stiffness: 10 })
	const pulsingBg = useTransform(pulse, (r) => {
		return `blur(${r}px)`
	})

	useEffect(() => {
		pulse.set(10)
	}, [])

	return (
		<div className="w-[100%]">
			<div className="flex flex-row w-[100%]">
				<div className="w-[100%] p-4">
					<div className="grid grid-cols-2">
						<div className="p-5 flex items-center">
							<div className=" lg:mx-40 2xl:mx-80 cursor-pointer" onClick={() => navigate({ to: "/" })}>
								<JigJoy />
							</div>
							<div
								className=" lg:mx-40 2xl:mx-80 font-bold cursor-pointer"
								onClick={() => navigate({ to: "/interactive-content-designer" })}
							>
								Blog
							</div>
						</div>
						<div className="hidden lg:block p-5">
							<div className="justify-end">
								<div className="flex gap-4 xl:gap-8 lg:mx-40 2xl:mx-80 justify-end">
									<a
										className="bg-gradient-to-r from-fuchsia-500 to-pink-500 text-white px-5 p-3 rounded-[30px] cursor-pointer"
										id="waitlist-button"
										href="https://jigjoy.io/interactive-content-designer/"
									>
										<div className="">Try for free</div>
									</a>
								</div>
							</div>
						</div>
					</div>

					<div className="lg:mt-0 2xl:w-[80%] flex flex-col gap-2xl:p-0 xl:relative xl:left-[50%] xl:-translate-x-[50%] xl:p-[75px] 2xl:p-[250px]">
						<LazyMotion features={loadFeatures}>
							<m.div variants={container} initial="hidden" animate="show">
								<m.div className="py-4 lg:py-8 xl:py-3" variants={item}>
									<h1 className="text-4xl lg:text-4xl 2xl:text-5xl text-center font-bold">Personalized AI Companion</h1>
								</m.div>
								<m.div variants={item}>
									<p className="text-xl xl:text-2xl my-4 text-center text-[#454545]">
										sends you jokes, news, interactive lessons, fitness routines—whatever matches your preferences
									</p>
								</m.div>
								<m.div className="max-w-fit mx-auto py-4 xl:py-3 lg:py-8" variants={item}>
									<div
										className="relative group cursor-pointer"
										onClick={() => navigate({ to: "/interactive-content-designer" })}
									>
										<m.div
											className="absolute -inset-1 bg-gradient-to-r from-red-600 to-violet-600 rounded-full"
											style={{
												filter: pulsingBg,
											}}
										></m.div>
										<div className="mt-4 relative px-10 py-5 bg-white ring-1 ring-gray-900/5 rounded-full leading-none flex items-top justify-start space-x-6">
											<div className="space-y-2 font-bold">
												<p className="text-xl">Try JigJoy for free</p>
											</div>
										</div>
									</div>
									<div className="p-5 flex justify-center">
										<p>No signup needed to try.</p>
									</div>
								</m.div>
							</m.div>
						</LazyMotion>
					</div>
				</div>
			</div>
			<Footer />
		</div>
	)
}

export default LandingPage
