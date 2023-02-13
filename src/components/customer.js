import React from "react";
import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';



function Customer() {

    //post tasks in to table todo_tasks

    const navigate = useNavigate();
    const [posts, setPosts] = useState('');
    const [email, setEmail] = useState('');
    const [task, setTask] = useState('');
    const [starttime, setStarttime] = useState('');
    const [duration, setDuration] = useState('00:00');
    const [message, setMessage] = useState('');

    const handleTaskSubmit = (e) => {
        e.preventDefault();
    }

    const onClickTask = (e) => {
        e.preventDefault();
        addPosts(email, task, starttime, duration, message);
        alert('Task submitted');
        closecard();
    }

    const client = axios.create({
        baseURL: "http://localhost:8080/addtasks"
    });

    useEffect(() => {
        const fetchPost = async () => {
            let response = await client.get('?_limit=10');
            setPosts(response.data);
        };
        fetchPost()
    }, [])

    const addPosts = (email, task, starttime, duration, message) => {
        client.post('', {
            email: email,
            task: task,
            starttime: starttime,
            duration, duration,
            message: message
        })
            .then((response) => {
                console.log("after then", response)
                setPosts([response.data, ...posts]);
            }).catch((err) => {
                console.log(err);
            })

    };







    // front end scripts -----
    function showcard() {
        document.getElementById('newtask').style.display = 'block';
        document.getElementById('adbut').style.display = 'none';
    }
    function closecard() {
        document.getElementById('newtask').style.display = 'none';
        document.getElementById('adbut').style.display = 'block';
        document.getElementById('tsk').value = '';
        document.getElementById('uid').value = '';
        document.getElementById('hor').value = '';
        document.getElementById('msg').value = '';
    }
    let currentUser = sessionStorage.getItem('id');
    return (
        <div>
            <div className="hed">
                <h2>Add New Tasks</h2>
            </div>
            <div className="adbtnposition">
                <button className="addbtn" id="adbut" title="New Task" onClick={showcard}>+</button>
            </div>

            <div className="card fadin" id="newtask" style={{ display: "none" }}>
                <h2>Write Some Tasks...!!</h2>
                <form onSubmit={(e) => handleTaskSubmit(e)}>
                    <div className="bx">
                        User Account :
                        <select className="tyminpt" style={{ width: '40%', padding: '5px 10px' }} id='uid' onChange={(e) => { setEmail(e.target.value) }} required >
                            <option value="">- - -Choose User- - -</option>
                            <option value={currentUser}>{currentUser}</option>
                        </select><br />
                    </div>

                    <div className="bx">
                        <textarea className="tinpt" id='tsk' onChange={(e) => { setTask(e.target.value) }} maxlength="250" placeholder="Type Here..." required />
                    </div>


                    <div className="bx">
                        <h4>Select Starting Time</h4>Hour  &nbsp;:&nbsp;  Minutes
                        <input type='time' id="hor" className="tyminpt" onChange={(e) => { setStarttime(e.target.value) }} required />
                        <br /><br />
                    </div>


                    <div className="bx">
                        <h4>Choose Duration of the Task</h4>
                        Hour  &nbsp;:&nbsp;  Minutes
                        <input type='time' value={duration} className="tyminpt" onChange={(e) => { setDuration(e.target.value) }} required />
                        <br /><br />
                    </div>

                    <div className="bx">
                        <br />
                        Add Some Messages...
                        <input type='text' id="msg" className="tyminpt" onChange={(e) => { setMessage(e.target.value) }} style={{ width: '40%' }} maxLength={20} placeholder='Optional (Max20-Char)' />

                        <hr style={{ width: '80%', marginTop: '20px' }} />


                        <div className="cntr">
                            <input type="button" value="Add Task" onClick={onClickTask} className="btn" />
                            <input type='button' value='Cancel' onClick={closecard} style={{ backgroundColor: '#ff5252', color: 'white' }} className="btn" />
                        </div>
                        
                    </div>

                </form>
            </div>

        </div>
    );
}

export default Customer;