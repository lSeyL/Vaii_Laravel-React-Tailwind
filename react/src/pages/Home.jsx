import { HiOutlineArrowTopRightOnSquare } from "react-icons/hi2";
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";

function Home() {
    const imgSmallCard =
        "https://img-new.cgtrader.com/items/4188178/a7fe6efed6/dining-set-3d-model-a7fe6efed6.jpg";
    const img1 =
        "https://img-new.cgtrader.com/items/3352727/b66f7a5678/kitchen-interior-3d-model-b66f7a5678.jpg";
    const img2 =
        "https://img-new.cgtrader.com/items/3438891/fe1549450e/living-room-and-kitchen-with-dinning-set-3d-model-low-poly-obj-fbx-blend-fbm.jpg";
    const img3 =
        "https://img-new.cgtrader.com/items/3152241/0d22f82685/livingroom-and-kitchen-interior-scene-3d-model-obj-fbx-blend.jpg";
    const img4 =
        "https://img-new.cgtrader.com/items/2318992/c22735219f/cozy-bedroom-interior-scene-3d-model-max-obj-3ds-fbx-c4d-stl.jpg";

    const [bgUrl, setBgUrl] = useState(img1);
    const [opacity, setOpacity] = useState(1);
    const images = [img1, img2, img3, img4];
    let currentImageIndex = 0;

    const changeBackground = (newBgUrl) => {
        setOpacity(0);
        setTimeout(() => {
            setBgUrl(newBgUrl);
            setOpacity(1);
        }, 1000);
    };

    useEffect(() => {
        const intervalId = setInterval(() => {
            currentImageIndex = (currentImageIndex + 1) % images.length;
            changeBackground(images[currentImageIndex]);
        }, 10000);

        return () => clearInterval(intervalId);
    }, []);

    return (
        <div className="flex flex-col md:flex-row min-h-screen p-5 md:p-5 lg:p-5 xl:p-20 gap-4">
            {/* Left Card */}
            <div className="flex-1 rounded-lg shadow-lg relative md:mr-1">
                {/* Background Image */}
                <div
                    className="absolute inset-0 rounded-lg transition-all duration-1000"
                    style={{
                        backgroundImage: `url(${bgUrl})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        zIndex: -1,
                        filter: "grayscale(10%)",
                        opacity: opacity,
                    }}
                ></div>

                {/* Top Links */}
                <div className="hidden md:hidden lg:flex p-4 relative z-10 mt-10 gap-4 flex-wrap lg:mt-2 xl:mb-4 2xl:mb-32">
                    <button
                        onClick={() => changeBackground(img1)}
                        className="border-2 border-neutral text-neutral hover:bg-neutral hover:text-stone-800 py-2 px-4 rounded-full transition duration-300 ease-in-out backdrop-blur-md"
                    >
                        <span className="font-medium">Scaled</span>
                    </button>
                    <button
                        onClick={() => changeBackground(img2)}
                        className="border-2 border-neutral text-neutral hover:bg-neutral hover:text-stone-800 py-2 px-4 rounded-full transition duration-300 ease-in-out backdrop-blur-md"
                    >
                        <span className="font-medium">Minimalist</span>
                    </button>
                    <button
                        onClick={() => changeBackground(img3)}
                        className="border-2 border-neutral text-neutral hover:bg-neutral hover:text-stone-800 py-2 px-4 rounded-full transition duration-300 ease-in-out backdrop-blur-md"
                    >
                        <span className="font-medium">Renders</span>
                    </button>
                    <button
                        onClick={() => changeBackground(img4)}
                        className="border-2 border-neutral text-neutral hover:bg-neutral hover:text-stone-800 py-2 px-4 rounded-full transition duration-300 ease-in-out backdrop-blur-md"
                    >
                        <span className="font-medium">Furniture</span>
                    </button>
                </div>

                {/* Content Area */}
                <div className="flex-1 flex flex-col justify-end p-3 mb-5 sm:mb-0 md:mb-2 sm:mt-[40rem] md:mt-[28rem] lg:mt-[24rem] relative z-10 xl:mt-[22rem]">
                    <div className="flex flex-col items-start w-full mb-5 sm:mb-0">
                        <h2 className="text-3xl sm:text-4xl md:text-4xl md:mt-5 lg:mt-5 lg:text-5xl font-roboto font-light text-neutral text-left max-w-lg ml-4">
                            Looking for Custom{" "}
                            <span className="font-normal">3D Modeling</span> at
                            Scale?
                        </h2>
                        <p className="text-gray-600 text-base sm:text-xl md:text-xl mt-2 text-left ml-4 text-neutral ">
                            Tell us what you need.
                        </p>
                    </div>
                </div>

                {/* Button Section */}
                <div className="p-4 flex justify-start relative z-10 border-t sm:mt-1">
                    <NavLink
                        to="/products"
                        className="border-2 border-neutral text-neutral hover:bg-neutral py-2 hover:text-stone-800 transition-all duration-300 ease-in-out backdrop-blur-md px-4 rounded-full flex items-center"
                    >
                        <span className="mr-2">View Products</span>
                        <HiOutlineArrowTopRightOnSquare size={26} />
                    </NavLink>
                </div>
            </div>
            {/* Right Card */}
            <div className="flex-1 rounded-lg bg-neutral shadow-lg flex flex-col md:ml-6">
                <div className="p-4">
                    <h2 className="text-3xl sm:text-4xl md:text-6xl font-roboto font-light max-w-xl">
                        Discover the Essence of{" "}
                        <span className="font-normal">Minimalist</span>{" "}
                        Furniture Design & Style
                    </h2>
                </div>
                <div className="flex-1 flex flex-col items-center justify-center p-4">
                    <div className="flex flex-col items-center">
                        <div className="hidden sm:flex md:hidden lg:flex flex-row items-center space-x-4 mb-4 flex-wrap">
                            <NavLink
                                to="/products"
                                className="border-2 border-stone-800 text-stone-800 hover:bg-stone-600 hover:text-white py-2 px-4 rounded-full transition duration-300 ease-in-out backdrop-blur-md"
                            >
                                <span className="font-medium">Exclusive</span>
                            </NavLink>
                            <NavLink
                                to="/products"
                                className="border-2 border-stone-800 text-stone-800 hover:bg-stone-600 hover:text-white py-2 px-4 rounded-full transition duration-300 ease-in-out backdrop-blur-md"
                            >
                                <span className="font-medium">Limited</span>
                            </NavLink>
                            <NavLink
                                to="/products"
                                className="border-2 border-stone-800 text-stone-800 hover:bg-stone-600 hover:text-white py-2 px-4 rounded-full transition duration-300 ease-in-out backdrop-blur-md"
                            >
                                <span className="font-medium">Hot Picks</span>
                            </NavLink>
                            <NavLink
                                to="/products"
                                className="border-2 border-stone-800 text-stone-800 hover:bg-stone-600 hover:text-white py-2 px-4 rounded-full transition duration-300 ease-in-out backdrop-blur-md"
                            >
                                <span className="font-medium">Must-Have</span>
                            </NavLink>
                        </div>
                        <div className="flex flex-col md:flex-row items-center px-6 py-4 bg-white rounded-xl w-full">
                            <div className="flex flex-col items-center text-center md:items-start md:text-left sm:flex-1 space-y-4 mt-5">
                                <h3 className="text-xl sm:text-lg font-semibold">
                                    PureSpace
                                </h3>
                                <p className="text-gray-600">
                                    Sleek, minimalist design for your work.
                                </p>
                                <button className="mt-10 border-2 border-stone-800 text-stone-800 hover:bg-stone-600 hover:text-white bg-neutral py-2 px-2 rounded-full transition duration-300 ease-in-out">
                                    <HiOutlineArrowTopRightOnSquare size={26} />
                                </button>
                            </div>
                            <div className="flex-1 flex justify-center md:justify-end mt-5 mb-4 md:mt-0">
                                <img
                                    src={imgSmallCard}
                                    alt="Models"
                                    className="w-[50rem] h-[12rem]   md:w-48 md:h-48 object-cover rounded-lg"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;
