import React from "react";

function Customer() {
    function showcard() {
        document.getElementById('newtask').style.display = 'block';
        document.getElementById('adbut').style.display = 'none';
    }
    function closecard() {
        document.getElementById('newtask').style.display = 'none';
        document.getElementById('adbut').style.display = 'block';
        document.getElementById('tsk').value = '';
        document.getElementById('hor').value = '';
        document.getElementById('min').value = '';
        document.getElementById('msg').value = '';
    }
    return (
        <div>
            <div className="hed">
                <h2>Add New Tasks</h2>
            </div>
            <div className="adbtnposition">
                <button className="addbtn" id="adbut" title="New Task" onClick={showcard}>+</button>
            </div>

            <div className="card fadin" id="newtask" style={{display:"none"}}>
                <h2>Write Some Tasks...!!</h2>
                <form>
                    <div className="bx">
                        <textarea className="tinpt" maxlength="250" id="tsk" placeholder="Type Here..." required />    
                    </div>
                    

                    <div className="bx">
                        <h4>Select Starting Time</h4>
                        <input type='time' required />
                    </div>


                    <div className="bx">
                    <h4>Choose Duration of the Task</h4>
                        Hour :
                        <input type='number' className="tyminpt" id="hor" min={0} placeholder="Ex : 2" required />
                        Minutes :
                        <input type='number' className="tyminpt" id="min" min={1} placeholder="Ex : 30" required /><br /><br />
                    </div>

                    <div className="bx">
                        
                        Add Some Messages...
                        <input type='text' className="tyminpt" id="msg" style={{ width: '40%' }} maxLength={20} placeholder='Optional (Max20-Char)' />

                        <hr style={{width:'80%',marginTop:'20px'}} />


                        <div className="cntr">
                            <input type="button" value="Add Task" className="btn" />
                            <input type='button' value='Cancel' onClick={closecard} style={{ backgroundColor: '#ff5252', color: 'white' }} className="btn" />
                        </div>
                    </div>

                </form>
            </div>

        </div>
    );
}

export default Customer;