import React from "react"
import { motion } from "framer-motion"

function Progress({ percentage = 0 }) {
	return (
		<motion.div className="w-full bg-shallow-gray shadow-inner rounded-full h-5 mb-3 mr-3 translate-y-[50%]">
			<motion.div
				className="h-full relative rounded-full overflow-hidden bg-gradient-custom"
				initial={{ width: 0 }}
				animate={{ width: `${percentage}%` }}
				transition={{
					duration: 0.8,
					ease: "easeInOut",
					delay: 0.2,
				}}
			>
				<motion.div
					className="absolute inset-0"
					style={{
						background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.15) 50%, transparent 100%)",
					}}
					animate={{
						x: ["-100%", "100%"],
					}}
					transition={{
						duration: 1.5,
						repeat: Infinity,
						ease: "linear",
					}}
				/>

				<div className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent" />
			</motion.div>
		</motion.div>
	)
}

export default Progress
