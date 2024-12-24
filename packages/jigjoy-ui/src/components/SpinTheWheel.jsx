// SpinTheWheel.js
import React, { useState, useRef } from "react"

const SpinTheWheel = () => {
	const [step, setStep] = useState(1) // 1: Intro, 2: Spin, 3: Form
	const [prize, setPrize] = useState(null)
	const canvasRef = useRef(null)

	const prizes = ["10% Discount", "Free Shipping", "$5 Gift Card", "Exclusive Item", "15% Discount", "Buy 1 Get 1 Free", "$10 Gift Card", "Surprise Gift"]

	const spinWheel = () => {
		const canvas = canvasRef.current
		const ctx = canvas.getContext("2d")
		const colors = ["#FF5733", "#33FF57", "#3357FF", "#F333FF", "#FFD633", "#33FFD6", "#FF3366", "#9933FF"]

		const radius = canvas.width / 2
		const centerX = radius
		const centerY = radius

		// Draw Wheel
		prizes.forEach((prize, i) => {
			const angle = (i * (2 * Math.PI)) / prizes.length
			const nextAngle = ((i + 1) * (2 * Math.PI)) / prizes.length

			ctx.beginPath()
			ctx.moveTo(centerX, centerY)
			ctx.arc(centerX, centerY, radius, angle, nextAngle)
			ctx.fillStyle = colors[i % colors.length]
			ctx.fill()
			ctx.stroke()

			// Draw text
			ctx.save()
			ctx.translate(centerX + Math.cos(angle + (nextAngle - angle) / 2) * radius * 0.7, centerY + Math.sin(angle + (nextAngle - angle) / 2) * radius * 0.7)
			ctx.rotate(angle + (nextAngle - angle) / 2 + Math.PI / 2)
			ctx.fillStyle = "#000"
			ctx.font = "14px Arial"
			ctx.fillText(prize, -ctx.measureText(prize).width / 2, 0)
			ctx.restore()
		})

		// Spin animation
		let currentAngle = 0
		const spinDuration = 3000
		const endAngle = Math.random() * 2 * Math.PI
		const startTime = Date.now()

		const spin = () => {
			const elapsed = Date.now() - startTime
			if (elapsed < spinDuration) {
				currentAngle += 0.05
				ctx.clearRect(0, 0, canvas.width, canvas.height)
				ctx.save()
				ctx.translate(centerX, centerY)
				ctx.rotate(currentAngle)
				ctx.translate(-centerX, -centerY)
				prizes.forEach((_, i) => {
					const angle = (i * (2 * Math.PI)) / prizes.length
					const nextAngle = ((i + 1) * (2 * Math.PI)) / prizes.length
					ctx.beginPath()
					ctx.moveTo(centerX, centerY)
					ctx.arc(centerX, centerY, radius, angle, nextAngle)
					ctx.fillStyle = colors[i % colors.length]
					ctx.fill()
					ctx.stroke()
				})
				ctx.restore()
				requestAnimationFrame(spin)
			} else {
				const prizeIndex = Math.floor((endAngle / (2 * Math.PI)) * prizes.length)
				setPrize(prizes[prizeIndex % prizes.length])
				setStep(3)
			}
		}
		spin()
	}

	return (
		<div className="p-6 flex flex-col items-center justify-center min-h-screen">
			{step === 1 && (
				<div className="text-center">
					<h1 className="text-3xl font-bold mb-4">Zavrti točak i osvoji vredne nagrade!</h1>
					<button onClick={() => setStep(2)} className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none">
						Start
					</button>
				</div>
			)}
			{step === 2 && (
				<div className="text-center">
					<canvas ref={canvasRef} width={300} height={300} className="mb-4 border"></canvas>
					<button onClick={spinWheel} className="px-6 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none">
						Spin the Wheel
					</button>
				</div>
			)}
			{step === 3 && (
				<div className="text-center">
					<h2 className="text-2xl font-bold mb-4">Čestitamo! Osvojili ste: {prize}</h2>
					<form
						onSubmit={(e) => {
							e.preventDefault()
							alert("Hvala na prijavi! Pogledajte svoj email za nagradu.")
						}}
					>
						<div className="mb-4">
							<label className="block text-left mb-1" htmlFor="name">
								Ime:
							</label>
							<input id="name" type="text" className="w-full px-3 py-2 border rounded-md" required />
						</div>
						<div className="mb-4">
							<label className="block text-left mb-1" htmlFor="email">
								Email:
							</label>
							<input id="email" type="email" className="w-full px-3 py-2 border rounded-md" required />
						</div>
						<button type="submit" className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none">
							Submit
						</button>
					</form>
				</div>
			)}
		</div>
	)
}

export default SpinTheWheel
