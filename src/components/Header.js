import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';
import './header.css';

class Header extends React.Component {
  state = {
    loading: false,
    userName: '',
  };

  componentDidMount() {
    this.getUserInfo();
  }

  getUserInfo = async () => {
    this.setState({ loading: true });
    const name = await getUser();
    this.setState({ userName: name.name });
    this.setState({ loading: false });
  };

  render() {
    const { loading, userName } = this.state;
    return (
      <div data-testid="header-component">
        {
          loading
            ? <Loading />
            : (
              <div>
                <h1 data-testid="header-user-name">{ userName }</h1>
                <nav id="nav-links">
                  <Link to="/search" data-testid="link-to-search"> Search </Link>
                  <Link
                    to="/favorites"
                    data-testid="link-to-favorites"
                    className="link-favorites"
                  >
                    Favorites
                  </Link>
                  <Link to="/profile" data-testid="link-to-profile">Profile</Link>
                </nav>
              </div>
            )
        }
      </div>
    );
  }
}

export default Header;
