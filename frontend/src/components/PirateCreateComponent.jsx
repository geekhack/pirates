//import the libraries 
import React ,{useEffect, useRef, useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css'
import api from '../api/index'
import { Link } from "react-router-dom";

//create some styling for use in the form components
const listStyle={
    listStyleType: "none" 
}

const mystyle = {
    margin:100

  };

function PirateCreateComponent(){
    //definition of the state variables
    const [pirate_name, setName] = useState("")
    const [pirate_nameError, setPirateNameError] = useState("");
    const [pirate_position, setPosition] = useState("")
    const [pirate_positionError, setPiratePositionError] = useState("");
    const [pirate_treasure_chest, setTreasureChest] = useState(0)
    const [pirate_treasure_chestError, setPirateTreasureChestError] = useState(0);
    const [pirate_image, setImage] = useState("") 
    const [pirate_imageError, setPirateImageError] = useState("");  
    const [pirate_attributes, setAttributes] = useState([])
    const [pirate_attributesError, setPirateAttributesError] = useState([]);
    const [pirate_catch_phrase, setCatchPhrase] = useState("")
    const [pirate_catch_phraseError, setPirateCatchPhraseError] = useState("");  
 
    //definition of reference - inputs
    const pirate_nameRef = useRef(null)
    const pirate_positionRef = useRef(null)
    const pirate_treasure_chestRef = useRef(null)
    const pirate_imageRef = useRef(null)
    const pirate_attributesRef = useRef(null)
    const pirate_catch_phraseRef = useRef(null)
    
    //variable to manage the crew_position items
    const [options, setOptions] = useState([])
    const [isChecked, setIsChecked] = useState(false);
    const [captain, setFindCaptain] = useState(false);

    //to display the backend validation errors
    let backend_errors_array = []

    //checks if captain role has been added, if yes then displays the alternative list
    function checkCaptainRegistered(){
        const formdata1={
            position: 'Captain'
        }
        api.checkCaptain(formdata1).then(res=>{
          setFindCaptain(true)
          //if captain, then show show the first list otherwise, one with captain
          if((res.data.data).length >0){
            setOptions(["First Mate", "Quarter Master", "BoatSwain","Powder Monkey"])
   
          }
          else{
            setOptions(["Captain","First Mate", "Quarter Master", "BoatSwain","Powder Monkey"])
   
          }
          
        });

        
    }
    //array with pirates attributes
    let pirate_att_list =["Peg Leg","Eye Patch", "Hook Hand"]
    let data_array = []

    const [checkedState, setCheckedState] = useState(
                data_array
    );

    
    //handles the checkboxes of pirate attributes
    const handleOnChange = (e) => {

          const { value, checked } = e.target;

          if (checked) {
            setAttributes(
                  [...pirate_attributes, value], //add the pirate attributes
              );
              
          }
          else if(!checked){
            setAttributes(pirate_attributes.filter((e) => e !== value)) //remove the attribute
          
          }
          //check validation
          if(pirate_attributes.length < 1) {
            setPirateAttributesError(["Atlease one attribute is required!"]);
          }
          else {
               
                setPirateAttributesError([]);
          }
          
    }
    
    //handling of other variables on the form
    function handleName(e){
        setName(e.target.value)

        if(e.target.value.length < 1) {
            setPirateNameError("Name is required!");
        
        } else {
            
            setPirateNameError("");
        }

    }
    let handleCrewChange = (e)=>{
        setPosition(e.target.value);

        
        if(e.target.value.length < 1) {
            setPiratePositionError("Crew position is required!");
        
        } else {
            setPiratePositionError("");
        }
    }
    function handleImage(e){
        setImage(e.target.value)

        if(e.target.value.length < 1) {
            setPirateImageError("An Image URL is required!");
        
        } else {
            setPirateImageError("");
        }
    }
    function handleTresureChest(e){
        setTreasureChest(e.target.value)

        if(e.target.value.length < 1) {
            setPirateTreasureChestError("Atlease one Treasure chest is required!");
        
        } else {
            setPirateTreasureChestError(0);
        }
        
    }
    function handleAttributes(e){
        setAttributes(data_array)
        
    }
    function handleCatchPhrase(e){
        setCatchPhrase(e.target.value)

        if(e.target.value.length < 1) {
            setPirateCatchPhraseError("Give the pirate a cool phrase :(!");
        
        } else {
            setPirateCatchPhraseError("");
        }

    }

    //handling of submit - the form data
    async function handleSubmit(e){
        e.preventDefault();
      
        try{
        const formdata={
            pirate_name: pirate_name,
            pirate_position: pirate_position,
            pirate_treasure_chest: pirate_treasure_chest,
            pirate_catch_phrase: pirate_catch_phrase,
            pirate_image:pirate_image,
            pirate_attributes:pirate_attributes
        }
        //send the data to the server
       await api.insertPirate(formdata).then(res=>{
            alert('pirate added successfully')
       
       })
       console.log(formdata);
        
     }
     catch(error){
        //handling of the backend validation errors
        let x = Object.entries(Object.values(error.response.data)) 
        let error_object = x[1][1].split(",");
        
        for( let y of error_object){
            //let p = y.split(':')
            //let error_ = y.split(':').slice(-1)[0]            
            backend_errors_array.push(y.split(':').slice(-1)[0].replace('Path','')) //optimized this
        }

        if(backend_errors_array.length>0){
            alert(backend_errors_array)
        }
        
     }

    }

    useEffect(()=>
    checkCaptainRegistered(), [captain]
    )
    
   //display the pirate registeration form
    return(
        
            <div className="container" style={mystyle}>
            <div className="card">
            <div className="card-header">
            <span>
                <div className="row">
                    <div className="col-md-5">
                         <h2 style={{textAlign:"center"}}>Add Pirate</h2>
                    </div>
                    <div className="col-md-5">
                        <Link to="/list/pirate">
                         <button className="btn btn-primary float-right">Crew Board</button>
                        </Link>
                    </div>
                </div>
                
            </span>

            </div>
            <div className="card-body">
            <form className="row">
            <div className="col-md-5">
                         
                <label htmlFor="pirate_name">Pirate Name:</label>
                <input type="text"   ref={pirate_nameRef} className="form-control" onChange={handleName}  placeholder="Enter name"/>
                   <span className="error text-danger">{ pirate_nameError ? <p>{ pirate_nameError }</p> : '' } </span>
                <label htmlFor="pirate_image">Image Url:</label>
                <input type="text"   ref={pirate_imageRef} className="form-control" onChange={handleImage} placeholder="Enter URL"/>
                   <span className="error text-danger">{ pirate_imageError ? <p>{ pirate_imageError }</p> : '' } </span>
                <label htmlFor="pirate_treasure_chest"># of Treasure Chests:</label>
                <input type="number"   ref={pirate_treasure_chestRef} className="form-control" onChange={handleTresureChest} placeholder="Enter chest Number"/>
                  <span className="error text-danger">{ Number(pirate_treasure_chestError.length)<1 ? <p>{ pirate_treasure_chestError }</p> :'' } </span>
                <label htmlFor="pirate_treasure_chest">Catch Phrase:</label>
                <input type="text"  ref={pirate_catch_phraseRef} className="form-control" onChange={handleCatchPhrase} placeholder="Enter catch phrase"/>
                  <span className="error text-danger"> { pirate_catch_phraseError ? <p>{ pirate_catch_phraseError }</p> : '' } </span>
            </div>
             
            <div className="col-md-5">
              
                <label htmlFor="pirate_position">Crew Position</label>
                
                <select className="form-control" onChange={(e)=>handleCrewChange(e)}>
                {options.map((option,index) => (
                <option key={index} value={option}>{option}</option>
                ))}
                </select>
                   <span className="error text-danger">{ pirate_positionError ? <p>{ pirate_positionError }</p> : '' } </span>
                <p></p>
                
               
                {pirate_att_list.map((pt, index) => (
                   
                  <li  key={index} style={listStyle}> 
                    <input type="checkbox" id={`custom-checkbox-${index}`}
                    name={pirate_attributes}  value={pt} 
                    defaultChecked={true}
                    checked={checkedState[index]}
                    onChange={handleOnChange}
                  />{pt}
                  </li>
                  ))}
                   <span className="error text-danger">{ (pirate_attributesError.length)<1 ? <p>{ pirate_attributesError }</p> :"" }</span>
                <p></p>
                {
                    (pirate_catch_phraseError)?
                    <button type="submit" onClick={handleSubmit}  className="btn btn-primary" disabled>Add Pirate</button> 
                    :  
                    <button type="submit" onClick={handleSubmit}  className="btn btn-primary">Add Pirate</button>
                }
               </div>
            </form>
            </div>
            </div>
            
        </div>
    )
}

export default PirateCreateComponent