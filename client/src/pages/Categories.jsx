import { useState } from 'react';
import { useBooks } from '../hooks/useBooks';
import Book from '../components/Book';
import Loading from '../components/loading';

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
    const [activeCategory, setActiveCategory] = useState('All');
    const { mostDownloads, mostPopular, isLoading, isError } = useBooks(activeCategory.toLowerCase());

    if (isLoading) return <Loading />;
    if (isError) return null;

    const categories = [
        "All", "Fiction", "Nonfiction", "Romance", "Mystery", "Fantasy", "Thriller",
        "Historical", "Young Adult", "Children", "Biography", "Self-Help", "Literature",
        "Humor", "Science", "History", "Poetry"
    ];

    const subcategories = [
        ["Most Downloaded", mostDownloads],
        ["Most Popular", mostPopular],
        // Add more categories as needed
    ];

    return (
        <div>
            <div className="w-full h-16 flex items-center gap-2 overflow-x-auto sticky top-15 bg-cream z-10 px-5 sm:h-20">
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
                    <div className="border-b border-roseWater last:border-none pl-3" key={name}>
                        <h2 className="font-bold text-xl py-5">{name}</h2>
                        <div className="flex gap-3 pl-3 overflow-x-auto">
                            {data.map(book => (
                                <Book key={book.id} book={book} />
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Categories;
