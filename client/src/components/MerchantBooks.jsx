import { useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import UserDataContext from '../userDataContext'

const MerchantBooks = () => {
    const [userData] = useContext(UserDataContext)
    if (!userData) return null
    const navigate = useNavigate()
    const handleClick = () => {
        navigate('/merchant/publish')
    }
    return (
        <div>
            <div className="flex flex-col gap-2 p-5">
                <h1 onClick={() => navigate('/')} className="font-playwrite text-3xl cursor-pointer">bookstore</h1>
                <p className="text-sm text-gray-500">Manage your books here.</p>
            </div>
            <div className="flex flex-col gap-4 mt-4">
                <button onClick={() => navigate('/merchant/publish')} className="bg-spearmint px-4 py-2">Add New Book</button>
                <div className="overflow-x-auto">
                    <table className="min-w-full border border-rosewater">
                        <thead>
                            <tr>
                                <th className="border-b border-rosewater px-4 py-2">Title</th>
                                  <th className="border-b border-rosewater px-4 py-2 hidden sm:table-cell">Author</th>
                                <th className="border-b border-rosewater px-4 py-2 hidden sm:table-cell">Price</th>
                                <th className="border-b border-rosewater px-4 py-2">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="hover:bg-hotpink hover:text-white">
                            {userData.books.map((book) => (
                                <tr key={book.id} className='*:w-1/4'>
                                    {console.log(book)}
                                    <td className="border-b border-rosewater px-4 py-2 text-center">{book.title}</td>
                                    <td className="border-b border-rosewater px-4 py-2 text-center hidden sm:table-cell">{book.author}</td>
                                    <td className="border-b border-rosewater px-4 py-2 text-center hidden sm:table-cell">${book.price || 0}</td>
                                    <td className="border-b border-rosewater px-4 py-2 text-center">
                                        <button className="bg-hotpink text-white px-2 py-1">Edit</button>
                                        <button className="bg-red-500 text-white px-2 py-1 ml-2">Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default MerchantBooks