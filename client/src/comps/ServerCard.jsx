import React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Switch from '@mui/material/Switch';


const label = { inputProps: { 'aria-label': 'Switch demo' } };


export default function ServerCard({server, setupdate}) {

    const ChangeStatus = async (serverid, serverstatus) => {
        const res = await fetch(`http://localhost:1000/api/server/status`,{
            method: "put",
            headers: {'content-type':'application/json'},
            body:JSON.stringify({serverid, serverstatus}),
        })
        const data = await res.json();
        if(res.status == 400){
            alert(data.err)
        }else{ 
        console.log(data.msg);
        setupdate(up => !up)   
        }
      
    }

  return <div className='card'>
       <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography variant="h5" component="div">
          {server.name}
        </Typography>
        <Typography sx={{ mb: 1.5}} color="text.secondary">
          IP Address: {server.IP}
        </Typography>
        <Typography variant="body2">
            Company: {server.company}
          <br /><br />
          created in: {new Date(server.date).toLocaleDateString()}
        </Typography>
      </CardContent>
      <CardActions>
      <Switch {...label} onClick={()=> ChangeStatus(server.id, server.status)} checked={server.status ?  true : false }/>
      {server.status ?  <h5>Online</h5> : <h5>Offline</h5> }
      </CardActions>
    </Card>
  </div>;
}
