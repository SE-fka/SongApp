
import songSchema from "../model/songs.js";

export const getSongs = async (req, res) => {
    try {
        const songs = await songSchema.find();
        res.json(songs);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

export const getSingleSong = async (req, res) => {
  try {
    const song = await songSchema.findById(req.params.id);
    if (!song) {
      return res.status(404).json({ message: 'Song not found' });
    }
    res.json(song);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

export const searchSongByGenre = async (req, res) => {
  try {
    const songs = await songSchema.find({ genre: req.params.genre });
    res.json(songs);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
}

export const addSong = async (req, res) => {
    const song = new songSchema(req.body);
    try {
        const addsong = await song.save();
        res.status(201).json(addsong);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}
 
export const updateSong = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, artist, album, genre } = req.body;

    const updatedSong = await songSchema.findByIdAndUpdate(
      id,
      { title, artist, album, genre },
      { new: true }
    );

    if (!updatedSong) {
      return res.status(404).json({ message: 'Song not found' });
    }

    res.status(200).json(updatedSong);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteSong = async (req, res) => {
    try {
        const deletedsong = await songSchema.deleteOne({_id:req.params.id});
        res.status(200).json(deletedsong);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}


  export const getTotalCounts = async (req, res) => {
    try {
      // Get the total number of songs
      const totalSongs = await songSchema.countDocuments({});
  
      // Get the unique artists
      const uniqueArtists = await songSchema.distinct('artist');
      const totalArtists = uniqueArtists.length;
  
      // Get the unique albums
      const uniqueAlbums = await songSchema.distinct('album');
      const totalAlbums = uniqueAlbums.length;
  
      // Get the unique genres
      const uniqueGenres = await songSchema.distinct('genre');
      const totalGenres = uniqueGenres.length;
  
      res.status(200).json({
        totalSongs,
        totalArtists,
        totalAlbums,
        totalGenres,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred while fetching the total counts.' });
    }
  };
  
  // Function to get the number of songs in each genre
  export const getSongCountByGenre = async (req, res) => {
    try {
      const genreCounts = await songSchema.aggregate([
        { $group: { _id: '$genre', count: { $count: {} } } },
        { $sort: { count: -1 } },
      ]);
  
      const genreCountData = genreCounts.map((genre) => ({
        genre: genre._id,
        songCount: genre.count,
      }));
  
      res.status(200).json(genreCountData);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred while fetching the song counts by genre.' });
    }
  };
  
  // Function to get the number of songs and albums for each artist
  export const getSongAndAlbumCountByArtist = async (req, res) => {
    try {
      const artistData = await songSchema.aggregate([
        { $group: { _id: '$artist', songCount: { $count: {} }, albumCount: { $addToSet: '$album' } } },
        { $project: { _id: 1, songCount: 1, albumCount: { $size: '$albumCount' } } },
        { $sort: { songCount: -1 } },
      ]);
  
      const artistCountData = artistData.map((artist) => ({
        artist: artist._id,
        songCount: artist.songCount,
        albumCount: artist.albumCount,
      }));
  
      res.status(200).json(artistCountData);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred while fetching the song and album counts by artist.' });
    }
  };

  export const getSongCountByAlbum = async (req, res) => {
    try {
        const albumCounts = await songSchema.aggregate([
          { $group: { _id: '$album', count: { $count: {} } } },
          { $sort: { count: -1 } },
        ]);
    
        const albumCountData = albumCounts.map((album) => ({
          album: album._id,
          songCount: album.count,
        }));
    
        res.status(200).json(albumCountData);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while fetching the song counts by album.' });
      }
    };