import Hero from "./Hero"
import Categories from "./Categories"
import Nav from './Nav'
import Footer from './Footer'

const Home = ({ books }) => {
    return (
        <div>
            <Nav />
            <Hero />
            <Categories books={books}/>
            <Footer />
        </div>
    )
}

export default Home