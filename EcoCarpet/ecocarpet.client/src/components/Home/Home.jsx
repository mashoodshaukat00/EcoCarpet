
import ColorfulRug from '../../assets/images/colorful-rug.jpg';

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
                <h1 className="text-4xl font-bold lg:text-6xl">Welcome to Our Rug Collection</h1>
                <p className="mt-2 text-lg">Discover unique and beautiful carpets</p>
                <button className="mt-6 bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-full focus:outline-none focus:shadow-outline">
                    Shop Now
                </button>
            </div>
        </div>
         
        </>
        
    );
}

export default Home;    