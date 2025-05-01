import { useNavigate } from "react-router-dom"

const About = () => {
    const navigate = useNavigate()
    return (
        <div>
            <div className="flex flex-col items-center p-5 bg-spearmint w-screen justify-center gap-1">

<h1 onClick={() => navigate('/')} className="font-playwrite text-3xl m-5 cursor-pointer">book store</h1>
<h2 className="font-bold font-mono">About</h2>
</div>
            <p className="p-5 sm:p-10">
            Welcome to bookStore

At bookStore, we believe that every story deserves to be discovered and shared. We specialize in buying physical copies of all types of books — from timeless classics and thrilling mysteries to inspiring biographies and rare finds.

Whether you’re looking to give your beloved books a new home or discover your next great read, we’re here to make the experience easy, trustworthy, and enjoyable. Our passion for books drives everything we do, and we are proud to connect readers with stories that spark imagination, learning, and growth.

Thank you for being part of our community — where every book has a story, and every story matters.


            </p>
        </div>
    )
}

export default About