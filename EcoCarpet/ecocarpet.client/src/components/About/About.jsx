 const About = () => (
    <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-2xl border border-emerald-200 p-10 mt-12 mb-12">
        <h1 className="text-4xl font-extrabold text-emerald-800 mb-6 text-center tracking-tight">About EcoCarpet</h1>
        <p className="text-lg text-gray-700 mb-6 text-center">
            EcoCarpet is dedicated to providing high-quality, reusable carpets through a sustainable subscription service.
            Our mission is to reduce waste and promote eco-friendly living by making it easy and affordable for everyone to enjoy beautiful carpets without harming the environment.
        </p>
        <div className="mb-6">
            <h2 className="text-2xl font-bold text-emerald-700 mb-2">Our Vision</h2>
            <p className="text-gray-700">
                We envision a world where home decor and sustainability go hand in hand. By offering reusable carpets and a flexible subscription model, we help our customers reduce their carbon footprint and contribute to a greener planet.
            </p>
        </div>
        <div className="mb-6">
            <h2 className="text-2xl font-bold text-emerald-700 mb-2">Why Choose Us?</h2>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Eco-friendly and reusable carpet solutions</li>
                <li>Flexible subscription plans for every need</li>
                <li>High-quality, stylish, and durable carpets</li>
                <li>Easy returns and exchanges</li>
                <li>Dedicated customer support</li>
            </ul>
        </div>
        <div>
            <h2 className="text-2xl font-bold text-emerald-700 mb-2">Contact Information</h2>
            <p className="text-gray-700">
                Email: <a href="mailto:info@ecocarpet.com" className="underline text-emerald-700">info@ecocarpet.com</a><br />
                Phone: <a href="tel:+4712345678" className="underline text-emerald-700">+47 12 34 56 78</a><br />
                Address: 123 Green Street, Oslo, Norway
            </p>
        </div>
    </div>
);

export default About;
