import React from 'react';

const Terms = () => {
    return (
        <div className="p-5 font-sans  md:flex md:gap-10 min-h-[calc(100vh-4rem)]">
            <section className="mb-8  bg-hotpink p-5 rounded-lg shadow-lg shadow-rosewater text-white md:p-10">
                <h2 className="text-2xl font-semibold mb-4">Terms of Service</h2>
                <p className="mb-4">
                    Welcome to our bookstore! By using our website, you agree to comply with and be bound by the following terms and conditions. Please review them carefully.
                </p>
                <ul className="list-disc list-inside space-y-2">
                    <li>You must not use our website for any unlawful purposes.</li>
                    <li>All content on this website is for informational purposes only.</li>
                    <li>We reserve the right to update these terms at any time.</li>
                </ul>
            </section>
            <section className="mb-8  bg-hotpink p-5 rounded-lg shadow-lg shadow-rosewater text-white md:p-10">
                <h2 className="text-2xl font-semibold mb-4">Privacy Policy</h2>
                <p className="mb-4">
                    Your privacy is important to us. This policy explains how we collect, use, and protect your information.
                </p>
                <ul className="list-disc list-inside space-y-2">
                    <li>We collect personal information only when you provide it to us voluntarily.</li>
                    <li>We do not share your information with third parties without your consent.</li>
                    <li>We use cookies to improve your experience on our website.</li>
                </ul>
            </section>
        </div>
    );
};

export default Terms;