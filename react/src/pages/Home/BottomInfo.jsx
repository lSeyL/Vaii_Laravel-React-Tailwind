import { Link } from "react-router-dom";

function BottomInfo() {
  const models = [
    {
      image:
        "https://assets.cgtrader.com/assets/home/cgtrader-3d-models-2d47bff1239f31db7bc2b3af290b6a90ed19937ae19c6cf57f4e7645a9701c94.webp",
      title: "3D Models",
      description: "Explore high-quality 3D models for your projects.",
      link: "/products",
    },
    {
      image:
        "https://assets.cgtrader.com/assets/home/cgtrader-low-poly-pbr-3d-models-b695aaf459d727b43661b321652091161c86aacf9f6be5e0ecd603e6bdf269cf.webp",
      title: "Game Assets",
      description: "Find ready-to-use assets for game development.",
      link: "/products",
    },
    {
      image:
        "https://assets.cgtrader.com/assets/home/cgtrader-3d-printing-models-2ed40cd6599e95994815cce32454887f03f1d34e27e3233d9ebaaa6dd864b056.webp",
      title: "Print-Ready Models",
      description: "Download STL files for 3D printing.",
      link: "/products",
    },
  ];

  return (
    <div className="flex flex-col lg:flex-row items-center justify-items-center mt-10 bg-white shadow-lg rounded-2xl p-8 lg:p-12 w-full mx-auto max-w-7xl">
      <div className="container mx-auto p-6 text-center">
        <h1 className="text-3xl font-bold mb-6">3D Model Marketplace</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {models.map((model, index) => (
            <div key={index} className="border rounded-lg shadow-lg p-4">
              <img
                src={model.image}
                alt={model.title}
                className="w-full h-auto mb-4 rounded-md"
              />
              <h1 className="text-xl font-semibold mb-2">{model.title}</h1>
              <p className="text-gray-600 mb-2">{model.description}</p>
              <Link
                to={model.link}
                className="text-blue-500 text-sm underline hover:text-blue-600"
              >
                View Products
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default BottomInfo;
