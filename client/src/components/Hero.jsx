import { useContext } from "react"
import CategoryContext from "../CategoryContext"
const Hero = () => {
    const [books] = useContext(CategoryContext)
    const book = [...books].sort((a, b) => b.weeklyView - a.weeklyView)[0]
    if(!book) return null
    return (
        <div className="flex gap-7 flex-col-reverse sm:flex-row justify-center items-center bg-spearmint w-full h-130 pt-15 px-5 ">
            <div className="flex flex-col items-center gap-5 sm:items-start">
            <h1 className="font-bold text-2xl max-w-100 lg:text-4xl text-center sm:text-start">{book.title} <span className="font-playwrite text-2xl pl-5"> by </span><br/><span className="font-light text-xl w-full">{book.author}</span></h1>
            <button className="bg-hotpink text-white py-1 px-2 rounded w-50 h-10">buy this book for ${book.price}</button>

            </div>
            <img className="w-30 h-45 rotate-3 skew-3" src={book.cover} />

        </div>
    )
}

export default Hero