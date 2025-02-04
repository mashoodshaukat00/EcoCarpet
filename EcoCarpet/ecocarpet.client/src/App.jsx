import './App.css';
import RegisterForm from './components/Registratioin/Registration';
import LoginForm from './components/Login/Login';
import ProductList from './components/ProductList/ProductList';
import Nav from './components/Nav/Nav';
import Footer from './components/Footer/Footer';
import RegistrationForm from './components/Registratioin/RegistrationForm';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './components/Home/Home';
import NoPage from './components/NoPage/NoPage';

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
                            <Route path="/products" element={<ProductList />} />
                            <Route path="*" element={<NoPage />} />
                        
                    </Routes>
                
            </main>
                <Footer/>
            </div>
        </BrowserRouter>
    );   
}

export default App;