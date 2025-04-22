import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

const Carpet = ({ carpet }) => {
    const navigate = useNavigate();

    return (
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <img
                src={`/images/${carpet.imgName}.jpg`}
                alt={carpet.name}
                className="w-full h-40 object-cover"
            />
            <div className="p-4">
                <h3 className="text-lg font-semibold">{carpet.name}</h3>
                <p className="text-gray-600">{carpet.descriptions}</p>
                <div className="mt-4">
                    <button
                        onClick={() => navigate(`/products/${carpet.carpetID}`)}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 w-full"
                    >
                        View Product
                    </button>
                </div>
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