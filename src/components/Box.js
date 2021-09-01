import React from 'react'

const Box = ({ children }) => {
    return (
        <div className="p-5 m-1 bg-black">
            {children}
        </div>
    )
}

export default Box
