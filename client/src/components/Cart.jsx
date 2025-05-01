const Cart = () => {
    return (
        <div>
            <div className="flex flex-col gap-2 p-5">
                <h1 className="font-playwrite text-3xl cursor-pointer">bookstore</h1>
                <p className="text-sm text-gray-500">Your cart is empty.</p>
            </div>
            <div className="flex flex-col gap-4 mt-4">
                <p className="text-center text-gray-500">Add books to your cart to see them here.</p>
            </div>
            <div className="flex flex-col gap-4 mt-4">
                <button className="bg-spearmint px-4 py-2">Continue Shopping</button>
                <button className="bg-hotpink px-4 py-2">Checkout</button>
            </div>
        </div>
    )
}

export default Cart