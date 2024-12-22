import React from "react"
import { motion } from "framer-motion"

export default function CloseIcon() {
	const pathVariants = {
		initial: { pathLength: 0, opacity: 0 },
		animate: {
			pathLength: 1,
			opacity: 1,
			transition: {
				pathLength: { duration: 0.5, ease: "easeInOut" },
				opacity: { duration: 0.2 },
			},
		},
		hover: {
			scale: 1.1,
			transition: { duration: 0.2 },
		},
	}

	return (
		<motion.svg
			width="32"
			height="32"
			viewBox="0 0 32 32"
			initial="initial"
			animate="animate"
			whileHover="hover"
			className="cursor-pointer"
		>
			<defs>
				<linearGradient id="closeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
					<stop offset="0%" stopColor="#000000" />
					<stop offset="100%" stopColor="#1d1d1d" />
				</linearGradient>
			</defs>

			<motion.path
				d="M8 8L24 24"
				stroke="url(#closeGradient)"
				strokeWidth="3"
				strokeLinecap="round"
				variants={pathVariants}
				style={{ filter: "drop-shadow(0px 0px 3px rgba(0, 0, 0, 0.2))" }}
			/>

			<motion.path
				d="M24 8L8 24"
				stroke="url(#closeGradient)"
				strokeWidth="3"
				strokeLinecap="round"
				variants={pathVariants}
				style={{ filter: "drop-shadow(0px 0px 3px rgba(0, 0, 0, 0.2))" }}
			/>
		</motion.svg>
	)
}
