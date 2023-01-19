//import the libraries
import React, {useState, useEffect} from 'react'
import { useNavigate, useParams,Link } from 'react-router-dom'
import api from '../api/index'
import 'bootstrap/dist/css/bootstrap.min.css'

import svg from '../logo.svg'

//instantiate the css
const mystyle = {
    margin:100

  };

function PirateView(){
    const navigate =  useNavigate;
 
    //create the state variables
    const [pirate_name, setName] = useState("")
    const [pirate_position, setPosition] = useState(0)
    const [pirate_treasure_chest, setTreasureChest] = useState(0)
    const [pirate_image, setImage] = useState("")    
    const [pirate_attributes, setAttributes] = useState([])
    const [pirate_catch_phrase, setCatchPhrase] = useState("")
    const [id, setId] = useState("")

    //create variables to monitor the pirate attributes
    const[peg, setPegState]= useState(false);
    const[hook, setHookState]= useState(false);
    const[eye, setEyeState]= useState(false);

    const { id1 } = useParams();
    const[checkupdate, SetUpdate] =useState(false)



    //get the pirate data -1 pirate data
    async function getPirateData(){
        api.getPirateById(id1).then(res=>{
            //const formdata ={
         setId(id1)
         setName(res.data.data.pirate_name)
         setPosition(res.data.data.pirate_position)
         setImage(res.data.data.pirate_image) 
         setAttributes(res.data.data.pirate_attributes)
         setCatchPhrase(res.data.data.pirate_catch_phrase)
         setTreasureChest(res.data.data.pirate_treasure_chest)
            
 
         }).catch(error=>{
             console.log("error")
         })
    }
    useEffect(()=>{
      
        getPirateData();
        
       
    },[peg,hook,eye])

   
     //handle the pirate attributes on button click for PegandLeg,Eye and Hook

     async function changePeg(id,other,val) {
           
            //remove the item from the list
            if(val===1){
                var index = pirate_attributes.indexOf(other);
                if (index !== -1) {
                    pirate_attributes.splice(index, 1);
                }
                setAttributes(pirate_attributes)
                // console.log(pirate_attributes)
                //setAttributes(pirate_attributes.filter((e) => e !== other))
                const formdata={
                    id: id,
                    pirate_name: pirate_name,
                    pirate_position: pirate_position,
                    pirate_treasure_chest: pirate_treasure_chest,
                    pirate_catch_phrase: pirate_catch_phrase,
                    pirate_image:pirate_image,
                    pirate_attributes:pirate_attributes
                } 
                //send the data to the server
                await api.updatePirateById(formdata.id, formdata).then(res=>{
                    setPegState(true)       
               })
                
            }
            else if(val===0){
                //check if its there
                if(!pirate_attributes.includes(other)){
                    pirate_attributes.push(other)
                }               
                
                setAttributes(pirate_attributes)
             
                                
                const formdata={
                    id: id,
                    pirate_name: pirate_name,
                    pirate_position: pirate_position,
                    pirate_treasure_chest: pirate_treasure_chest,
                    pirate_catch_phrase: pirate_catch_phrase,
                    pirate_image:pirate_image,
                    pirate_attributes:pirate_attributes
                } 
                //send the data to the server
                await api.updatePirateById(formdata.id, formdata).then(res=>{
                    setPegState(false)            
               })
            }

            
           
            
        
           
    }
    async function changeEye(id,other,val) {
           
        //remove the item from the list
        if(val===1){
            var index = pirate_attributes.indexOf(other);
            if (index !== -1) {
                pirate_attributes.splice(index, 1);
            }
            setAttributes(pirate_attributes)
            // console.log(pirate_attributes)
            //setAttributes(pirate_attributes.filter((e) => e !== other))
            const formdata={
                id: id,
                pirate_name: pirate_name,
                pirate_position: pirate_position,
                pirate_treasure_chest: pirate_treasure_chest,
                pirate_catch_phrase: pirate_catch_phrase,
                pirate_image:pirate_image,
                pirate_attributes:pirate_attributes
            } 
            //send the data to the server
            await api.updatePirateById(formdata.id, formdata).then(res=>{
                setEyeState(true)       
           })
            
        }
        else if(val===0){
            //check if its there
            if(!pirate_attributes.includes(other)){
                pirate_attributes.push(other)
            }               
            
            setAttributes(pirate_attributes)
         
                            
            const formdata={
                id: id,
                pirate_name: pirate_name,
                pirate_position: pirate_position,
                pirate_treasure_chest: pirate_treasure_chest,
                pirate_catch_phrase: pirate_catch_phrase,
                pirate_image:pirate_image,
                pirate_attributes:pirate_attributes
            } 
            //send the data to the server
            await api.updatePirateById(formdata.id, formdata).then(res=>{
                setEyeState(false)            
           })
        }

        
       
        
    
       
}
    async function changeHandHook(id,other,val) {
           
        //remove the item from the list
        if(val===1){
            var index = pirate_attributes.indexOf(other);
            if (index !== -1) {
                pirate_attributes.splice(index, 1);
            }
            setAttributes(pirate_attributes)
            // console.log(pirate_attributes)
            //setAttributes(pirate_attributes.filter((e) => e !== other))
            const formdata={
                id: id,
                pirate_name: pirate_name,
                pirate_position: pirate_position,
                pirate_treasure_chest: pirate_treasure_chest,
                pirate_catch_phrase: pirate_catch_phrase,
                pirate_image:pirate_image,
                pirate_attributes:pirate_attributes
            } 
            //send the data to the server
            await api.updatePirateById(formdata.id, formdata).then(res=>{
                setHookState(true)       
           })
            
        }
        else if(val===0){
            //check if its there
            if(!pirate_attributes.includes(other)){
                pirate_attributes.push(other)
            }               
            
            setAttributes(pirate_attributes)
         
                            
            const formdata={
                id: id,
                pirate_name: pirate_name,
                pirate_position: pirate_position,
                pirate_treasure_chest: pirate_treasure_chest,
                pirate_catch_phrase: pirate_catch_phrase,
                pirate_image:pirate_image,
                pirate_attributes:pirate_attributes
            } 
            //send the data to the server
            await api.updatePirateById(formdata.id, formdata).then(res=>{
                setHookState(false)            
           })
        }

        
       
        
    
       
}
     
    //pirates attributes to loop
    let pirate_att_list =["Peg Leg","Eye Patch", "Hook Hand"]

    //display the card with the pirate details
    return(
        
        <div className="container" style={mystyle}>
        <div className="card">
        <div className="card-header">
        <span>
            <div className="row">
                <div className="col-md-5">
                     <h2 style={{textAlign:"center"}}>{pirate_name}</h2>
                </div>
                
            </div>
            
        </span>

        </div>
        <div className="card-body">
        <form className="row">
        <div className="col-md-5">
        <img src={svg} width="200" height="200" />
         <h2>"{pirate_catch_phrase}"</h2>            
           
        </div>
         
        <div className="col-md-5">
            <h2>About</h2>
            <p>Position: {pirate_position}</p>
            <p>Treasures: {pirate_treasure_chest}</p>
            <p>Peg Leg: 
                {pirate_attributes.includes('Peg Leg')?<span> Yes<button type='button' className='btn btn-danger' onClick={()=>changePeg(id,"Peg Leg",1)}>No</button></span>: <span> No   <button className='btn btn-success' type='button' onClick={()=>changePeg(id,"Peg Leg",0)}>Yes</button></span> }
            </p>
            <p>Eye Patch: 
            {pirate_attributes.includes('Eye Patch')? <span> Yes<button type='button' className='btn btn-danger' onClick={()=>changeEye(id,"Eye Patch",1)}>No</button></span>: <span> No   <button className='btn btn-success' type='button' onClick={()=>changeEye(id,"Eye Patch",0)}>Yes</button></span> }
            </p>
            <p>Hand Hook: 
            {pirate_attributes.includes('Hand Hook')? <span> Yes<button type='button' className='btn btn-danger' onClick={()=>changeHandHook(id,"Hand Hook",1)}>No</button></span>: <span> No   <button className='btn btn-success' type='button' onClick={()=>changeHandHook(id,"Hand Hook",0)}>Yes</button></span> }
              
            </p>
            <Link to={'/list/pirate'}>
             <button type="submit" className="btn btn-success">Back</button>
            </Link>
           </div>
        </form>
        </div>
        </div>
        
    </div>
    )
}

export default PirateView