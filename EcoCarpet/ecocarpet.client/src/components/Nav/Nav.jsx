

const Nav = () => {
    return (
        <nav className="max-w-7xl mx-auto flex justify-between items-center">
            <div className="flex items-center">
                <img src="/src/assets/logo.png" alt="Logo" className="h-8 w-8 sm:h-10 sm:w-10 lg:h-12 lg:w-12 mr-2" />
                <div className="text-xl font-bold">EcoCarpet</div>
            </div>
            <ul className="flex space-x-4">
                <li><a href="./Login" className="hover:underline">Login</a></li>
                <li><a href="./RegistrationForm" className="hover:underline">Signup</a></li>
                <li><a href="#" className="hover:underline">About</a></li>
                <li><a href="#" className="hover:underline">Contact</a></li>
            </ul>
        </nav>
    )
}

export default Nav;


