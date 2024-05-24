import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ApiService from '../../redux/api/api';
import { useNavigate, useParams } from 'react-router-dom';
import Section from '../../HOC/Section';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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

const UpdateSong: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [song, setSong] = useState<Song>({
    id: '',
    title: '',
    artist: '',
    album: '',
    genre: '',
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSongById = async () => {
      try {
        const response = await axios.get<Song>(API_URL + `getSong/${id}`);
        setSong(response.data);
      } catch (error) {
        console.error('Error fetching song:', error);
      }
    };

    fetchSongById();
  }, [id]);

  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await axios.put(API_URL + `updateSong/${id}`, song);
      toast.success('Update song success');
      navigate('/song/lists');
    } catch (error) {
      toast.success(' Updating song Error');
    }
  };

  return (
    <Section id="contact">
    <div style={{ paddingTop: '6%' }}>
      <div className="container pt-2 pb-5">
        <div className="section-header pt-5 pb-5 text-center">
          <h3 className="section-title">
            <span>Update </span>Song
          </h3>
        </div>
        
        <div className="section-content">
          <div className="row">
            <div className="col-md-9 col-lg-7 mr-auto ml-auto">
              <form onSubmit={handleUpdate}>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control rounded-0"
                    placeholder="Enter Title..."
                    value={song.title}
                    onChange={(e) => setSong({ ...song, title: e.target.value })}
                    required
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control rounded-0"
                    placeholder="Enter Artist..."
                    value={song.artist}
                    onChange={(e) => setSong({ ...song, artist: e.target.value })}
                    required
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control rounded-0"
                    placeholder="Enter Album..."
                   value={song.album}
                   onChange={(e) => setSong({ ...song, album: e.target.value })}
                    required
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control rounded-0"
                    placeholder="Enter Genre..."
                    value={song.genre}
                    onChange={(e) => setSong({ ...song, genre: e.target.value })}
                    required
                  />
                </div>
                <div className="form-group text-center">
                  <button className="btn btn-block btn-primary rounded-0 mr-auto ml-auto">
                    Update
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
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
    <ToastContainer />
  </Section>
  );
};
export default UpdateSong;