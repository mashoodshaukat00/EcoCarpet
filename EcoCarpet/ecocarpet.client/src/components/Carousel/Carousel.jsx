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
        autoplaySpeed: 2000,
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
                    dots:false
                }
            }
        ]
       
    };
    return (
        <div className='w-3/4 m-auto'>
            <div className="mt-20">
                <Slider {...settings}>
                    {carpets.map((carpet) => (
                        <div key={carpet.carpetID} className="bg-white h-[450px] text-black flex flex-col">
                            <div className='h-56 bg-indigo-500 flex justify-center items-center cursor-pointer'>
                                <img src={`/images/${carpet.imgName}.jpg`} alt={carpet.name} onClick={() => navigate(`/products/${carpet.carpetID}`)} className='h-full w-full object-cover'/>
                            </div>
                            <div className="description-container flex flex-col items-center gap-4 h-full">
                              <p className="text-xl font-semibold cursor-pointer" onClick={() => navigate(`/products/${carpet.carpetID}`)}>{carpet.name}</p>
                              <p className="description flex-grow overflow-y-auto text-center max-h-[100px]">{carpet.descriptions}</p>
                                <button onClick={() => navigate(`/products/${carpet.carpetID}`)}
                                    className='bg-indigo-500 cursor-pointer text-white text-lg px-6 py-1 rounded-xl mt-2'>Read More</button>
                            </div>
                        </div>
                    ))}
                </Slider>
            </div>

        </div>
    );
}

export default Carousel;
