import React, { useEffect, useState } from "react";
import Section from '../../HOC/Section';
import axios from 'axios';
import CountUp from "react-countup";
import ApiService from '../../redux/api/api';

//API call from api.ts
const apiService = new ApiService();
const API_URL = apiService.getApi();

interface TotalData {
  totalSongs: number;
  totalArtists: number;
  totalAlbums: number;
  totalGenres: number;
}

const Facts = () => {
  const [totalData, setTotalData] = useState<TotalData | null>(null);
 
  useEffect(() => {
    getTotalCounts();
  }, []);

  const getTotalCounts = async () => {
    try {
      const response = await axios.get(API_URL + 'getTotalCounts');
      setTotalData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error)
    }
  };

  return (
    <Section id='facts'>
      <div
        className='facts-container'
      >
        <div className='container pt-5 pb-4'>
          <div className='row'>
          {totalData && (
            <div className='col-sm-6 col-md-3 text-center mb-4'>
              <div className='mb-2 facts-icon'>
                <i className='fas fa-users' />
              </div>
              <h4 className='facts-counter text-light'>  
              <CountUp
                    start={0}
                    end={totalData.totalSongs}
                    duration={1}/>
              </h4>
              <h5 className='facts-title text-light'>Total Songs</h5>
            </div>
            )}
            {totalData && (
            <div className='col-sm-6 col-md-3 text-center mb-4'>
              <div className='mb-2 facts-icon'>
                <i className='fas fa-grin-beam' />
              </div>
              <h4 className='facts-counter text-light'>
              <CountUp
                    start={0}
                    end={totalData.totalAlbums}
                    duration={1}/>
                </h4>
              <h5 className='facts-title text-light'>Total Artists </h5>
            </div>
            )}
            {totalData && (
            <div className='col-sm-6 col-md-3 text-center mb-4'>
              <div className='mb-2 facts-icon'>
                <i className='fas fa-project-diagram' />
              </div>
              <h4 className='facts-counter text-light'>  
              <CountUp
                    start={0}
                    end={totalData.totalArtists}
                    duration={1}/>
                    </h4>
              <h5 className='facts-title text-light'>Total Albums</h5>
            </div>
            )}
            {totalData && (
            <div className='col-sm-6 col-md-3 text-center mb-4'>
              <div className='mb-2 facts-icon'>
                <i className='fas fa-trophy' />
              </div>
              <h4 className='facts-counter text-light'>
              <CountUp
                    start={0}
                    end={totalData.totalGenres}
                    duration={1}/>
                    </h4>
              <h5 className='facts-title text-light'>Total Genres</h5>
            </div>
            )}
          </div>
        </div>
      </div>
    </Section>
  );
};

export default Facts;
