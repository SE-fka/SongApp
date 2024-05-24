import React from 'react'
import Section from '../../HOC/Section';
import Link from '../../components/UI/Link/Link';


const Main = () => {
  return (
    <Section id='home'>
    <div>
       <div className='home-content p-5'>
         <div className='intro container text-left text-light'>
         <h2 className='sub-title mb-4'>
           
          </h2>
           <h6 className='title'> MERN Stack create, list, update, and delete songs web app.
           </h6>
          <br />
           <Link target='song/add' classes='btn btn-primary rounded-0 mr-4'>
             Add Songs
             </Link> 
          
         </div>
       </div>
       
     </div>
     
   </Section>
  )
}

export default Main