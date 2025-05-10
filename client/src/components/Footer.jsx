import { Link } from "react-router-dom"
const Footer = () => {
    return (
        <footer className="bg-spearmint text-stone-800 p-4  mt-10">
            <div className="container mx-auto text-center">
                <p className="text-lg">© {new Date().getFullYear()
                } Bookstore. All rights reserved.</p>
                <div className="flex justify-center space-x-4 mt-2">
                    <Link to="/about" className="text-stone-600 hover:text-hotpink">About</Link>
                    <Link to="/terms" className="text-stone-600 hover:text-hotpink">Terms & privacy</Link>
                </div>
            </div>
        </footer>
    )
}

export default Footer