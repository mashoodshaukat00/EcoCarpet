import { useLocation, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import ColorfulRug from '../../assets/images/colorful-rug.jpg';
import Carousel from '../Carousel/Carousel';

const Home = () => {
    const location = useLocation();
    const [showLogoutMsg, setShowLogoutMsg] = useState(!!location.state?.loggedOut);

    useEffect(() => {
        if (location.state?.loggedOut) {
            setShowLogoutMsg(true);
            const timer = setTimeout(() => setShowLogoutMsg(false), 1500);
            return () => clearTimeout(timer);
        }
    }, [location.state?.loggedOut]);

    return (
        <div>
            {showLogoutMsg && (
                <div className="max-w-xl mx-auto mt-6 mb-4 p-4 bg-emerald-100 border border-emerald-400 text-emerald-800 rounded text-center font-semibold shadow transition-opacity duration-500">
                    You have been logged out.
                </div>
            )}
            <div
                className="relative w-full min-h-[70vh] flex justify-center items-center overflow-hidden rounded-2xl shadow-2xl mt-8 mb-12"
                style={{
                    backgroundImage: `url(${ColorfulRug})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            >
                <div className="absolute top-0 left-0 w-full h-full bg-black opacity-60 z-0 rounded-2xl"></div>
                <div className="relative z-10 text-center text-white px-6 py-12">
                    <h1 className="text-4xl md:text-6xl font-extrabold italic mb-6 drop-shadow-lg tracking-tight">
                        Welcome to <span className="text-emerald-300">EcoCarpet</span>
                    </h1>
                    <p className="mt-8 font-semibold text-l md:text-l mb-16 drop-shadow">
                        Our mission is to make sustainable living easy and stylish for everyone. With EcoCarpet, you can enjoy a fresh look for your home as often as you like, while reducing waste and supporting a greener planet. 
                        Choose from a wide range of beautiful, durable carpets and experience hassle-free returns, flexible plans, and exceptional customer care. 
                        Join our community and help us create a cleaner, more sustainable future—one carpet at a time.
                    </p>
                    <Link
                        to="/products"
                        className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-4 px-10 rounded-full text-lg shadow-lg transition focus:outline-none focus:shadow-outline"
                    >
                        Shop Now
                    </Link>
                </div>
            </div>
            <div className="py-12 bg-gray-100 max-w-7xl mx-auto mb-10">
                <h1 className="text-3xl font-extrabold text-emerald-800 text-center mb-8 tracking-tight">Our Rugs</h1>
                <Carousel />
            </div>
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-10 bg-white rounded-2xl shadow-xl border border-emerald-100 p-8 mb-12">
                <div className="flex-1 flex justify-center items-center mb-8 md:mb-0">
                    <img
                        src="/public/images/rug_collection.jpg"
                        alt="EcoCarpet Sample"
                        className="w-full max-w-md h-72 object-cover rounded-xl border-2 border-emerald-200 shadow"
                    />
                </div>
                <div className="flex-1 flex flex-col justify-center">
                    <h2 className="text-2xl font-bold text-emerald-800 mb-4">Why Choose Our Carpets?</h2>
                    <ul className="list-disc pl-6 text-gray-700 space-y-2 text-lg">
                        <li>Made from sustainable and eco-friendly materials</li>
                        <li>Durable, stylish, and easy to maintain</li>
                        <li>Available in a variety of colors and sizes to fit any home</li>
                        <li>Flexible subscription plans for hassle-free replacements</li>
                        <li>Perfect for families, pets, and high-traffic areas</li>
                    </ul>
                    <p className="mt-6 text-gray-600">
                        Discover the perfect blend of comfort, style, and sustainability with EcoCarpet. Our carpets are designed to enhance your living space while caring for the planet.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Home;