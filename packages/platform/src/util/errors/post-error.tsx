import { ErrorComponent, ErrorComponentProps } from "@tanstack/react-router"
import React from "react"
import { NotFoundError } from "./not-found-error"
import { PageNotFound } from "./page-not-found"

export function PostError({ error }: ErrorComponentProps) {
	if (error instanceof NotFoundError) {
		return <PageNotFound message={error.message} />
	} else {
		return <ErrorComponent error={error} />
	}
}
