import './App.css';
import RegisterForm from './components/Registratioin/Registration';
import LoginForm from './components/Login/Login';
import ProductList from './components/ProductList/ProductList';
import Nav from './components/Nav/Nav';
import Footer from './components/Footer/Footer';
import RegistrationForm from './components/Registratioin/RegistrationForm';

function App() {
    
    return (        
            <div className="flex flex-col min-h-screen">
                <header className="bg-gray-800 text-white p-4">
                    <Nav/>
                </header>
                    <main className="flex-grow bg-gray-100 p-4">
                {/*<RegisterForm />*/}
                <RegistrationForm/>
                        {/*<LoginForm />*/}
                        {/*<ProductList />*/}
                </main>
                        <Footer/>
            </div>
    );   
}

export default App;