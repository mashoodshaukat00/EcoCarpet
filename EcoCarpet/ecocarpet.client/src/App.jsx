import './App.css';
import RegisterForm from './components/Registratioin/Registration';
import LoginForm from './components/Login/Login';

function App() {
    
    return (
        <div>
            <h1 className='text-3xl font-bold underline text-green-400'>Registration</h1>
            <p>This component demonstrates fetching data from the server.</p>
           
            <RegisterForm />
            <LoginForm/>
        </div>
    );
    
   
}

export default App;