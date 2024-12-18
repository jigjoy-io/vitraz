import { createLazyFileRoute } from "@tanstack/react-router"
import Onboarding from "../pages/onboarding/onboarding"

export const Route = createLazyFileRoute("/onboarding" as never)({
	component: Onboarding,
})
