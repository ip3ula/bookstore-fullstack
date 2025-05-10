import Hero from "../components/Hero"
import Categories from "./Categories"
import Footer from '../components/Footer'

const Home = ({ books }) => {
    return (
        <div>
           
            <Hero />
            {/* <section className="py-16 px-6 bg-rosewater text-center">
          <div className="max-w-6xl mx-auto grid gap-10 sm:grid-cols-3">
            {[
              { title: "10,000+ Titles", desc: "Across every genre, mood, and moment." },
              { title: "Curated Picks", desc: "Hand-selected by passionate readers." },
              { title: "Weekly Updates", desc: "New arrivals and top charts every week." },
            ].map(({ title, desc }, idx) => (
              <div key={idx} className="transition-transform hover:scale-105 duration-300">
                <h3 className="text-2xl font-semibold mb-2">{title}</h3>
                <p className="text-gray-600">{desc}</p>
              </div>
            ))}
          </div>
        </section> */}
            <Categories books={books}/>
            <Footer />
        </div>
    )
}

export default Home