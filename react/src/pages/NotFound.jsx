import { useNavigate } from "react-router-dom";

function NotFound() {
    const imgUrl = "https://images8.alphacoders.com/436/thumb-1920-436694.jpg";
    const navigate = useNavigate();

    const handleGoHome = () => {
        navigate("/");
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-stone-200 py-10 sm:py-20">
            <div className="relative max-w-4xl w-full h-3/4 shadow-2xl mx-5">
                <div
                    className="absolute inset-0 rounded-2xl"
                    style={{
                        backgroundImage: `url(${imgUrl})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        filter: "blur(3px) grayscale(80%)",
                    }}
                ></div>

                <div className="relative rounded-2xl p-6 sm:p-10 flex flex-col justify-center items-center opacity-90">
                    <h2 className="text-6xl sm:text-9xl mt-10 sm:mt-32 text-stone-100 font-semibold mb-2 text-center">
                        404
                    </h2>
                    <p className="text-2xl sm:text-3xl text-stone-100 mb-6 text-center">
                        Page not found
                    </p>
                    <div className="flex justify-center mt-10 sm:mt-20">
                        <button
                            onClick={handleGoHome}
                            className="border-2 border-neutral text-neutral hover:bg-neutral hover:text-stone-800 py-2 px-4 rounded-full transition duration-300 ease-in-out"
                        >
                            Go Back Home
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default NotFound;
