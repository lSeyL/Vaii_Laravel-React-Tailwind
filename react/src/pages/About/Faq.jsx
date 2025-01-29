import React, { useState } from "react";
import { HiChevronDown, HiChevronUp } from "react-icons/hi";
function Faq() {
    const [openQuestion, setOpenQuestion] = useState(null);

    const toggleQuestion = (index) => {
        setOpenQuestion(openQuestion === index ? null : index);
    };
    const faqData = [
        {
            question: "Can I use these assets commercially?",
            answer: "Yes. All our assets are released under the CC0 license, meaning you can use them for absolutely any purpose, including commercial work.",
        },
        {
            question: "Can I request a custom 3D product?",
            answer: "Absolutely! We specialize in creating custom 3D products tailored to your needs. Reach out to us with your requirements, and we'll make it happen.",
        },
        {
            question: "What payment methods do you accept?",
            answer: "We accept all major credit cards, PayPal, and bank transfers for your convenience.",
        },
        {
            question: "How can I contact customer support?",
            answer: "You can reach our customer support team via email at support@example.com or through the live chat feature on our website.",
        },
        {
            question: "Can I include these assets in a product I sell?",
            answer: "Yes. The only thing you can't do is claim to be the original author or re-license them..",
        },
        {
            question: "Do you do commissions?",
            answer: "Poly Haven does not itself do commissions, but our artists may be happy to work with you. Please get in touch and we can point you in the right direction.Often we offer discounts if you allow us to publish your assets on Poly Haven too.",
        },
    ];

    return (
        <div className="flex flex-col items-center my-8 px-4">
            {/* Title */}
            <h1 className="text-4xl font-bold mb-6 text-gray-800">FAQs</h1>
            <p className="text-lg text-gray-600 text-center max-w-2xl mb-8">
                Got questions? We’ve got answers! Here are some of the most
                frequently asked questions about our products and services.
            </p>

            {/* FAQ Items */}
            <div className="w-full max-w-3xl">
                {faqData.map((faq, index) => {
                    const isOpen = openQuestion === index;
                    return (
                        <div
                            key={index}
                            className="border-b border-gray-200 py-4 overflow-hidden"
                        >
                            <button
                                className="flex justify-between items-center w-full text-left text-gray-800 text-lg font-medium"
                                onClick={() => toggleQuestion(index)}
                            >
                                {faq.question}
                                {isOpen ? (
                                    <HiChevronUp className="w-6 h-6 text-gray-600" />
                                ) : (
                                    <HiChevronDown className="w-6 h-6 text-gray-600" />
                                )}
                            </button>
                            <div
                                className={`transition-all duration-300 ${
                                    isOpen
                                        ? "max-h-screen opacity-100"
                                        : "max-h-0 opacity-0"
                                }`}
                                style={{ overflow: "hidden" }}
                            >
                                <p className="text-gray-600 mt-3">
                                    {faq.answer}
                                </p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default Faq;
