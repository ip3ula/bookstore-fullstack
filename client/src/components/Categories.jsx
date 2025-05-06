import { useState, useContext, useMemo, useEffect } from 'react';
 import CategoryContext from '../CategoryContext';
 import Book from './Book';
 
 const Button = ({ text, isActive, onClick }) => {
     return (
         <button
             onClick={onClick}
             className={`whitespace-nowrap h-10 px-4 rounded-md transition-colors
                 ${isActive ? 'bg-spearmint text-stone-800' : 'bg-hotpink text-white'}`}
         >
             {text}
         </button>
     );
 };
 
 const Categories = () => {
     const [books, booksDispatch] = useContext(CategoryContext);
 
     const [activeCategory, setActiveCategory] = useState('All')
       
 
     useEffect(() => {
         booksDispatch({
             type: 'CATEGORY',
             payload: activeCategory.toLowerCase().replace(" ", "")
         });
     }, [activeCategory, booksDispatch]);
 
     const mostPopular = useMemo(() => [...books].sort((a, b) => b.views - a.views), [books]);
     const getObjectIdTimestamp = (id) => parseInt(id.substring(0, 8), 16) * 1000;
 
     const newArrival = useMemo(() => {
         return [...books]
             .filter(book => book.id)
             .sort((a, b) => getObjectIdTimestamp(b.id) - getObjectIdTimestamp(a.id));
     }, [books]);
 
     const topRated = useMemo(() => [...books].sort((a, b) => b.ratingValue - a.ratingValue), [books]);
     const editorsPick = useMemo(() => books.filter(book => book.editors), [books]);
     const onSale = useMemo(() => books.filter(book => book.price < book.originalPrice), [books]);
     const for1Dollar = useMemo(() => books.filter(book => book.price === 1), [books]);
     const trendigNow = useMemo(() => [...books].sort((a, b) => b.weeklyView - a.weeklyView), [books]);
     const classicPicks = useMemo(() => books.filter(book => book.genres.some(genre => genre.toLowerCase() === 'classic')), [books]);
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
         ["Trending Now", trendigNow],
         ["Classic Picks", classicPicks],
         ["Short Reads", shortReads],
         ["Award Winners", awardWinners]
     ];
 
     return (
         <div>
             <div className="w-full h-15 flex items-center gap-2 overflow-x-auto  sticky top-15 bg-cream z-10 px-5 sm:h-20">
                 {categories.map(category => (
                     <Button
                         key={category}
                         text={category}
                         isActive={activeCategory === category}
                         onClick={() => setActiveCategory(category)}
                     />
                 ))}
             </div>
             <div>
                 {subcategories.map(([name, data]) => (
                     <div className="border-b border-rosewater last:border-none pl-3" key={name}>
                         <h2 className="font-bold text-xl py-5">{name}</h2>
                         <div className="flex gap-3 sm:gap-7 overflow-x-auto px-2 relative h-50">
                             {data.map(book => (
 <Book id={book.id} key={book.id} cover={book.cover} />
                             ))}
                         </div>
                     </div>
                 ))}
             </div>
         </div>
     );
 };
 
 export default Categories;