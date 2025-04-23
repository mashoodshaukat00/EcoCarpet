import useSubscriptions from "../../utilities/hooks/useSubscriptions";

const SubscriptionPage = () => {
    const { subscriptions, loading, error } = useSubscriptions();

    return (
        <div className="bg-gray-100 py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
                    Choose a Subscription Plan
                </h2>
                {loading && (
                    <div className="text-center text-blue-600 font-semibold">Loading subscriptions...</div>
                )}
                {error && (
                    <div className="text-center text-red-600 font-semibold">Error: {error}</div>
                )}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {subscriptions.map(plan => (
                        <div key={plan.subscriptionID} className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col">
                            {/* Header Section */}
                            <div className={`py-4 text-center text-white font-bold text-xl rounded-t-lg ${plan.planName === 'Gold' ? 'bg-blue-500' :
                                plan.planName === 'Diamond' ? 'bg-orange-500' :
                                    plan.planName === 'Platinum' ? 'bg-green-500' : 'bg-gray-400'
                                }`}>
                                {plan.planName.toUpperCase()}
                            </div>
                            {/* Pricing and Features Section */}
                            <div className="p-6 flex-grow flex flex-col justify-center items-center">
                                <div className="text-center text-4xl font-semibold mb-2">
                                    {plan.annualFee} <span className="text-lg font-normal text-gray-500">NOK/Year</span>
                                </div>
                                <p className="text-gray-600 text-sm font-bold mb-4">Carpet Limit: {plan.carpetLimit}</p>
                                <ul className="mb-6 space-y-2 text-center">
                                    {plan.description.split(', ').map((feature, index) => (
                                        <li key={index} className="flex items-center justify-center">
                                            <svg className="w-5 h-5 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                                            <span>{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SubscriptionPage;
