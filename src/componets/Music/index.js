import React, { useContext, useState } from 'react';
import ReactAudioPlayer from 'react-audio-player';
import { FiVolumeX, FiVolume2, FiSkipForward,FiSkipBack } from 'react-icons/fi';
import audio1 from '../../assets/media/001.mp3';
import audio2 from '../../assets/media/002.mp3';

export default function Music({ Link, AuthContext, rota }) {
    const { autoPlay } = useContext(AuthContext);
    const [isPlay, setIsPay] = useState(false);
    const [isNext, setIsNext] = useState(false);

    return (
        <div id="container">
            <ReactAudioPlayer
                src={isNext ? audio1 : audio2}
                autoPlay={autoPlay}
                controls={false}
                muted={isPlay}
                onEnded={()=>setIsNext(!isNext)}
            />

            {isPlay ?
                <FiVolumeX size={23} color='#fff' onClick={() => setIsPay(!isPlay)} />
                :
                <FiVolume2  size={23} color='#fff' onClick={() => setIsPay(!isPlay)} />
            }
            {isNext ?
                <FiSkipBack size={23} color='#fff' onClick={() => setIsNext(!isNext)} />
                :
                <FiSkipForward size={23} color='#fff' onClick={() => setIsNext(!isNext)} />
            }

        </div>
    )
}