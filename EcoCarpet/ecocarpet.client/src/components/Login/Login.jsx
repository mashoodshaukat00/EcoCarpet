import { useState } from 'react';

const LoginForm = () => {
    const [loginData, setLoginData] = useState({
        Email: '',
        Password: '',
    });
    console.log('logindata:', loginData);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setLoginData({ ...loginData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('https://localhost:7036/api/Users/Login', {  // Change URL as needed
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(loginData),
            });


            if (!response.ok) {
                throw new Error('Innlogging feilet');
            }

            const data = await response.json(); // Henter hele responsobjektet

            console.log("Login response:", data); // Sjekk hva backend returnerer

            if (data.user && data.user.userID) {  // Riktig vei å hente userID
                localStorage.setItem("userId", data.user.userID.toString()); // Lagre userID som string
                alert("Innlogging vellykket!");
            } else {
                alert("Kunne ikke hente bruker-ID fra serveren.");
            }

        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
            alert('Failed to login. Please try again later.');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="email"
                name="Email"
                placeholder="Email"
                value={loginData.Email}
                onChange={handleChange}
                required
            />
            <input
                type="password"
                name="Password"
                placeholder="Password"
                value={loginData.Password}
                onChange={handleChange}
                required
            />
            <button type="submit">Login</button>
        </form>
    );
};

export default LoginForm;
