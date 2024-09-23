import React from "react"
import Button from "../button/Button"
import Grid from "../grid/Grid"
import { useNavigate } from '@tanstack/react-router'


export default function Cta() {

    const navigate = useNavigate()

    const redirect = () => {
        navigate({ to: 'https://jigjoy.io' })
    }

    return <div className="pb-4 flex justify-end">
        <Grid numberOfCols={1}>
            <Button text="Create your store" action={redirect} />
        </Grid>
    </div>
}