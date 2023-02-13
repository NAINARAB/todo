import React from "react";
import './common.css';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useNavigate } from "react-router-dom";
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Dashboard from "./dashboard";
import Customer from "./customer";
import { useState,useEffect } from "react";
function Home() {

    const navigate = useNavigate();


    {/* current user details */}


    let currentUser = sessionStorage.getItem('id');
    const [details,setDetails] = useState([]);

    useEffect(()=>{
        fetch(`http://localhost:8080/details/${currentUser}`,{headers:{
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
      },[])















    {/* end of current user details */}


    function closelogin() {
        document.getElementById('login').style.display = 'none';

    }
    function openlogin() {
        document.getElementById('login').style.display = 'flex';
        closereg();
    }
    function openreg() {
        document.getElementById('regus').style.display = 'flex';
        closelogin();
    }
    function closereg() {
        document.getElementById('regus').style.display = 'none';
        clrreg();
    }
    function clrreg() {
        var x = document.getElementById('ureg'); x.value = '';
        var y = document.getElementById('pwreg'); y.value = '';
        var z = document.getElementById('cpwreg'); z.value = '';
    }




    {/* tab functions */ }


    function TabPanel(props) {
        const { children, value, index, ...other } = props;

        return (
            <div
                role="tabpanel"
                hidden={value !== index}
                id={`simple-tabpanel-${index}`}
                aria-labelledby={`simple-tab-${index}`}
                {...other}
            >
                {value === index && (
                    <Box sx={{ p: 3 }}>
                        <Typography>{children}</Typography>
                    </Box>
                )}
            </div>
        );
    }

    TabPanel.propTypes = {
        children: PropTypes.node,
        index: PropTypes.number.isRequired,
        value: PropTypes.number.isRequired,
    };

    function a11yProps(index) {
        return {
            id: `simple-tab-${index}`,
            'aria-controls': `simple-tabpanel-${index}`,
        };
    }

    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };


    function logmeout(){
        sessionStorage.clear();
        navigate('/')
    }


    return (
        <div className="main">
            {/* LOGIN FORM */}
            <div className="formpopup" style={{ display: 'none' }} id='login'>
                <div className='cntr' style={{ flexDirection: 'column' }} >
                    <img src='https://cdn.pixabay.com/photo/2016/08/31/11/54/icon-1633249_960_720.png' className="avatar" alt="avatar" />
                    <h3>User</h3>
                    <h3>{currentUser}</h3>
                        <div className="cntr" >
                            <button type="submit" className="btn" onClick={logmeout}>LogOut</button>
                            <button className="btn" onClick={closelogin} >Close</button>
                        </div>
                        
                </div>
            </div>





            {/*User Registration */}





            <div className="formpopup" style={{ display: 'none' }} id='regus'>
                <div className='cntr' style={{ flexDirection: 'column' }} >
                    <img src='https://cdn.pixabay.com/photo/2016/08/31/11/54/icon-1633249_960_720.png' className="avatar" alt="avatar" />
                    <h3>User Registration</h3>
                    <form>
                        <input className="inppt" type='text' id="ureg" placeholder="Enter UserName" required /><br />
                        <input className="inppt" type='password' id="pwreg" placeholder="Enter New Password" required /><br />
                        <input className="inppt" type='password' id="cpwreg" placeholder="Confirm Password" required />
                        <div className="cntr" >
                            <button type="submit" className="btn" >Register</button>
                            <button className="btn" onClick={closereg} >Close</button>
                        </div>
                        <div className="cntr">
                            <button className="link" onClick={openlogin}>Back to Login</button>
                        </div>
                    </form>
                </div>
            </div>



            {/* Header */}


            <header className="headder">
                <h2 style={{ display: 'inline' }}>ToDo Application..</h2>
                <button className="logbtn" onClick={openlogin}><AccountCircleIcon style={{ fontSize: '30px' }} /></button>
            </header>


            <div style={{ marginTop: '100px' }}></div>




            {/*    Tab Navigation  */}


            <Box sx={{ borderBottom: 1, borderColor: 'divider' }} >
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example"  >
                    <Tab label="Saved Tasks" {...a11yProps(0)} sx={{color:'black', fontWeight:'bold',backgroundColor:'#f2f2f2c1'}}/>
                    <Tab label="Add New Tasks" {...a11yProps(1)} sx={{color:'black', fontWeight:'bold',backgroundColor:'#f2f2f2c1'}} />
                </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
                <Dashboard />
            </TabPanel>
            <TabPanel value={value} index={1}>
                <Customer/>
            </TabPanel>
             


        </div>
    );
}

export default Home;