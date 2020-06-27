import React, {PureComponent} from 'react';
import AudioPlayer from "../../components/audio-player/audio-player.jsx";

const withActivePlayer = (Component) => {
  class WithActivePlayer extends PureComponent {
    constructor(props) {
      super(props);
      this.renderPlayer = this.renderPlayer.bind(this);
      this.onPlayButtonClick = this.onPlayButtonClick.bind(this);

      this.state = {
        activePlayerId: 0,
      };
    }

    onPlayButtonClick(id) {
      return () => {
        this.setState({
          activePlayerId: this.state.activePlayerId === id ? -1 : id
        });
      };
    }

    renderPlayer(src, id) {
      return (
        <AudioPlayer
          src={src}
          isPlaying={id === this.state.activePlayerId}
          onPlayButtonClick={this.onPlayButtonClick(id)}
        />
      );
    }

    render() {
      return <Component
        {...this.props}
        renderPlayer={this.renderPlayer}
      />;
    }
  }

  WithActivePlayer.propTypes = {};

  return WithActivePlayer;
};

export default withActivePlayer;
