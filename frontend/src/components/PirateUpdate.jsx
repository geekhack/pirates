import React, {useState, useEffect} from 'react'
import { useNavigate, useParams,Link } from 'react-router-dom'
import api from '../api/index'
import 'bootstrap/dist/css/bootstrap.min.css'


function PirateUpdate(){
    const navigate =  useNavigate;

    const [pirate_name, setName] = useState("")
    const [pirate_position, setPosition] = useState(0)
    const [pirate_treasure_chest, setTreasureChest] = useState(0)
    const [pirate_image, setImage] = useState("")    
    const [pirate_attributes, setAttributes] = useState(0)
    const [pirate_catch_phrase, setCatchPhrase] = useState("")
    const [id, setId] = useState("")

    const { id1 } = useParams();
    const[checkupdate, SetUpdate] =useState(false)


    async function handleSubmit(e){
        e.preventDefault();
        //alert("hallo there")
        try{
        const formdata={
            pirate_name: pirate_name,
            pirate_position: pirate_position,
            pirate_image:pirate_image,
            pirate_attributes:pirate_attributes
        } 
        //send the data to the server
        await api.updatePirateById(formdata.id, formdata).then(res=>{
            alert('pirate updated successfully')
            SetUpdate(true)
            
       }) 
        
     }
     catch(error){
        console.log(error)
     }

    }


    //get the values from the url
    //get the data through axios
    async function getProductData(){
        api.getProductById(id1).then(res=>{
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
        if(checkupdate){
            navigate('/list/pirate')
        }
        getProductData();
        
       
    },[checkupdate])

   
    function handleName(e){
        setName(e.target.value)

    }
    function handlePosition(e){
        setPosition(e.target.value)
    }
    function handleImage(e){
        setImage(e.target.value)
    }
    function handleTresureChest(e){
        setImage(e.target.value)
    }
    function handleAttributes(e){
        setAttributes(e.target.value)
    }
    function handleCatchPhrase(e){
        setCatchPhrase(e.target.value)
    } 
  

    
    //pirates attributes to loop
    let pirate_att_list =["Peg Leg","Eye Patch", "Hook Hand"]

    return(
        
        <div className="card fieldset Spacer">
            <table>
                <tbody>
                    <tr>
                        <td>
                            <Link to={'/list/product'}>Product List</Link>
                        </td>
                        <td>
                            <Link to={'/create'}> Create Product</Link>
                        </td>
                    </tr>

                </tbody>
                    
            </table>
            <form className="form">
                <label htmlFor="pirate_name">Pirate Name:</label>
                <input type="text" className="form-control" onChange={handleName}  placeholder="enter name"/>
                <label htmlFor="pirate_image">Image Url:</label>
                <input type="text"  className="form-control" onChange={handleImage} placeholder="enter url"/>
                <label htmlFor="pirate_treasure_chest"># of Treasure Chests:</label>
                <input type="number" className="form-control" onChange={handleTresureChest} placeholder="enter description"/>
                <label htmlFor="pirate_position">Crew Position</label>
                <select className="form-control" onChange={handleTresureChest} >
                    <option value="captain">Captain</option>
                    <option value="first_mate">First Mate</option>
                    <option value="quarter_master">Quarter Master</option>
                    <option value="boatswain">Boatswain</option>
                    <option value="powder_monkey">Powder Monkey</option>
                </select>
                {pirate_att_list.map((pt, index) => (
                   
                  <input type="checkbox">{pt}</input>
                  ))}
                <button type="submit" onClick={handleSubmit}  className="btn btn-primary">Save</button>
            </form>
        </div>
    )
}

export default PirateUpdate