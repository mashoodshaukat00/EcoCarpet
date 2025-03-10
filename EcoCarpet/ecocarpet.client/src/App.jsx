import './App.css';
import LoginForm from './components/Login/Login';
import CarpetList from './components/CarpetList/CarpetList';
import Nav from './components/Nav/Nav';
import Footer from './components/Footer/Footer';
import RegistrationForm from './components/Registratioin/RegistrationForm';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './components/Home/Home';
import NoPage from './components/NoPage/NoPage';
import SubscriptionPage from './components/Subscriptions/SubscriptionPage';
import CarpetDetails from './components/CarpetDetails/CarpetDetails';
import CartPage from './components/CartPage/CartPage';

function App() {
    
    return (    
        <BrowserRouter>
            <div className="flex flex-col min-h-screen">
               
                    <Nav/>
            <main className="flex-grow bg-gray-100 p-4">
                
                    <Routes>
                       
                            <Route path= "/"element={<Home/> } />
                            <Route path="/login" element={<LoginForm />} />
                            <Route path="/signup" element={<RegistrationForm />} />
                            <Route path="/products" element={<CarpetList />} />
                            <Route path="/subscriptions" element={<SubscriptionPage />} />
                            <Route path="*" element={<NoPage />} />
                            <Route path="/products/:id" element={<CarpetDetails />} />
                            <Route path="/cart" element={<CartPage />} />                           
                        
                    </Routes>
                
            </main>
                <Footer/>
            </div>
        </BrowserRouter>
    );   
}

export default App;
