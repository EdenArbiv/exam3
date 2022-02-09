import React, { useEffect, useState } from 'react';
import ServerCard from './ServerCard';
import Checkbox from '@mui/material/Checkbox';

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

export default function ServersList() {

    const [servers, setservers] = useState([]);
    const [check, setcheck] = useState(false);
    const [update, setupdate] = useState(false);
  
   
    useEffect(() => {
      (async () => {
      const res = await fetch(`http://localhost:1000/api/servers/${check?"online":""}`)
      const data = await res.json();
      setservers(data);
      console.log(data)
    })()
  
    }, [update, check]);

  
    
  return <div className='main'>
      <Checkbox  onChange={e=> setcheck(e.target.checked)} {...label} checked={check ? true : false} /> 
      {check ? <h5>Click to see All Servers</h5> : <h5>Click to see Online Servers</h5>} 
      
      <div className='list'>
      {
          servers && servers.map(server => <ServerCard key={server.id} server={server} setupdate={setupdate}/>)
      }
      </div>
  </div>
}
