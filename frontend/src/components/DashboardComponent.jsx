//libraries importation
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
import PiratesHomeComponent from './PiratesHomeComponent'

//css styling
const mystyle = {
    margin:100

  };


function DashboardComponent(props){

    const navigate = useNavigate() //to assist in navigation

    //state variables
    const[username, setUsername] = useState([])
    const[token, setToken] = useState([])
    
    
    //method for retrieving use profile
    async function handleGetProfile(){     

        setToken(localStorage.getItem('token'))
        setUsername(localStorage.getItem('username'))
    
       await api.getUserProfile().then(res=>{
            console.log(res.data)
            //sort the pirate alphabetically        
           
        }).catch((err) => console.log(err));
    }

    //logout functionality
    const logOut = (e)=>{
        localStorage.clear();
        navigate('/')
    };

 
    //the useeffect hook
    useEffect(()=>{ 

        handleGetProfile();  

    },    
    []);  

    //use a card with some user details(logged in) and two links
     return(
        <div className='container' style={mystyle}>
        <div className="card">
            <div className="card-header">
            <span>
                <div className="row">
                    <div className="col-md-5">
                         <h2 style={{textAlign:"center"}}>Welcome {username}</h2>
                    </div>
                    <div className="col-md-5">
                       
                         <button className="btn btn-primary float-right" onClick={(e)=>logOut(e)}>Logout</button>
                        
                    </div>
                </div>
                
            </span>

            </div>
        
               
                    <div className="card-body" style={ {margintop:50}}>
                    <div className="row">
                    
                     <div className='col-md-4'>
                        <Link to="/create">
                         <h3 className="">Add Pirate</h3>
                        </Link>
                     </div>
                     <div className='col-md-4'>
                     <Link to="/list/pirate">
                         <h3 className="">View Pirates</h3>
                        </Link>
                     </div>                                                          
                            
                    
                    </div>
                
                  </div>
             
            
        </div></div>
    )
}

export default DashboardComponent