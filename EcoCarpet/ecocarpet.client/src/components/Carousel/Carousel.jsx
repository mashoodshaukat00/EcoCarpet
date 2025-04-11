import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import '../Carousel/Style.css';

function Carousel() {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        className: 'Style',
        centerMode: true,
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
                breakpoint: 600,
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
                    slidesToScroll: 1
                }
            }
        ]
       
    };
    return (
        <div className='w-3/4 m-auto'>
            <div className="mt-20">
                <Slider {...settings}>
                    {data.map((d) => (
                        <div key={d.name} className="bg-white h-[450px] text-black flex flex-col">
                            <div className='h-56 bg-indigo-500 flex justify-center items-center'>
                                <img src={d.img} alt="" className='h-full w-full object-cover'/>
                            </div>

                            <div className="flex flex-col items-center justify-center gap-4 p-4">
                                <p className="text-xl font-semibold">{d.name}</p>
                                <p className="text-center">{d.descriptions}</p>
                                <button className='bg-indigo-500 text-white text-lg px-6 py-1 rounded-xl'>Read More</button>
                            </div>
                        </div>
                    ))}
                </Slider>
            </div>

        </div>
    );
}

const data = [
    {
        name: `John Morgan`,
        img: `../../../public/images/faux_fur_rug.jpg`,
        descriptions:'Soft, luxurious feel, plush pile,warmth.',
    },
    {
        name: `Bohemian Chic Rug`,
        img: `../../../public/images/bohemian_chic_rug.jpg`,
        descriptions: `Eclectic design, vibrant colors.`
    },
    {
        name: `Sheepskin Rug`,
        img: `../../../public/images/sheepskin_rug.jpg`,
        descriptions: `Natural, cozy texture, soft and warm.`
    },
    {
        name: `Moroccan Trellis`,
        img: `../../../public/images/moroccan_trellis.jpg`,
        descriptions: `Traditional pattern, vibrant colors.`
    },
    {
        name: `Abstract Watercolor Rug`,
        img: `../../../public/images/abstract_watercolor_rug.jpg`,
        descriptions: `Modern, artistic design, vibrant colors,low pile.`
    },

];

export default Carousel;
