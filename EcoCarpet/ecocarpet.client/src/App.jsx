import './App.css';
import LoginForm from './components/Login/Login';
import CarpetList from './components/CarpetList/CarpetList';
import Nav from './components/Nav/Nav';
import Footer from './components/Footer/Footer';
import RegistrationForm from './components/Registratioin/RegistrationForm';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './components/Home/Home';
import SubscriptionPage from './components/Subscriptions/SubscriptionPage';
import CarpetDetails from './components/CarpetDetails/CarpetDetails';
import Cart from './components/Cart/Cart';
import useAuth from './utilities/hooks/useAuth';
import { CartProvider } from './utilities/hooks/useCart.jsx';
import Checkout from './components/Checkout/Checkout';
import Payment from './components/Payment/Payment';
import Success from './components/Success/Success';
import About from './components/About/About';

function App() {
    const { isAuthenticated, handleLogin, handleLogout } = useAuth();

    return (    
        <CartProvider>
            <BrowserRouter>
                <div className="flex flex-col min-h-screen">
                    <Nav isAuthenticated={isAuthenticated} onLogout={handleLogout} />
                    <main className="flex-grow bg-gray-100 p-4">
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/login" element={<LoginForm onLogin={handleLogin} />} />
                            <Route path="/signup" element={<RegistrationForm />} />
                            <Route path="/products" element={<CarpetList />} />
                            <Route path="/subscriptions" element={<SubscriptionPage />} />
                            <Route path="/products/:id" element={<CarpetDetails />} />
                            <Route path="/cart" element={<Cart />} />
                            <Route path="/checkout" element={<Checkout />} />
                            <Route path="/payment" element={<Payment />} />
                            <Route path="/success" element={<Success />} />
                            <Route path="/about" element={<About />} />
                        </Routes>
                    </main>
                    <Footer />
                </div>
            </BrowserRouter>
        </CartProvider>
    );   
}
export default App;
