import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Section from "../../HOC/Section";
import { RootState } from "../../redux/store/store";
import {
  loadSongs,
  deleteSong,
  getSongById,
} from "../../redux/actions/songActions";
import { Song } from "../../redux/actions/songTypes";
import LoadingSpinner from "../LoadingSpinner";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SongList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { songs } = useSelector((state: RootState) => state.songs);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  const [query, setGenre] = useState<string>("");

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        setIsLoading(true);
        dispatch(loadSongs()); 
        setIsLoading(false);
      } catch (err) {
        setIsLoading(false);
        if (err instanceof Error) {
          setError(err);
        }
      }
    };

    fetchSongs();
    // eslint-disable-next-line
  }, [dispatch]);

  //Display sort data
  const sortedData = songs.slice().reverse();

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
    } else {
      toast.success("Delete song Error");
    }
  };

  const handleGenreChange = () => {
    navigate(`/song/genre?genre=${query}`, { state: { query } });
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
                  <form
                    onSubmit={handleGenreChange}
                    className="d-flex align-items-center"
                  >
                    <div className="form-group mr-3" style={{ flexGrow: 1 }}>
                      <input
                        type="text"
                        className="form-control rounded-0"
                        placeholder="Enter Genre..."
                        value={query}
                        onChange={(e) => setGenre(e.target.value)}
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
                </div>
              </div>
            </div>

            <h3 className="section-title">
              <span>List </span> All Songs
            </h3>
          </div>
          <div className="row">
            {sortedData.map((song: Song, index) => (
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
          </div>
          {error ? (
            <div>
              {error.message && (
                <>
                  <small
                    style={{
                      color: "red",
                      textAlign: "center",
                      display: "block",
                    }}
                  >
                    {error.message}
                  </small>
                  <br />
                </>
              )}
              <br />
            </div>
          ) : (
            <>
              {isLoading ? (
                <LoadingSpinner />
              ) : (
                <>
                  {songs.length === 0 && (
                    <div className="col-md-12 col-lg-12 mb-6">
                      <div className="service-box d-flex">
                        <div className="service-icon mr-4">
                          <small>
                            Result Not Found
                          </small>
                        </div>
                      </div>
                    </div>
                  )}
                </>
              )}
            </>
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

export default SongList;
