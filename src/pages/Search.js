import React from 'react';
import Header from '../components/Header';

class Search extends React.Component {
  // praticamente copiei o formulario do Login e adaptei
  state = {
    artistInput: '',
    isButtonDisabled: true,
  };

  handleInputOnChange = (event) => {
    const { value } = event.target;
    this.setState({ artistInput: value }, this.inputValidation);
  };

  inputValidation = () => {
    const { artistInput } = this.state;
    const minLength = 2;
    if (artistInput.length < minLength) {
      this.setState({ isButtonDisabled: true });
    } else {
      this.setState({ isButtonDisabled: false });
    }
  };

  render() {
    const { isButtonDisabled, artistInput } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <form>
          <label htmlFor="search-artist">
            <input
              // name="userName"
              className="search-artist"
              data-testid="search-artist-input"
              placeholder="Nome do Artista:"
              type="text"
              value={ artistInput }
              onChange={ this.handleInputOnChange }
            />
          </label>

          <button
            data-testid="search-artist-button"
            className="search-artist-button"
            type="button"
            disabled={ isButtonDisabled }
          >
            Pesquisar
          </button>
        </form>
      </div>
    );
  }
}

export default Search;
