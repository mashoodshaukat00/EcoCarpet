import './App.css';
import RegisterForm from './components/Registratioin/Registration';
import LoginForm from './components/Login/Login';

function App() {
    
    return (
        <div>
            <h1 id="tableLabel">Registration</h1>
            <p>This component demonstrates fetching data from the server.</p>
           
            <RegisterForm />
            <LoginForm/>
        </div>
    );
    
   
}

export default App;