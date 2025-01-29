import React, { useEffect, useState } from "react";
function About() {
    const [team, setTeam] = useState([]);

    // Fetch random user data
    useEffect(() => {
        const fetchTeam = async () => {
            try {
                const response = await fetch(
                    "https://randomuser.me/api/?results=5"
                );
                const data = await response.json();
                setTeam(
                    data.results.map((user) => ({
                        name: `${user.name.first} ${user.name.last}`,
                        role: "Team Member",
                        email: user.email,
                        picture: user.picture.large,
                    }))
                );
            } catch (error) {
                console.error("Failed to fetch team members:", error);
            }
        };

        fetchTeam();
    }, []);

    return (
        <div className="flex flex-col items-center my-8 px-4">
            <h1 className="text-4xl font-bold mb-8 text-gray-800">About Us</h1>
            <p className="text-lg text-gray-600 text-center max-w-2xl mb-8">
                Welcome to our team page! We are a group of passionate
                individuals working together to bring you the best experiences.
                Our mission is to combine creativity, expertise, and dedication
                to make a positive impact.
            </p>
            <div className="flex flex-wrap justify-center gap-8 max-w-screen-lg">
                {team.length > 0 ? (
                    team.map((member, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-center w-60"
                        >
                            <img
                                src={member.picture}
                                alt={member.name}
                                className="w-24 h-24 rounded-full mb-4"
                            />
                            <h2 className="text-lg font-semibold text-gray-800">
                                {member.name}
                            </h2>
                            <p className="text-sm text-gray-600">
                                {member.role}
                            </p>
                            <p className="text-sm text-gray-500 mt-2">
                                {member.email}
                            </p>
                        </div>
                    ))
                ) : (
                    <p>Loading team members...</p>
                )}
            </div>
            {/* About Products Section */}
            <div className="mt-16 max-w-3xl text-center">
                <h2 className="text-3xl font-bold mb-4 text-gray-800">
                    Crafting High-Quality 3D Products
                </h2>
                <p className="text-lg text-gray-600 mb-8">
                    At our company, we take pride in creating stunning and
                    professional 3D products that captivate and inspire. Our
                    team of experts works diligently to ensure each product is
                    meticulously crafted with attention to detail and precision.
                    From concept to creation, we deliver 3D models that meet the
                    highest standards of quality and functionality. Whether it's
                    for visualization, design, or development, our products are
                    tailored to exceed your expectations.
                </p>
            </div>

            {/* Sponsors Section */}
            <div className="mt-12 w-full flex flex-wrap justify-center items-center gap-8">
                <img
                    src="/sponsor/blender.png"
                    alt="Sponsor 1"
                    className="h-12 object-contain"
                />
                <img
                    src="/sponsor/blender.png"
                    alt="Sponsor 2"
                    className="h-12 object-contain"
                />
                <img
                    src="/sponsor/blender.png"
                    alt="Sponsor 3"
                    className="h-12 object-contain"
                />
                <img
                    src="/sponsor/blender.png"
                    alt="Sponsor 4"
                    className="h-12 object-contain"
                />
                <img
                    src="/sponsor/blender.png"
                    alt="Sponsor 5"
                    className="h-12 object-contain"
                />
            </div>
        </div>
    );
}

export default About;
