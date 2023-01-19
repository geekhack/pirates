//import the libraries
import React, {useState} from 'react'
import api from '../api/index'
import 'bootstrap/dist/css/bootstrap.min.css'
import { useEffect } from 'react'
import PirateUpdate from './PirateUpdate'
import { Link, Navigate, renderMatches, useNavigate } from 'react-router-dom'
import { BrowserRouter as Router, Routes, Route,useParams } from 'react-router-dom';
import { Button } from 'bootstrap'
import { set } from 'mongoose/lib/driver'
import svg from '../logo.svg'

//hadling stylin on the list of cards
const mystyle = {
    margin:100

  };


function PiratesListComponent(props){
    //state variables definitions
    const[pirates, setPirates] = useState([])
    const{id1} = useParams();

     
    //retrieving pirates
    async function handleGetPirates(){

       await api.getAllPirates().then(res=>{
            //console.log(res.data.data)
            setPirates(res.data.data)
            //sort the pirate alphabetically
        
           
        }).catch((err) => console.log(err));
    }
    
    //to the view of the pirate --can be improved through quering data by the params -id
    function handleUpdate(prod){
        localStorage.setItem('id', prod._id)
        localStorage.setItem('title',prod.title)
        localStorage.setItem('price', prod.price)
        localStorage.setItem('description', prod.description)

    }
    //deleting pirate
    function  handleDeletePirate(id){
        
      //alert('hello there '+id);
      if(window.confirm("Are you sure in deleting this pirate?")){
             api.deletePirateById(id).then(res=>{
                //alert("deleted")
                console.log(id);
                handleGetPirates(); //not to refresh
            })
        
      }
      else{
        alert('delete suspended');
      }
    }

    useEffect(()=>{ 

        handleGetPirates();  

    },    
    []);  
    
    //show the cards
     return(
        <div className='container' style={mystyle}>
        <div className="card">
            <div className="card-header">
            <span>
                <div className="row">
                    <div className="col-md-5">
                         <h2 style={{textAlign:"center"}}>Pirate Crew</h2>
                    </div>
                    <div className="col-md-5">
                        <Link to="/create">
                         <button className="btn btn-primary float-right">Add Pirate</button>
                        </Link>
                    </div>
                </div>
                
            </span>

            </div>
        
                   
                 {pirates.sort(function(a, b) {
                    //return the list in alphabetical order ------
                    if(a.pirate_name.toLowerCase() < b.pirate_name.toLowerCase()) return -1;
                    if(a.pirate_name.toLowerCase() > b.pirate_name.toLowerCase()) return 1;
                    return 0;
                    }).map((prt, index) => (
                  <li key={index} style={ {listStyleType: "none",margintop:30}}>
                    <div className="card-body" style={ {margintop:50}}>
                    <div className="row">
                                <span>{prt.pirate_name}</span>
                         
                                <div className="col-md-3">
                                <img src={svg} width="100" height="50" />                                
                                </div>
                                <div className="col-md-3">
                                        <Link to={`/pirate/${prt._id}`}>
                                                <button className='btn btn-primary' onClick={()=>handleUpdate(prt)}>View Pirate</button>
                                        </Link>
                                                                
                                </div>
                                <div className="col-md-3">
                                        <button className='btn btn-danger' onClick={()=>handleDeletePirate(prt._id)}>Walk the PLank</button>
                                </div>                                              
                            
                    
                    </div>
                    <hr/>
                  </div>
                  </li>     
                  ))}
            
        </div></div>
    )
}

export default PiratesListComponent