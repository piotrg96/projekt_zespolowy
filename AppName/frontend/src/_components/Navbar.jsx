import React from 'react';
import { Link } from 'react-router-dom';
import { userActions } from '../_actions';
import './Navbar.css';


class Navbar extends React.Component {

    handleDeleteUser(){ userActions.delete(); }
    handleLogout(){ userActions.logout(); }

    render() {
        return (  
                <nav className="navbar navbar-expand-lg navbar-dark bg-success position-static">
                    <a className="navbar-brand" href="/">Aplikacja Konsumencka</a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav mr-auto py-2">   
                            <li className="nav-item m-auto pl-2 text-light" >
                                <Link className="nav-link" to={{ pathname: '/myAds', state: { users: this.props.concreteUser}}}>Moje Ogłoszenia</Link>
                            </li>
                            <li className="nav-item m-auto pl-2 text-light" >
                                <Link className="nav-link" to={{ pathname: '/advertisementCreate', state: { users: this.props.concreteUser}}}>Utwórz Ogłoszenie</Link>
                            </li> 
                            <li className="nav-item m-auto pl-2 text-light" >
                            <Link className="nav-link" style={this.props.isnew ? { color: 'red' } : {} } to={{ pathname: '/myMessage', state: { users: this.props.concreteUser } }}>Moje wiadomości</Link>
                            </li> 
                            <li className="nav-item m-auto pl-2 text-light" >
                                <Link className="nav-link" to={{ pathname: '/favouriteAds', state: { users:this.props.concreteUser}}}>Ulubione ogłoszenia</Link>
                            </li>
                        </ul>
                    </div> 
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href=" # " id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                Użytkownik
                                </a>
                                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <a className="dropdown-item" href="/updateOwner">Aktualizuj Profil</a>
                                    <a className="dropdown-item" href="/repass">Zmień Hasło</a>
                                    <Link 
                                        className="dropdown-item" 
                                        to="/login" 
                                        onClick={this.handleDeleteUser}
                                    > 
                                        Usuń Konto
                                    </Link> 
                                    <div className="dropdown-divider"></div>
                                    <Link 
                                        className="dropdown-item" 
                                        to="/login" 
                                        onClick={this.handleLogout}
                                    >
                                        Wyloguj
                                    </Link>
                                </div>
                            </li> 
                            <li className="nav-item m-auto pl-2 text-light" >
                                <span>Witaj {this.props.concreteUser.firstName}</span>
                            </li>
                        </ul>
                    </div>
                </nav>
        );
    }
}

export { Navbar };