import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import '../Carousel/Style.css';
import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";

function Carousel() {
    const [carpets, setCarpets] = useState([]);
    const navigate = useNavigate();
    const apiUrl = import.meta.env.VITE_API_URL;

    useEffect(() => {
        const fetchCarpets = async () => {
            try {
                const response = await fetch(`${apiUrl}/Carpet`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setCarpets(data);
            } catch (err) {
                console.error('Error fetching carpets:', err);
            }
        };
        fetchCarpets();
    }, [apiUrl]);

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2500,
        className: 'Style',
        centerMode: false,
        centerPadding: "60px",
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 780,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    dots: false
                }
            }
        ]
    };

    return (
        <div className="w-full max-w-6xl mx-auto">
            <div className="mt-10">
                <Slider {...settings}>
                    {carpets.map((carpet) => (
                        <div
                            key={carpet.carpetID}
                            className="flex flex-col h-[480px] bg-white rounded-2xl shadow-xl mx-4 overflow-hidden border border-gray-100 transition-transform hover:scale-105 duration-300"
                        >
                            <div
                                className="h-60 bg-gradient-to-br from-emerald-100 to-emerald-200 flex justify-center items-center cursor-pointer overflow-hidden"
                                onClick={() => navigate(`/products/${carpet.carpetID}`)}
                            >
                                <img
                                    src={`/images/${carpet.imgName}.jpg`}
                                    alt={carpet.name}
                                    className="h-full w-full object-cover transition-transform duration-300 hover:scale-110"
                                />
                            </div>
                            <div className="flex flex-col items-center gap-2 flex-1 px-4 py-4">
                                <p
                                    className="text-xl font-bold text-emerald-800 cursor-pointer hover:underline text-center"
                                    onClick={() => navigate(`/products/${carpet.carpetID}`)}
                                >
                                    {carpet.name}
                                </p>
                                <p className="text-gray-600 text-center text-sm flex-grow overflow-y-auto max-h-[70px]">
                                    {carpet.descriptions}
                                </p>
                                <button
                                    onClick={() => navigate(`/products/${carpet.carpetID}`)}
                                    className="bg-emerald-600 hover:bg-emerald-700 text-white text-base px-6 py-2 rounded-lg mt-2 font-semibold shadow transition"
                                >
                                    View Carpet
                                </button>
                            </div>
                        </div>
                    ))}
                </Slider>
            </div>
        </div>
    );
}

export default Carousel;
