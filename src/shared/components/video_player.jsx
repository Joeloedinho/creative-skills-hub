import React from "react";
import { CardMedia, IconButton, Tooltip } from "@mui/material";
import { PlayArrow } from "@mui/icons-material";
import { courseCardImg } from "../../assets";
import { useState } from "react";

const VideoPlayer = ({ videoUrl }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlay = () => {
    setIsPlaying(true);
  };

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: 0,
        paddingBottom: "56.25%",
      }}
    >
      {!isPlaying && (
        <div
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            top: 0,
            left: 0,
            backgroundImage: `url(${courseCardImg})`,
            backgroundBlendMode: 'multiply',
            backgroundColor: 'rgba(0, 0, 0, 0.4)',
            backgroundSize: "cover",
            backgroundPosition: "center",
            cursor: "pointer",
          }}
          onClick={handlePlay}
        >
          <Tooltip title="Play Video">
            <IconButton
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
              }}
              aria-label="play"
              size="large"
            >
              <PlayArrow sx={{fontSize: 150, color: '#fff'}}/>
            </IconButton>
          </Tooltip>
        </div>
      )}
      {isPlaying && (
        <>
          <CardMedia
            component="video"
            src={videoUrl}
            controls
            style={{
              position: "absolute",
              width: "100%",
              height: "100%",
              top: 0,
              left: 0,
            }}
          />
          <Tooltip title="Play Video" aria-label="play video">
            <IconButton
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
              }}
              color="primary"
              aria-label="play video"
            >
              <PlayArrow sx={{fontSize: 150, color: '#fff'}}/>
            </IconButton>
          </Tooltip>
        </>
      )}
    </div>
  );
};

export default VideoPlayer;
