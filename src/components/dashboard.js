import React from "react";
import './todosty.css';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

function Dashboard() {


    //time calculation

    


    //task increment 
    
    var taskno = 0;
    var taskstr = 'Task '
    function conct() {
        taskno = taskno + 1;
        taskstr = taskstr + '  :  '+ taskno;
        return (taskstr);
    }
    return (
        <div>
            <h2 style={{ color: '' }}>Saved Tasks</h2>
            <div className="card">
                <h4 style={{}}>{conct()}</h4>
                <div className='bx'>
                    <h4>Task Content :</h4>
                </div>
                <div className='bx'>
                    <h4><AccessTimeIcon />Starting Time :</h4>
                </div>
                <div className='bx'>
                    <h4>Duration :</h4>
                </div>



            </div>

        </div>
    );
}

export default Dashboard;