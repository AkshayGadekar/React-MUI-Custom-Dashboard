import React, {useState, useRef} from 'react';
import Box from '@mui/material/Box';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import { log } from "../../funcs/helpers";
import type {AudioPlayerProps} from '../../types/components';

const AudioPlayer = (props: AudioPlayerProps) => {

    const [audioPlaying, setAudioPlaying] = useState(false);
    const audioRef = useRef<HTMLAudioElement>(null);
    const audioRestartRef = useRef<HTMLDivElement>(null);
    const audioLoaderRef = useRef<HTMLDivElement>(null);
    const audioTimeRef = useRef<HTMLSpanElement>(null);

    const playAudio = () => {
      setAudioPlaying((value) => !value);
    }
    const restartAudio = () => {
      audioRef.current!.currentTime = 0;
      setAudioPlaying(true);
    }
    audioPlaying ? audioRef.current?.play() : audioRef.current?.pause();

    const updateTime = () => {

        const currTimeInMs = audioRef.current!.currentTime;
        const durationInMs = audioRef.current!.duration;
        
        const currTime: number = Math.floor(currTimeInMs); 
        const duration: number = Math.floor(durationInMs);

        const currTimeString = formatSecondsAsTime(currTime);
        const durationString = formatSecondsAsTime(duration)
        
        audioTimeRef.current!.innerHTML = `${currTimeString} / ${durationString}`;
        audioLoaderRef.current!.style.width = `${(currTimeInMs/durationInMs)*100}%`;
        
        if (!audioRef.current!.ended) {
            audioRestartRef.current!.style.display = "block";
        } else {
            audioRestartRef.current!.style.display = "none";
            setAudioPlaying(false);
        }

    }
    const formatSecondsAsTime = (secs: number) => {
      const hr  = Math.floor(secs / 3600);
      let min: number|string = Math.floor((secs - (hr * 3600))/60);
      let sec: number|string = Math.floor(secs - (hr * 3600) -  (min * 60));
    
      if (min < 10){ 
        min = "0" + min; 
      }
      if (sec < 10){ 
        sec  = "0" + sec;
      }
    
      return min + ':' + sec;
    }

    return (
        <>
            <Box display="flex" alignItems={"center"} width={'90%'}>
                <Box bgcolor={'primary.main'} width="25px" 
                    sx={{borderTopLeftRadius: 6, borderBottomLeftRadius: 6, borderRight: '1px solid rgba(0,0,0,.2)', 
                    cursor: 'pointer', '&:hover': {opacity:'.9'}}}
                    onClick={playAudio}>
                    {
                        !audioPlaying ? 
                        <PlayArrowIcon sx={{verticalAlign: 'middle'}} /> :
                        <PauseIcon sx={{verticalAlign: 'middle'}} />
                    }
                </Box>
                <Box bgcolor={'primary.main'} width="25px" display="none"
                    sx={{cursor: 'pointer', '&:hover': {opacity:'.9'}}} onClick={restartAudio} ref={audioRestartRef}>
                    <SkipPreviousIcon sx={{verticalAlign: 'middle'}} />
                </Box>
                <Box bgcolor={'grey.300'} alignSelf={"normal"} position="relative"
                    sx={{borderTopRightRadius: 6, borderBottomRightRadius: 6, flexGrow: 1}}>
                    <Box position="absolute" width="0%" height="100%" bgcolor={'rgba(0,0,0,.1)'} top={0} ref={audioLoaderRef}></Box>
                    <Box component="span" display="inline-block" width='calc(100% - 120px)' position="relative" zIndex={100} pl={1} sx={{top: '2px', float: "left", 
                    whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'}}>pacman_death00</Box>
                    <Box component="span" display="inline-block" width='120px' position="relative" zIndex={100} pl={1} sx={{top: '2px', float: "right"}} ref={audioTimeRef}>00:00 / 00:00</Box>
                </Box>
            </Box>
            <audio id="player-637c68eae8bdc8001ab9547d" ref={audioRef} onTimeUpdate={updateTime} style={{display: 'none'}}>
            <source src="https://callqx-portal.ecosmob.net/audio/customers/1/messages/wav/637c68eae8bdc8001ab9547d.wav" type="audio/wav" />
            </audio>
        </>
    )
}

export default AudioPlayer;