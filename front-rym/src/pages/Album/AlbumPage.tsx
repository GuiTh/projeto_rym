import React from "react";
import { useParams } from "react-router-dom";

//componentes
import AlbumDetails from "../../components/Albuns/AlbumDetail";
import ArtistDetails from "../../components/Artists/ArtistDetail";
import SongList from "../../components/Songs/SongList";
import Ratings from "../../components/Ratings/AlbumRatings";
import Comments from '../../components/Comments/CommentList'


interface Params{
    album_id: string;
    artist_id: string;
    [key: string]: string;
}

const AlbumPage: React.FC = () => {
    const params = useParams<Params>()

    const {album_id, artist_id} = params

    if(!album_id || !artist_id){
        return <div>Esta faltando Id do album ou do artista</div>
    }

    const albumId = parseInt(album_id, 10)
    const artistId = parseInt(artist_id, 10)

    if(isNaN(albumId) || isNaN(artistId)){
        return <div>Id de album ou do artista</div>
    }

    return (
        <div>
            <AlbumDetails albumId={albumId} />
            <ArtistDetails artistId={artistId} />
            <SongList albumId={albumId} />
            <Ratings albumId={albumId} />
            <Comments albumId={albumId} />
        </div>
    )
}

export default AlbumPage