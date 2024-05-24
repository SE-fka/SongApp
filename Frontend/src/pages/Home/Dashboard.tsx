import React, { useEffect, useState } from "react";
import Section from '../../HOC/Section';
import axios from 'axios';
import ApiService from '../../redux/api/api';
import { Bar } from 'react-chartjs-2'
import { LineChart, PieChart, Pie, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title)

//API call from api.ts
const apiService = new ApiService();
const API_URL = apiService.getApi();

//class interface
interface TotalData {
  totalSongs: number;
  totalArtists: number;
  totalAlbums: number;
  totalGenres: number;
}

interface SongCountByGenre {
  genre: string;
  songCount: number;
}
interface SongCountByAlbum {
  album: string;
  songCount: number;
}

const Dashboard = () => {
  const [totalData, setTotalData] = useState<TotalData>({
    totalSongs: 0,
    totalArtists: 0,
    totalAlbums: 0,
    totalGenres: 0,
  });
  const [songCountByGenre, setSongCountByGenre] = useState<SongCountByGenre[]>([]);
  const [songAndAlbum, setSongAndAlbum] = useState([]);
  const [songCountByAlbum, setSongCountByAlbum] = useState<SongCountByAlbum[]>([]);

  useEffect(() => {
    getTotalCounts();
    getSongCountByGenre();
    getSongAndAlbumCountByArtist();
    getSongCountByAlbum();
  }, []);

  const getTotalCounts = async () => {
    try {
      const response = await axios.get(API_URL + 'getTotalCounts'); 
      setTotalData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error)
    }
  };

  const getSongCountByGenre = async () => {
    try {
      const response = await axios.get(API_URL + 'getSongCountByGenre');
      setSongCountByGenre(response.data);

    } catch (error) {
      console.error("Error fetching data:", error)
    }
  };

  const getSongAndAlbumCountByArtist = async () => {
    try {
      const response = await axios.get(API_URL + 'getSongAndAlbumCountByArtist');
      setSongAndAlbum(response.data);
    } catch (error) {
      console.error("Error fetching data:", error)
    }
  };

  const getSongCountByAlbum = async () => {
    try {
      const response = await axios.get(API_URL + 'getSongCountByAlbum');
      setSongCountByAlbum(response.data);
    } catch (error) {
      console.error("Error fetching data:", error)
    }
  };

   //Show total song, album, artist ans genre
   const getData = () => [
    { name: 'Total Songs', value: totalData.totalSongs },
    { name: 'Total Artists', value: totalData.totalArtists },
    { name: 'Total Albums', value: totalData.totalAlbums },
    { name: 'Total Genres', value: totalData.totalGenres },
  ];
  const COLORS = ['#3B5A9B', '#C2A3FF', '#00AEF0', '#db4f8e'];

  //Song count by album
  const songCountGenre = {
    labels: songCountByGenre.map((d) => d.genre),
    datasets: [
      {
        label: 'Total songs by genre',
        backgroundColor: 'rgba(219, 79, 142, 0.77)',
        borderColor: 'rgba(219, 79, 79, 0.77)',
        borderWidth: 2,
        data: songCountByGenre.map((d) => d.songCount),
      },
    ],
  };

  const ongsGenre_options = {
    scales: {
      x: {
        display: true,
        title: {
          display: true,
          text: 'Genres',
        },
      },
      y: {
        display: true,
        title: {
          display: true,
          text: 'Songs',
        },
      },
    },
  };

//Song count by album
  const songCountAlbum = {
    labels: songCountByAlbum.map((d) => d.album),
    datasets: [
      {
        label: 'Total songs by album',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
        borderColor: 'rgba(53, 162, 235, 0.5)',
        borderWidth: 2,
        data: songCountByAlbum.map((d) => d.songCount),
      },
    ],
  };

  const songsAlbum_options = {
    scales: {
      x: {
        display: true,
        title: {
          display: true,
          text: 'Albums',
        },
      },
      y: {
        display: true,
        title: {
          display: true,
          text: 'Songs',
        },
      },
    },
  };


  return (
    <Section id='services'>
   <div className='container pt-2 pb-5'>
     <div className='section-header pt-5 pb-5 text-center'>
       <h3 className='section-title'>
         <span>Overall </span> Statistics
       </h3>
     </div>
     <div className='section-content'>
       <div className='row'>
         <div className='col-md-12 col-lg-12 mb-3'>
         <hr />
        <h5 style={{textAlign:'center', color:'#56B1FD'}}>Total Number of Songs in Each Genre </h5>
         <Bar data={songCountGenre} options={ongsGenre_options}/> 
        </div> 
        <div className="col-md-12 col-lg-12 mb-3">
        <ResponsiveContainer width="100%" height={400}>
        <PieChart>
          <Pie
            data={getData()}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={100}
            fill="#8884d8"
            paddingAngle={5}
          >
            {getData().map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend verticalAlign="bottom" height={36} />
        </PieChart>
        </ResponsiveContainer>
       </div>
        <div className='col-md-12 col-lg-12 mb-3'>
          <hr />
        <h5 style={{textAlign:'center', color:'#56B1FD'}}>Total Number of Songs in Each Album </h5>
         <Bar data={songCountAlbum} options={songsAlbum_options}/> 
        </div>
        <div className='col-md-12 col-lg-12 mb-3'>
        <hr />
        <h5 style={{textAlign:'center', color:'#56B1FD'}}>Total Number of Songs and Albums in Each Artist s</h5>
         <ResponsiveContainer width="100%" height={400}>
         <LineChart data={songAndAlbum}>
         <XAxis dataKey="artist"/> {/* label={{ value: 'Artist name',  position: 'bottom', offset: 0}}  */}
         <YAxis type="number" domain={[0, 'dataMax']} label={{ value: 'Song and Album Count', angle: -90, position: 'insideLeft', offset: 0 }} />
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip />
        <Legend verticalAlign="top" height={36} />
        <Line type="monotone" dataKey="songCount" stroke="#8884d8" name="Song Count" legendType="line" />
       <Line type="monotone" dataKey="albumCount" stroke="#82ca9d" name="Album Count" legendType="line" />
       </LineChart>
       </ResponsiveContainer>
      </div>
       </div>
     </div>
   </div>

 </Section>
  )
}

export default Dashboard;