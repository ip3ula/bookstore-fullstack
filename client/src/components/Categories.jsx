import { useState, useContext, useMemo, useEffect } from 'react';
import CategoryContext from '../CategoryContext';
import Book from './Book';

const SidebarButton = ({ text, isActive, onClick }) => (
  <button
    onClick={onClick}
    className={`w-full text-left px-4 py-2 rounded-md font-medium transition
      ${isActive
        ? 'bg-hotpink text-white shadow'
        : 'text-gray-700 hover:bg-rose-100'
      }`}
  >
    {text}
  </button>
);

const MobileButton = ({ text, isActive, onClick }) => (
  <button
    onClick={onClick}
    className={`whitespace-nowrap h-10 px-4 rounded-md transition-colors
      ${isActive ? 'bg-spearmint text-stone-800' : 'bg-hotpink text-white'}`}
  >
    {text}
  </button>
);

const Categories = () => {
  const [books, booksDispatch] = useContext(CategoryContext);
  const [activeCategory, setActiveCategory] = useState('All');

  useEffect(() => {
    booksDispatch({
      type: 'CATEGORY',
      payload: activeCategory.toLowerCase().replace(" ", "")
    });
  }, [activeCategory, booksDispatch]);

  const getObjectIdTimestamp = (id) => parseInt(id.substring(0, 8), 16) * 1000;

  const mostPopular = useMemo(() => [...books].sort((a, b) => b.views - a.views), [books]);
  const newArrival = useMemo(() => [...books].sort((a, b) => getObjectIdTimestamp(b.id) - getObjectIdTimestamp(a.id)), [books]);
  const topRated = useMemo(() => [...books].sort((a, b) => b.ratingValue - a.ratingValue), [books]);
  const editorsPick = useMemo(() => books.filter(book => book.editors), [books]);
  const onSale = useMemo(() => books.filter(book => book.price < book.originalPrice), [books]);
  const for1Dollar = useMemo(() => books.filter(book => book.price === 1), [books]);
  const trendingNow = useMemo(() => [...books].sort((a, b) => b.weeklyView - a.weeklyView), [books]);
  const classicPicks = useMemo(() => books.filter(book => book.genres.some(g => g.toLowerCase() === 'classic')), [books]);
  const shortReads = useMemo(() => books.filter(book => book.pageCount <= 200), [books]);
  const awardWinners = useMemo(() => books.filter(book => book.awards), [books]);

  const categories = [
    "All", "Fiction", "Nonfiction", "Romance", "Mystery", "Fantasy", "Thriller",
    "Historical", "Young Adult", "Children", "Biography", "Self-Help", "Literature",
    "Humor", "Science", "History", "Poetry"
  ];

  const subcategories = [
    ["Most Popular", mostPopular],
    ["New Arrivals", newArrival],
    ["Top Rated", topRated],
    ["Editor's Picks", editorsPick],
    ["On Sale", onSale],
    ["For 1 Dollar", for1Dollar],
    ["Trending Now", trendingNow],
    ["Classic Picks", classicPicks],
    ["Short Reads", shortReads],
    ["Award Winners", awardWinners]
  ];

  return (
    <div className="lg:flex lg:gap-10 max-w-7xl mx-auto px-4 py-10">
      
      {/* Mobile Categories Bar */}
      <div className="w-full h-15 flex items-center gap-2 overflow-x-auto sticky top-15 bg-cream z-10 px-5 sm:h-20 lg:hidden">
        {categories.map(category => (
          <MobileButton
            key={category}
            text={category}
            isActive={activeCategory === category}
            onClick={() => setActiveCategory(category)}
          />
        ))}
      </div>

      {/* Sidebar for Large Screens */}
      <aside className="hidden lg:block min-w-[220px] max-w-70">
        <div className="bg-white border border-rose-100 rounded-xl shadow-sm p-4 sticky top-24">
          <h3 className="font-semibold text-lg mb-3 text-hotpink">Browse Categories</h3>
          <div className="space-y-2">
            {categories.map(category => (
              <SidebarButton
                key={category}
                text={category}
                isActive={activeCategory === category}
                onClick={() => setActiveCategory(category)}
              />
            ))}
          </div>
        </div>
      </aside>

      {/* Book Collections */}
      <main className="flex-1">
        {subcategories.map(([name, data]) => (
          <div className="border-b border-rosewater last:border-none px-3 py-10" key={name}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-bold text-2xl text-stone-800">{name}</h2>
              <button className="text-hotpink text-sm hover:underline">View All</button>
            </div>

            {/* Mobile layout */}
            <div className="flex gap-3 sm:gap-5 overflow-x-auto lg:hidden pb-4">
              {data.slice(0, 10).map(book => (
                <Book key={book.id} cover={book.cover} />
              ))}
            </div>

            {/* Large screens: cleaner grid layout */}
            <div className="hidden lg:grid lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-6">
              {data.slice(0, 12).map(book => (
                <Book key={book.id} cover={book.cover} />
              ))}
            </div>
          </div>
        ))}
      </main>
    </div>
  );
};

export default Categories;
