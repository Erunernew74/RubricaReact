import React from 'react'

const Output = ({ data }) => {
    return (
        <div>
            <h1 style={{textAlign:'center'}}>{data.msg}</h1>
        </div>
    )
}

export default Output
