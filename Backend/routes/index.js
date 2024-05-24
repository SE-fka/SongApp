import express from "express";
import { getSongs, getSingleSong, addSong, updateSong, deleteSong, getSongCountByGenre, getSongAndAlbumCountByArtist,
    getSongCountByAlbum, getTotalCounts, searchSongByGenre } from "../controllers/songs.js";

const router = express.Router();
 
router.get('/api/getAllSongs', getSongs);
router.get('/api/getSong/:id', getSingleSong);
router.get('/api/searchSong/:genre', searchSongByGenre);
router.post('/api/addSong', addSong);
router.put('/api/updateSong/:id', updateSong);
router.delete('/api/deleteSong/:id', deleteSong);

router.get('/api/getTotalCounts', getTotalCounts);
router.get('/api/getSongCountByGenre', getSongCountByGenre);
router.get('/api/getSongAndAlbumCountByArtist', getSongAndAlbumCountByArtist);
router.get('/api/getSongCountByAlbum', getSongCountByAlbum);

export default router;