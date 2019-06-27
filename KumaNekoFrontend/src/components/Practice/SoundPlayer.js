import React from 'react';
import Sound from 'react-sound';

import Image from 'react-bootstrap/Image';

import speaker from '../../resources/practice_data/speaker.png';

class SoundPlayer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            status: Sound.status.PLAYING,
        };
    }

    handleClick = () => {
        console.log("pokreni zvuk");
        this.setState({
            status: Sound.status.PLAYING,
        });
    }

    render() {
        return (
            <div onClick={this.handleClick} style={{border: "7px solid orange"}}>
                <Sound
                    url={this.props.audioPath}
                    playStatus={this.state.status}
                    onFinishedPlaying={this.finishedPlaying}
                    //className="question-image" 
                />
                <Image onClick={this.handleClick} src={speaker}  />
            </div>
        );
    }

}

export default SoundPlayer;