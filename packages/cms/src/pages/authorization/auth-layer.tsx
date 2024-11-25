import { useEffect } from "react"
import { handleConfirmSignIn } from "../../api/authorize"
import { useAuthorized } from "../../util/store"
import { accountUpdated } from "../../reducers/auth-reducer"
import { useDispatch } from "react-redux"
import { useNavigate, useSearch } from "@tanstack/react-router"

export default function AuthLayer(props: any) {
	const authorized = useAuthorized()
	const dispatch = useDispatch()
	const navigate = useNavigate()

	const { email, token } = useSearch({
		from: "/interactive-content-designer",
		select: (search: any) => {
			return {
				email: search.email,
				token: search.token,
			}
		},
	})

	useEffect(() => {
		authorize(email, token)
	}, [])

	async function authorize(email, token) {
		if (!authorized) {
			try {
				const challengeResponse = await handleConfirmSignIn(email, token)
				if (challengeResponse) {
					dispatch(
						accountUpdated({
							authorized: true,
							account: email,
						}),
					)
				}
			} catch (error) {
				switch (error.name) {
					case "UserAlreadyAuthenticatedException":
						dispatch(
							accountUpdated({
								authorized: true,
								account: email,
							}),
						)

						break
					default:
						navigate({ to: "/" })
						dispatch(
							accountUpdated({
								authorized: false,
								account: null,
							}),
						)
				}
			}
		} else {
			dispatch(
				accountUpdated({
					authorized: true,
					account: email,
				}),
			)
		}
	}

	return authorized && props.children
}
