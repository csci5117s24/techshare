import React from "react"
import { useState } from "react"

const Button = () => {
    const [pressed, setPressed] = useState(false)
    
    return (
        <button onClick={() => setPressed(!pressed)}>{pressed ? 'true' : 'false'}</button>
    )
}

export default Button
