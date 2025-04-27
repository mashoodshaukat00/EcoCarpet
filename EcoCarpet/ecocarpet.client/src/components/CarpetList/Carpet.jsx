import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

const Carpet = ({ carpet }) => {
    const navigate = useNavigate();

    return (
        <div className="bg-white rounded-2xl shadow-xl border border-emerald-100 overflow-hidden flex flex-col hover:shadow-emerald-200 transition-shadow duration-300">
            <div
                className="h-48 bg-emerald-50 flex items-center justify-center cursor-pointer overflow-hidden"
                onClick={() => navigate(`/products/${carpet.carpetID}`)}
            >
                <img
                    src={`/images/${carpet.imgName}.jpg`}
                    alt={carpet.name}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
            </div>
            <div className="p-5 flex flex-col flex-1">
                <h3
                    className="text-xl font-bold text-emerald-800 mb-2 cursor-pointer hover:underline text-center"
                    onClick={() => navigate(`/products/${carpet.carpetID}`)}
                >
                    {carpet.name}
                </h3>
                <p className="text-gray-600 text-center text-sm flex-grow">{carpet.descriptions}</p>
                <button
                    onClick={() => navigate(`/products/${carpet.carpetID}`)}
                    className="mt-6 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2 px-4 rounded-lg transition w-full shadow"
                >
                    View Product
                </button>
            </div>
        </div>
    );
};

Carpet.propTypes = {
    carpet: PropTypes.shape({
        carpetID: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        descriptions: PropTypes.string,
        imgName: PropTypes.string,
    }).isRequired,
};

export default Carpet;