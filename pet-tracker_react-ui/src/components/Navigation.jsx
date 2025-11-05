import '../App.css'
import {Link} from 'react-router-dom'

function Navigation() {
    return (
        <nav className="app-nav">
                <Link to="/"> Dashboard </Link>
                <Link to="/calendar"> Calendar </Link>
                <Link to="/myPets"> My Pets </Link>

        </nav>
    );
}

export default Navigation;