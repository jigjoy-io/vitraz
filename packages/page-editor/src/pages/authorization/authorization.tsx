import { lazy, Suspense, useEffect, useState } from "react"
import React from "react"
import Input from "../../components/input/input"
const Button = lazy(() => import("renderer/Button"))
import { LazyMotion, m } from "framer-motion"
import { createSingInChallenge } from "../../api/authorize"
import { useNavigate } from "@tanstack/react-router"
import { getCurrentUser } from "aws-amplify/auth"
import Logo from "../../icons/logo"

const animation = {
	hidden: { opacity: 0 },
	show: {
		opacity: 1,
		transition: {
			duration: 1,
			staggerChildren: 0.1,
		},
	},
}

const item = {
	hidden: { opacity: 0 },
	show: { opacity: 1 },
}

const loadFeatures = () => import("../../util/style-helper/animations").then((res) => res.default)

export default function Authorization(props: any) {
	const [message, setMessage] = useState("")
	const [email, setEmail] = useState("")

	const [color, setColor] = useState("text-[geen]")
	const navigate = useNavigate()

	const isEmail = (email) => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)

	const checkUser = async () => {
		try {
			const user = await getCurrentUser()
			if (user) {
				navigate({
					to: "/interactive-content-designer",
				})
			}
		} catch (error) {
			console.error("Error checking user authentication:", error)
		}
	}

	async function authorize() {
		try {
			if (!isEmail(email)) {
				setColor("text-[red]")
				setMessage("Please provide valid email address")
			} else {
				setColor("text-[green]")
				setMessage("Log in link has been sent to provided email")
				await createSingInChallenge({ email: email })
			}
		} catch (error) {
			setMessage(error.message)
		}
	}

	function resetFields() {
		setEmail("")
		setMessage("")
	}

	useEffect(() => {
		checkUser()
		resetFields()
	}, [])

	const handleEmailChange = (email) => {
		setEmail(email)
	}

	return (
		<div className="mt-[10vh] flex justify-center">
			<LazyMotion features={loadFeatures}>
				<m.div variants={animation} initial="hidden" animate="show" className="gap-5 flex flex-col w-[400px]">
					<m.div key="logo" variants={item}>
						<Logo />
					</m.div>
					<m.div key="title" variants={item}>
						<div className="my-5">
							<div className="text-title">Welcome to JigJoy 👏</div>
						</div>
					</m.div>

					<m.div variants={item} className="flex flex-col">
						<Input onChange={handleEmailChange} key="email" type="email" placeholder="Enter Your Email" />
					</m.div>
					{message != "" && (
						<m.div variants={item} className={`flex flex-col ${color}`}>
							{message}
						</m.div>
					)}
					<m.div key="submit" variants={item}>
						<Suspense>
							<Button width="w-full" text="Log in or Sign up" action={authorize} focus={true} />
						</Suspense>
					</m.div>
				</m.div>
			</LazyMotion>
		</div>
	)
}
