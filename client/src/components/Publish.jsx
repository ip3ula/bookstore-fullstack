import { useNavigate } from 'react-router-dom'
const Publish = () => {
    const navigate = useNavigate();
    return (
        <div>
            <div className="flex flex-col gap-2 p-5">
                <h1 onClick={() => navigate('/')} className="font-playwrite text-3xl cursor-pointer">bookstore</h1>
                <p className="text-sm text-gray-500">Publish your book here.</p>
            </div>
            <div className="flex flex-col gap-4 mt-4">
                <form className="flex flex-col gap-4 p-5">
                    <input type="text" placeholder="Title" className="border border-gray-300 p-2" />
                    <input type="text" placeholder="Author" className="border border-gray-300 p-2" />
                    <input type="text" placeholder="Genre" className="border border-gray-300 p-2" />
                    <input type="text" placeholder="Publisher" className="border border-gray-300 p-2" />
                    <input type="text" placeholder="ISBN" className="border border-gray-300 p-2" />
                    <input type="text" placeholder="Image URL" className="border border-gray-300 p-2" />
                    <input type="number" placeholder='Original Price' className="border border-gray-300 p-2" />
                    <input type="number" placeholder="Price" className="border border-gray-300 p-2" />
                    <textarea placeholder="Description" className="border border-gray-300 p-2"></textarea>
                    <button type="submit" className="bg-spearmint px-4 py-2">Publish</button>
                </form>
            </div>
        </div>
    )
}

export default Publish