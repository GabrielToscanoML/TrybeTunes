import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Loading from '../components/Loading';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

class Search extends React.Component {
  // praticamente copiei o formulario do Login e adaptei
  state = {
    artistInput: '',
    isButtonDisabled: true,
    loading: false,
    isOK: null,
    noAlbum: null,
    infoList: [],
    inputCopy: null,
  };

  requestAPI = async () => {
    this.setState({ isButtonDisabled: true, isOK: false, noAlbum: false }); // resetando as configurações
    const { artistInput } = this.state;
    this.setState({ loading: true });
    const response = await searchAlbumsAPI(artistInput);
    this.setState({ infoList: response, loading: false });
    if (response.length !== 0) {
      this.setState({ isOK: true });
    } else {
      this.setState({ noAlbum: true });
    }
    this.setState({ inputCopy: artistInput, artistInput: '' }); // limpando o input
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
      loading, isOK, infoList, inputCopy, noAlbum } = this.state;

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

        { noAlbum && (
          <div>
            <p> Nenhum álbum foi encontrado </p>
          </div>)}
        {
          infoList.map((album) => (
            <div key="">
              <Link
                to={ `/album/${album.collectionId}` }
                data-testid={ `link-to-album-${album.collectionId}` }
              >
                { album.artistName }
              </Link>
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
