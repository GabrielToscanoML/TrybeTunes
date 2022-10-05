import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Loading from '../components/Loading';
import musicsAPI from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';

class Album extends React.Component {
  state = {
    loading: true,
    musicList: [],
  };

  componentDidMount() {
    this.requestAPI();
  }

  requestAPI = async () => {
    this.setState({ loading: true });
    const { match: { params: { id } } } = this.props;
    const response = await musicsAPI(id);
    this.setState({ musicList: response, loading: false });
  };

  render() {
    const { loading, musicList } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        {
          loading
            ? <Loading />
            : (
              <div>
                <div>
                  <h1 data-testid="artist-name">{ musicList[0].artistName }</h1>
                  <h2 data-testid="album-name">{ musicList[0].collectionName }</h2>
                </div>
                {
                  musicList.map((music, index) => {
                    if (index > 0) {
                      return (
                        <MusicCard
                          key={ music.trackId }
                          music={ music }
                        />
                      );
                    }
                    return null;
                  })
                }
              </div>
            )
        }
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  }).isRequired,
};

export default Album;
