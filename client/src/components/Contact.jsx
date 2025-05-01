import { useNavigate } from "react-router-dom"
const Contact = () => {
    const navigate = useNavigate()
    return (
        <div>
            <div className="flex flex-col items-center p-5 bg-spearmint w-screen justify-center gap-1">

<h1 onClick={() => navigate('/')} className="font-playwrite text-3xl m-5 cursor-pointer">book store</h1>
<h2 className="font-bold font-mono">Contact</h2>
</div>
            <p className="p-5 sm:p-10">
            We'd love to hear from you!
<div className="flex flex-col gap-2 p-2">

<span>📍 Address: [example]</span>
<span>📞 Phone: [example]</span>
<span>📧 Email: [example]</span>
</div>



You can also reach us through our contact form [example] for any questions about selling your books, browsing our collection, or general inquiries.

Follow us on [example] to stay updated on new arrivals, special promotions, and bookstore news!
            </p>
        </div>
    )
}

export default Contact