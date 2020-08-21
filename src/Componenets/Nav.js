import React from 'react'

const Nav = props => {
    if (!props.sign) return <div></div>
    if (['A','E','I','O','U','Y'].includes(props.sign[0])) return <div><h3>An {props.sign} I see...</h3></div>
    return (
        <div>
            <h3>A {props.sign} I see...</h3>
        </div>
    )
}

export default Nav