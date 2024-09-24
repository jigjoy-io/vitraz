import React from "react"
import * as styles from "./Loader.module.css"

class Loader extends React.Component<any, any> {


    render() {
        return (
            <div className={`${styles.loader}`}></div>
        )
    }

}

export default Loader