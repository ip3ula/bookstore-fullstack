import { useNavigate } from 'react-router-dom'
const DetailedBook = ({ book }) => {
    const navigate = useNavigate()
    const { title, author, description, imageUrl, price, originalPrice } = book

    return (
        <div className="flex flex-col gap-4 p-5">
            <h1 onClick={() => navigate('/')} className="font-playwrite text-3xl cursor-pointer">bookstore</h1>
            <div className="flex flex-col gap-4 mt-4">
                <div className="flex flex-col sm:flex-row gap-4">
                    <img src={imageUrl} alt={title} className="w-full sm:w-1/2 h-auto" />
                    <div className="flex flex-col gap-2">
                        <h2 className="text-xl font-bold">{title}</h2>
                        <p className="text-sm text-gray-500">by {author}</p>
                        <p className="text-lg font-semibold">${price || 0}</p>
                        {originalPrice && (
                            <p className="text-sm text-gray-500 line-through">${originalPrice}</p>
                        )}
                        <button className="bg-spearmint px-4 py-2 mt-4">Add to Cart</button>
                    </div>
                </div>
                <div className="mt-4">
                    <h3 className="text-lg font-semibold">Description</h3>
                    <p>{description}</p>
                </div>
            </div>
        </div>
    )
}
export default DetailedBook