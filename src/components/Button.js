
const Button = ({text,bg}) => {
    return (
        <button className={`text-3xl font-bold ${bg}-400 m-5 p-3 hover:${bg}-900 transition delay-100`}>
            {text}
        </button>
    )
}

export default Button
