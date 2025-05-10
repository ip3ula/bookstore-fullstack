import React from 'react';

const About = () => {
    return (
        <div className="p-5 font-sans  md:flex md:gap-10 min-h-[calc(100vh-4rem)]">
            <div className="mb-8  bg-hotpink p-5 rounded-lg shadow-lg shadow-rosewater text-white md:p-10">
                <h1 className="text-3xl font-bold mb-4">About Us</h1>
                <p className="mb-4">
                    Welcome to our Bookstore! We are dedicated to bringing you a diverse collection of books that cater to readers of all ages, interests, and backgrounds. 
                    Whether you're a fan of fiction, non-fiction, mystery, romance, or self-help, we have something for everyone.
                </p>
                <p className="mb-4 ">
                    Our mission is to inspire a love for reading and lifelong learning in our community. We believe that books have the power to transform lives, 
                    spark creativity, and connect people across cultures and generations.
                </p>
                <p className="mb-4">
                    Thank you for choosing our bookstore as your go-to destination for all things literary. We look forward to serving you and being a part of your reading journey.
                </p>
            </div>

            <div className='bg-hotpink p-5 rounded-lg shadow-lg shadow-rosewater text-white  md:p-10'>
                <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
                <p className="mb-4">
                    Have questions or need assistance? Feel free to reach out to us through any of the following channels:
                </p>
                <p className="mb-2">
                    <strong>Email:</strong> contact@bookstore.com
                </p>
                <p className="mb-2">
                    <strong>Phone:</strong> +1 (555) 123-4567
                </p>
                <p className="mb-2">
                    <strong>Address:</strong> 123 Book Street, Novel City, Fictionland
                </p>
                <p>
                    We are here to help and ensure you have the best experience possible. Happy reading!
                </p>
            </div>
        </div>
    );
};

export default About;