import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addSong } from '../../redux/actions/songActions';
import Section from '../../HOC/Section';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddSong = () => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState('');
  const [artist, setArtist] = useState('');
  const [album, setAlbum] = useState('');
  const [genre, setGenre] = useState('');

 
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
    const newSong = { title, artist, album, genre };
    dispatch(addSong(newSong));
    toast.success('Add song success');
  } catch (error) {
    toast.success(' Add song Error');
  }
  setTitle('');
  setArtist('');
  setAlbum('');
  setGenre('');
  };

  return (
    <Section id='contact'>
      <div style={{ paddingTop: '6%' }}>
        <div className='container pt-2 pb-5'>
          <div className='section-header pt-5 pb-5 text-center'>
            <h3 className='section-title'>
              <span>Add </span>Song
            </h3>
          </div>
          <div className='section-content'>
            <div className='row'>
              <div className='col-md-9 col-lg-7 mr-auto ml-auto'>
                <form onSubmit={handleSubmit}>
                  {/* Form fields */}
                  <div className='form-group'>
                    <input
                      type='text'
                      className='form-control rounded-0'
                      placeholder='Enter Title...'
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      required
                    />
                  </div>
                  <div className='form-group'>
                    <input
                      type='text'
                      className='form-control rounded-0'
                      placeholder='Enter Artist...'
                      value={artist}
                      onChange={(e) => setArtist(e.target.value)}
                      required
                    />
                  </div>
                  <div className='form-group'>
                    <input
                      type='text'
                      className='form-control rounded-0'
                      placeholder='Enter Album...'
                      value={album}
                      onChange={(e) => setAlbum(e.target.value)}
                      required
                    />
                  </div>
                  <div className='form-group'>
                    <input
                      type='text'
                      className='form-control rounded-0'
                      placeholder='Enter Genre...'
                      value={genre}
                      onChange={(e) => setGenre(e.target.value)}
                      required
                    />
                  </div>
                  <div className='form-group text-center'>
                    <button className='btn btn-block btn-primary rounded-0 mr-auto ml-auto'>
                      Add
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
    </Section>
  );
};

export default AddSong;