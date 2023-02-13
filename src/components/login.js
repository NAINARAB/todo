import * as React from 'react';
import { useEffect, useState } from 'react';
import './loginsty.css';
import axios from 'axios';
import { useNavigate } from "react-router-dom";





function Login() {



  {/* REGISTER SCRIPT */}

  const navigate = useNavigate();
  const [posts,setPosts] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
  }


  const onClicksignup = (e) => {
    e.preventDefault();
       addPosts(email, password);
       alert('Registration Successful');
    navigate('/')
    clrreg();
    showLogin();
  }
  

  useEffect(()=>{
    const fetchPost = async () => {
      let response = await client.get('?_limit=10');
      setPosts(response.data);
   };
   fetchPost()
  },[])
  const client = axios.create({
    baseURL: "http://localhost:8080/registration" 
  });


  const addPosts =(email,password) => {
    client.post('', {
        email:email,
        password:password
       })
       .then((response) => {
          console.log("after then",response)
          setPosts([response.data, ...posts]);
       }).catch((err)=>{
        console.log(err);
       })
    
  };

  {/* END OF REGISTER SCRIPT */}




  {/* LOGIN SCRIPTS-->>> */}



  const [loginEmail,setloginEmail]=useState('');
  const [loginPassword,setloginPassword]=useState('');
  const [details,setDetails]=useState([]);

  const getdetails=(id)=>{
    fetch(`http://localhost:8080/details/${id}`,{headers:{
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    }
    }).then(res=>{
      console.log("afterApi",res)
      return res.json()
    }).then(data=>{
      console.log("loginData",data[0].id)
      setDetails(data)
      
    })
  } 


  const client1 = axios.create({
    baseURL: "http://localhost:8080/login" 
  });


  const  getLogin = (email,password) => {
    client1.post('', {
        email:email,
        password:password,
       })
       .then((response) => {
          console.log("after then",response)
          if(response.data.status ==='Found'){
            
            let id = JSON.parse(response.data.data)
            console.log("before navifgate",id)
            sessionStorage.setItem("id",id.email)
            getdetails(id.id);
            navigate('/home')
            
          }
          else if(response.data.status === 'Not Found'){
              alert('Invalid User Id Or Password');
        }  
          
       }).catch((err)=>{
        console.log(err);
       })
  };

  const handleSubmit1=(e)=>{
      e.preventDefault();
      getLogin(loginEmail,loginPassword);
   }




  {/* END OF LOGIN */}




  function showRegister() {
    document.getElementById('log').style.display = 'none';
    document.getElementById('regs').style.display = 'block';
  }
  function showLogin() {
    document.getElementById('regs').style.display = 'none';
    document.getElementById('log').style.display = 'block';
  }
  function clrreg() {
    document.getElementById('reguser').value = '';
    document.getElementById('regpasword').value = '';
    document.getElementById('conpasword').value = '';
  }

  {/* login process */ }



  return (
    <div className='bdy'>
      <div>
        <h2 className='header1' style={{padding:'1.5em'}}>ToDo Application</h2>
      </div>

      <div className='fulpage'>
        <div className='cntr'>
          <div className='styleddiv' id='log'>
            <div className='cntr' style={{ flexDirection: 'column' }}><img className='imgg' src="https://png.pngtree.com/png-vector/20190223/ourlarge/pngtree-vector-avatar-icon-png-image_695765.jpg" alt="Avatar" />

              <h4>Login</h4>
            </div>
            <form onSubmit={(e)=>handleSubmit1(e)}>
              <input type="text" id='nme' className='inppt' placeholder='Enter E-Mail or UserName' onChange={(e)=>setloginEmail(e.target.value)} required /><br />
              <input type='password' id='pswd' className='inppt' placeholder='Enter Password' onChange={(e)=>setloginPassword(e.target.value)} required />

              <div className='cntr'>
                <button type="submit" className='btn' style={{ backgroundColor: '#55efc4' }}>Login</button>
                <button onClick={showRegister} className='btn'>Register</button>
              </div><br />

            </form>
          </div>








          <div className='styleddiv' id='regs' style={{ display: 'none' }}>
            <div className='cntr'><img src="https://cdn.pixabay.com/photo/2018/11/13/21/43/instagram-3814050_960_720.png" alt='Image' /><br /></div>
            <form onSubmit={(e) => handleSubmit(e)}>
              <input id='reguser' className='inppt' type='email' placeholder='Enter Name or E-Mail' onChange={(e) => { setEmail(e.target.value) }} required /><br />
              <input id='regpasword' className='inppt' type='password' placeholder='Enter Password' onChange={(e) => { setPassword(e.target.value) }} required /><br />
              <input id='conpasword' className='inppt' type='password' placeholder='Re-Enter Password' required /><br />

              <div className='cntr'>
                <button className='btn'onClick={onClicksignup}>Submit</button>
                <button className='btn' type="button" onClick={showLogin} style={{ backgroundColor: '#55efc4' }}>Back</button>
              </div>
            </form>
          </div>



        </div>
      </div>
    </div>
  );
}

export default Login;