import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from '../pages/Home/HomePage'
import AlbumPage from '../pages/Album/AlbumPage'
import ArtistPage from "../pages/Artist/ArtistPage";

const AppRoutes: React.FC = () =>{
    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />}/>
                <Route path="/album/:album_id/artist/:artist_id" element={<AlbumPage  />} />
                <Route path="/artist/:artist_id" element={<ArtistPage />} />
            </Routes>
        </Router>
    )
}

export default AppRoutes