import { useStyles } from "components/IFrame/style";
import React from "react";

const IFrame = ({ embedId, width, height }) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <iframe
        width={width}
        height={height}
        src={`https://www.youtube.com/embed/${embedId}?autoplay=1`}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen={true}
      />
    </div>
  );
};

export default IFrame;
