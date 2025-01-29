function Contact() {
    return (
        <div className="flex items-center justify-center bg-gray-100 px-6">
            {/* Main Card */}
            <div
                className="bg-white shadow-lg rounded-2xl flex flex-col mt-10 md:flex-row w-full max-w-[85rem] p-10 md:p-16 overflow-hidden"
                style={{
                    backgroundImage: "url('/LoginBackground.png')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
            >
                {/* Left Side - Contact Information */}
                <div className="bg-blue-50/0 p-10 md:p-12 flex-1">
                    <h1 className="text-4xl font-bold text-gray-800 mb-6">
                        Contact Us
                    </h1>
                    <p className="text-gray-600 mb-6 text-lg leading-relaxed">
                        Email, call, or complete the form to reach out to us.
                        We’re here to help with any questions or inquiries.
                    </p>
                    <p className="text-gray-700 font-medium text-lg">
                        <span className="font-bold">Email: </span>
                        info@example.com
                    </p>
                    <p className="text-gray-700 font-medium text-lg">
                        <span className="font-bold">Phone: </span>
                        +1 234-567-890
                    </p>
                    <a
                        href="#"
                        className="text-blue-500 hover:underline mt-4 inline-block text-lg"
                    >
                        Customer Support
                    </a>
                </div>

                {/* Right Side - Contact Form */}
                <div className="p-10 md:p-12 flex-1">
                    <h2 className="text-3xl font-bold text-gray-800 mb-5 ml-3">
                        Get in Touch
                    </h2>
                    <form className="space-y-6">
                        {/* Name Input */}
                        <div className="flex gap-6">
                            <input
                                type="text"
                                placeholder="First name"
                                className="w-1/2 border border-gray-300 rounded-full p-4 focus:ring-2 focus:ring-blue-500 focus:outline-none text-lg"
                            />
                            <input
                                type="text"
                                placeholder="Last name"
                                className="w-1/2 border border-gray-300 rounded-full p-4 focus:ring-2 focus:ring-blue-500 focus:outline-none text-lg"
                            />
                        </div>
                        {/* Email Input */}
                        <div>
                            <input
                                type="email"
                                placeholder="Your email"
                                className="w-full border border-gray-300 rounded-full p-4 focus:ring-2 focus:ring-blue-500 focus:outline-none text-lg"
                            />
                        </div>
                        {/* Message Input */}
                        <div>
                            <textarea
                                placeholder="Your message"
                                rows="6"
                                className="w-full border border-gray-300 rounded-lg p-4 focus:ring-2 focus:ring-blue-500 focus:outline-none text-lg"
                            ></textarea>
                        </div>
                        {/* Submit Button */}
                        <div>
                            <button
                                type="submit"
                                className="w-full bg-black text-white py-4 rounded-full hover:bg-blue-600 transition text-lg font-semibold"
                            >
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Contact;
