import React, { useState, useEffect } from "react";
import axios from "axios";
import ApiService from "../../redux/api/api";
import { useDispatch } from "react-redux";
import Section from "../../HOC/Section";
import { useNavigate } from "react-router-dom";
import { deleteSong, getSongById } from "../../redux/actions/songActions";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//API call from api.ts
const apiService = new ApiService();
const API_URL = apiService.getApi();

interface Song {
  id: string;
  title: string;
  artist: string;
  album: string;
  genre: string;
}

const SongsByGenre: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [songs, setSongs] = useState<Song[]>([]);
  const [searchData, setSearchData] = useState<Song[]>([]);
  const [input, setInput] = useState<string>("");

  const fetchSongsByGenre = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.get<Song[]>(API_URL + `searchSong/${input}`);
      setSongs(response.data);
      setSearchData(response.data);
    } catch (error) {
      console.error(error);
    }
    navigate(`/song/genre?genre=${input}`);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
    const filteredSongs = searchData.filter((song) =>
      song.title.toLowerCase().includes(event.target.value.toLowerCase())
    );
    setSongs(filteredSongs);
  };

  useEffect(() => {
    const fetchSongByGenre = async () => {
      const query = new URLSearchParams(window.location.search);
      const genre = query.get("genre");
      if (genre) {
        try {
          const response = await axios.get<Song[]>(
            API_URL + `searchSong/${genre}`
          );
          setSongs(response.data);
        } catch (error) {
          console.error("Error fetching song:", error);
        }
      }
    };

    fetchSongByGenre();
  }, []);

  const handleEdit = (id?: string) => {
    if (id) {
      navigate(`/song/edit/${id}`, { state: { id } });
      dispatch(getSongById(id));
    } else {
      console.error("Cannot edit song without an ID");
    }
  };

  const handleDelete = (id?: string) => {
    if (id) {
      dispatch(deleteSong(id));
      toast.success("Delete song  success");
      navigate('/song/lists')
    } else {
      toast.success("Delete song Error");
    }
  };

  return (
    <Section id="contact">
      <div className="container pt-2 pb-5">
        <div className="section-header pt-5 pb-5 text-center"></div>
        <div className="section-content">
          <div className="section-header pt-5 pb-5 text-center">
            <div className="section-content">
              <div className="row">
                <div className="col-md-9 col-lg-7 mr-auto ml-auto">
                <br />
                  <form
                    onSubmit={fetchSongsByGenre}
                    className="d-flex align-items-center"
                  >
                    <div className="form-group mr-3" style={{ flexGrow: 1 }}>
                      <input
                        type="text"
                        className="form-control rounded-0"
                        placeholder="Enter Genre..."
                        value={input}
                        onChange={handleInputChange}
                        required
                        style={{ width: "100%" }}
                      />
                    </div>
                    <div className="form-group">
                      <button className="btn btn-block btn-primary rounded-0">
                        Search
                      </button>
                    </div>
                  </form>
                  <br />
                  <br />
                </div>
              </div>
            </div>
            <h3 className="section-title">
              <span>List </span> Songs by Genre
            </h3>
          </div>
          <div className="row">
            {songs ? (
              <>
                {songs.map((song: Song, index) => (
                  <div className="col-md-12 col-lg-6 mb-3" key={index}>
                    <div className="service-box d-flex">
                      <div className="service-icon mr-4">
                        <i className="fas fa-music" style={{ color: "red" }} />
                      </div>
                      <div className="service-body">
                        <h4 style={{ color: "#248EFF" }}>
                          <b>Title: {song.title}</b>
                        </h4>
                        <h6>
                          {" "}
                          <b>Artist: {song.artist}</b>
                        </h6>
                        <h6>
                          <b>Album: {song.album}</b>
                        </h6>
                        <h6>
                          <b>Genre: {song.genre}</b>
                        </h6>
                        <hr />
                        <div>
                          <button
                            className="btn btn-info rounded-0 mr-4"
                            onClick={() => handleEdit(song.id)}
                          >
                            UPDATE
                          </button>
                          <button
                            className="btn btn-danger rounded-0 mr-4"
                            onClick={() => {
                              if (
                                window.confirm(
                                  "❌ Are you sure you wish to delete this song?"
                                )
                              )
                                handleDelete(song.id);
                            }}
                          >
                            DELETE
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </>
            ) : (
              <>
                {searchData.map((song: Song, index) => (
                  <div className="col-md-12 col-lg-6 mb-3" key={index}>
                    <div className="service-box d-flex">
                      <div className="service-icon mr-4">
                        <i className="fas fa-music" style={{ color: "red" }} />
                      </div>
                      <div className="service-body">
                        <h4 style={{ color: "#248EFF" }}>
                          <b>Title: {song.title}</b>
                        </h4>
                        <h6>
                          {" "}
                          <b>Artist: {song.artist}</b>
                        </h6>
                        <h6>
                          <b>Album: {song.album}</b>
                        </h6>
                        <h6>
                          <b>Genre: {song.genre}</b>
                        </h6>
                        <hr />
                        <div>
                          <button
                            className="btn btn-info rounded-0 mr-4"
                            onClick={() => handleEdit(song.id)}
                          >
                            UPDATE
                          </button>
                          <button
                            className="btn btn-danger rounded-0 mr-4"
                            onClick={() => {
                              if (
                                window.confirm(
                                  "❌ Are you sure you wish to delete this song?"
                                )
                              )
                                handleDelete(song.id);
                            }}
                          >
                            DELETE
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>
          {songs.length === 0 && (
            <div className="col-md-12 col-lg-12 mb-6">
              <div className="service-box d-flex">
                <div className="service-icon mr-4">
                  <small>
                    Search Not Found
                  </small>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </Section>
  );
};

export default SongsByGenre;
