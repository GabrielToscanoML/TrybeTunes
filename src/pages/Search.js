import React from 'react';
import Header from '../components/Header';
import Loading from '../components/Loading';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

class Search extends React.Component {
  // praticamente copiei o formulario do Login e adaptei
  state = {
    artistInput: '',
    isButtonDisabled: true,
    loading: false,
    isOK: false,
    infoList: [],
    inputCopy: '',
  };

  requestAPI = async () => {
    const { artistInput } = this.state;
    this.setState({ loading: true });
    const response = await searchAlbumsAPI(artistInput);
    this.setState({ infoList: response });
    this.setState({ loading: false });
    this.setState({ isOK: true });
    this.setState({ inputCopy: artistInput }); // limpando o input
    this.setState({ artistInput: '' }); // limpando o input
    console.log(response);
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
    const { isButtonDisabled, artistInput,
      loading, isOK, infoList, inputCopy } = this.state;

    return (
      <div data-testid="page-search">
        <Header />
        {
          loading
            ? <Loading />
            : (
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
                  onClick={ this.requestAPI }
                >
                  Pesquisar
                </button>
              </form>
            )
        }

        { isOK && (
          <div>
            <p>
              Resultado de álbuns de:
              {' '}
              {inputCopy}
            </p>
          </div>)}

        { infoList.length === 0 && (
          <div>
            <p> Nenhum álbum foi encontrado </p>
          </div>)}

        {
          infoList.map((album) => (
            <div key="">
              <p>{ album.artistName }</p>
              <p>{ album.collectionName }</p>
              <img src={ album.artworkUrl100 } alt={ album.artistName } />
            </div>
          ))
        }
      </div>
    );
  }
}
export default Search;
