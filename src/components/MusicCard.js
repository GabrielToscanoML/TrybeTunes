import React from 'react';
import PropTypes from 'prop-types';
import Loading from './Loading';
import { addSong, getFavoriteSongs } from '../services/favoriteSongsAPI';

class MusicCard extends React.Component {
  state = {
    loading: false,
    favorite: false,
    favoriteList: '',
  };

  componentDidMount() {
    this.requestFavoriteSongs();
  }

  requestFavoriteSongs = async () => {
    const favoriteSongsRequest = await getFavoriteSongs();
    this.setState({ favoriteList: favoriteSongsRequest }, this.checkFavorite);
  };

  checkFavorite = () => {
    const { music } = this.props;
    const { favoriteList } = this.state;
    const procura = favoriteList.some((event) => event.trackId === music.trackId);
    if (procura) {
      this.setState({ favorite: true });
    }
  };

  addToFavorites = async (event) => {
    const { value, checked } = event.target;
    const { update } = this.props;
    if (checked) {
      this.setState({ loading: true });
      await addSong(value);
      this.setState({ loading: false, favorite: true });
      update();
    }
  };

  render() {
    const { music } = this.props;
    const { loading, favorite } = this.state;
    return (
      <div>
        {
          loading
            ? <Loading />
            : (
              <div>
                <h3>{ music.trackName }</h3>
                <audio data-testid="audio-component" src={ music.previewUrl } controls>
                  <track kind="captions" />
                  O seu navegador não suporta o elemento
                  {' '}
                  <code>audio</code>
                  .
                </audio>
                <label htmlFor={ music.trackId }>
                  <input
                    type="checkbox"
                    data-testid={ `checkbox-music-${music.trackId}` }
                    id={ music.trackId }
                    value={ JSON.stringify(music) } // usando JSON pra transformar em objeto
                    checked={ favorite }
                    onChange={ this.addToFavorites }
                  />
                  Favorita
                </label>
              </div>
            )
        }
      </div>
    );
  }
}

MusicCard.propTypes = {
  music: PropTypes.shape({
    previewUrl: PropTypes.string.isRequired,
    trackId: PropTypes.number.isRequired,
    trackName: PropTypes.string.isRequired,
  }).isRequired,
  update: PropTypes.func.isRequired,
};

export default MusicCard;
