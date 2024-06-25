import React, { useEffect, useState } from 'react'
import Button from '../button/Button'
import Grid from '../grid/Grid'
import { useDispatch } from "react-redux"
import Tile from '../tile/Tile'
import { loadPage } from '../../reducers/pageReducer'

export default function CarouselTile(props: any) {

    const [color, setColor] = useState('')
    const [cta, setCta] = useState(props.cta)
    const dispatch = useDispatch()

    useEffect(() => {
        setColor(props.color)
    }, [props.color])

    const load = () => {
        dispatch(loadPage(props.pageId))
    }

    return (
        <Tile color={color}>
            <div className='font-bold text-2xl'>{props.title}</div>

            {props.description && <div className='pt-4 text-xl'>{props.description}</div>}
            {props.price && <div className='pt-4 font-bold text-4xl'><sup className='text-md'>$</sup> {props.price}</div>}
            <div className='pt-4'>

                <Grid numberOfCols={1}>
                    <Button text={cta} color="primary" action={load} />
                </Grid>
            </div>

        </Tile>
    )

}