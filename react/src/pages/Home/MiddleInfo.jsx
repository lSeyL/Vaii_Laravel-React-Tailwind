import React from "react";

function MiddleInfo() {
  return (
    <div className="flex flex-col lg:flex-row items-center justify-items-center bg-white shadow-lg rounded-2xl p-8 lg:p-12 w-full mx-auto max-w-7xl">
      <div className="w-full lg:w-1/2 text-center lg:text-left mb-8 lg:mb-0">
        <h1 className="text-2xl font-bold text-gray-900">
          Sell your 3D Models
        </h1>
        <h2 className="text-lg text-gray-700 mt-2">Find Freelance Projects</h2>
        <p className="text-sm text-gray-600 mt-4 mr-0 lg:mr-20">
          Turn your creativity into income! Whether you're a skilled 3D artist
          looking to sell your models or a freelancer searching for exciting
          projects, our platform connects you with the right opportunities.
        </p>
        <button className="home-button-black mt-4">Get Started</button>
      </div>

      <div className="w-1/3 sm:w-2/3 lg:w-1/2 grid grid-cols-2 lg:grid-cols-4 gap-4 justify-center items-center">
        <img
          src="https://assets.cgtrader.com/assets/home/cgdream_1-fe13acaeac020f047728f93335c2c7dd480ac71cd2290f2ea54eeb17687ba061.webp"
          alt="img1"
          className="w-full h-auto rounded-lg object-cover"
        />
        <img
          src="https://assets.cgtrader.com/assets/home/cgdream_2-4d57e8540f2c219b09dd01e1df251c3243467216e16361b291a428be910902ee.webp"
          alt="img2"
          className="w-full h-auto rounded-lg object-cover"
        />
        <img
          src="https://assets.cgtrader.com/assets/home/cgdream_3-3e57187c109c562d947393c1ebe378ee12a8c28100554a3976e19177447f6510.webp"
          alt="img3"
          className="w-full h-auto rounded-lg object-cover"
        />
        <img
          src="https://assets.cgtrader.com/assets/home/cgdream_4-bf83cdbf6233a35281a589a47baf91d07a0e7bdf7eb4d1d1a0ca43da6f700aae.webp"
          alt="img4"
          className="w-full h-auto rounded-lg object-cover"
        />
      </div>
    </div>
  );
}

export default MiddleInfo;
