import React, { useEffect, useState } from "react";
import PlaylistSidebar from "features/Playlist/components/PlaylistSidebar";
import queryString from "query-string";
import { playlistAPI, playlistItemsAPI } from "api";
import { useHistory } from "react-router-dom";
import ItemsContainer from "features/Playlist/components/ItemsContainer";
import { useStyles } from "features/Playlist/styles";

const MainPage = () => {
  const history = useHistory();
  const queryParams = queryString.parse(history.location.search);
  const playlistId = queryParams.list;
  const [playlist, setPlaylist] = useState();
  const [playlistInfo, setPlaylistInfo] = useState();
  const [playlistStatus, setPlaylistStatus] = useState();
  const classes = useStyles();

  useEffect(() => {
    const getPlaylistItems = async () => {
      let params = {
        part: "snippet",
        playlistId: playlistId,
        maxResults: 50,
      };
      const response = await playlistItemsAPI.getPlaylistItems(params);
      setPlaylist(response);
    };
    const getPlaylistInfo = async () => {
      let params = {
        part: "snippet,contentDetails,status",
        id: playlistId,
      };
      const response = await playlistAPI.getPlaylists(params);
      setPlaylistInfo(response.items[0]);
      setPlaylistStatus(response.items[0].status);
    };

    getPlaylistItems();
    getPlaylistInfo();
  }, [playlistId]);
  const handleStatusChange = async (event) => {
    const params = { part: "status,snippet" };
    const body = {
      id: playlistId,
      snippet: {
        title: playlistInfo.snippet.title,
      },
      status: {
        privacyStatus: event.target.value,
      },
    };
    const response = await playlistAPI.updatePlaylist(params, body);
    if (response) {
      setPlaylistStatus({
        ...playlistStatus,
        privacyStatus: event.target.value,
      });
    }
  };

  return (
    <div className={classes.root}>
      <PlaylistSidebar
        playlistInfo={playlistInfo}
        playlistStatus={playlistStatus}
        handleStatusChange={handleStatusChange}
      >
        <ItemsContainer items={playlist?.items} playlistId={playlistId} />
      </PlaylistSidebar>
    </div>
  );
};

export default MainPage;
