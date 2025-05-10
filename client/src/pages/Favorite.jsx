import { useNavigate } from "react-router-dom"
import { useState } from "react"
import Book from "../components/Book"
import { useFavorite } from "../hooks/useFavorite"
const Favorite = () => {
    const [search, setSearch] = useState(null)
    const navigate = useNavigate()
    const { favorites: state } = useFavorite()
    if (!state) return null; 

    const filtered = search 
    ? state.filter(book => 
        search && book.title.toLowerCase().includes(search.toLowerCase())
    )
    : state
    


    return (
        <div className=" h-screen w-screen overflow-y-auto flex flex-col items-center">
            <div className="flex flex-col items-center p-5 bg-spearmint w-screen justify-center gap-1">

            <h1 onClick={() => navigate('/')} className="font-playwrite text-3xl m-5 cursor-pointer">book store</h1>
            <h2 className="font-bold font-mono">Favorite</h2>
            <div>
                
            </div>
            <input value={search} onChange={(e) => setSearch(e.target.value)} type="text" className="border-2 rounded-4xl p-2 px-5 border-hotpink focus:outline-0 text-[10px] font-mono w-2/3 max-w-100" placeholder="Search favorite"/>
            </div>
            <div className="m-5  gap-4 justify-center px-5 relative h-50 w-full flex flex-wrap">
                {filtered.map(book => <Book key={book.id} id={book.id} book={book} />)}
            </div>
        </div>
    )
}

export default Favorite