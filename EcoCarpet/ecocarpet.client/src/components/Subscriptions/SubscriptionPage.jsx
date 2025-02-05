import { useEffect, useState } from "react";
import axios from "axios";

const SubscriptionPage = () => {
    const [subscriptions, setSubscriptions] = useState([]);
    const [selectedPlan, setSelectedPlan] = useState(null);

    // Hent bruker-ID fra localStorage
    const userId = localStorage.getItem("userId");

    useEffect(() => {
        axios.get("https://localhost:7036/api/subscriptions")
            .then(response => setSubscriptions(response.data))
            .catch(error => console.error("Error fetching subscriptions:", error));
    }, []);

    const selectPlan = async (plan) => {
        setSelectedPlan(plan);

        if (!userId) {
            alert("Du må være logget inn for å velge et abonnement!");
            return;
        }

        try {
            const response = await axios.post( 
                "https://localhost:7036/api/usersubscriptions",
                {
                    userID: parseInt(userId), 
                    subscriptionID: plan.subscriptionID, 
                    startDate: new Date().toISOString(), 
                    status: "Active",
                    currentCarpets: 0
                },
                {
                    headers: { "Content-Type": "application/json" }
                }
            );

            console.log("API Response:", response); // Debugging for å sjekke respons

            if (response.status === 201) {
                console.log(`Du har valgt: ${plan.planName}`);
                alert(`Abonnement lagret: ${plan.planName}`);
            } else {
                console.error("Uventet respons fra serveren:", response);
                alert("Kunne ikke lagre abonnement. Prøv igjen.");
            }
        } catch (error) {
            console.error("Feil ved lagring av abonnement:", error);
            alert("Kunne ikke lagre abonnement. Prøv igjen.");
        }
    };

    return (
        <div className="max-w-5xl mx-auto p-6">
            <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
                Choose a Subscription Plan
            </h2>
            <div className="flex flex-wrap justify-center gap-6">
                {subscriptions.map(plan => (
                    <div key={plan.subscriptionID}
                        className="bg-gray-100 rounded-lg shadow-lg p-6 w-64 text-center border border-gray-300 hover:shadow-xl transition duration-300 flex flex-col justify-between h-full">

                        <div>
                            <h3 className="text-lg font-bold text-gray-900 mb-2">
                                {plan.planName}
                            </h3>
                            <p className="text-green-600 font-semibold text-xl mb-2">
                                ${plan.annualFee.toFixed(2)}/year
                            </p>
                            <p className="text-sm text-gray-600 mb-2">
                                Carpet Limit: <strong>{plan.carpetLimit}</strong>
                            </p>
                            <p className="text-sm text-gray-600 flex-grow min-h-[80px] mb-4">
                                {plan.description}
                            </p>
                        </div>

                        <button
                            className="bg-green-500 text-white font-bold py-2 px-4 rounded-lg border border-green-700 hover:bg-green-600 transition duration-300"
                            onClick={() => selectPlan(plan)}
                        >
                            Select Plan
                        </button>
                    </div>
                ))}
            </div>
            {selectedPlan && (
                <p className="mt-4 text-green-600 font-semibold text-lg text-center">
                    You selected: {selectedPlan.planName}
                </p>
            )}
        </div>
    );
};

export default SubscriptionPage;
