import { Link } from 'react-router-dom';
import ColorfulRug from '../../assets/images/colorful-rug.jpg';
import Carousel from '../Carousel/Carousel';

const Home = () => {
   
    return (
        <>
          <div
            className="relative w-screen h-screen flex justify-center items-center overflow-hidden"
            style={{
                backgroundImage: `url(${ColorfulRug})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
        >
            <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50 z-[-1]"></div> {/* Optional: Dark overlay for text contrast */}
            <div className="text-center text-white">
                <h1 className="text-4xl font-bold italic lg:text-6xl mb-6">Welcome to EcoCarpet</h1>
                <p className="mt-2 font-semibold text-xl mb-8">We are dedicated to protecting the environment by providing high-quality reusable carpets through 
                a sustainable subscription service.</p>
                <Link to="/products" className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-full focus:outline-none focus:shadow-outline">
                    Shop Now
                </Link>
            </div>
        </div>
        <div className="py-8 bg-gray-100">
        <h1 className="text-2xl font-semibold text-gray-800 text-center">Our Rug Colors</h1>
                  <Carousel />
              
            </div>
        </>
        
    );
}

export default Home;    