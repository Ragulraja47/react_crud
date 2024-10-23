
import { useEffect, useState } from 'react';
import './App.css';
import { Button, EditableText, InputGroup, Toaster } from '@blueprintjs/core';
const apptoast = Toaster.create({
  position : 'top'
  
})
function App() {

    //toaster like alert after completion of process


  //Read user from server
  const [users, setUsers] = useState([]);
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((json) => setUsers(json))
  }, []);

  //Add new user 
  const [nname ,setnname] = useState([]);
  const [nuname ,setnuname] = useState([]);
  const [nemail ,setnemail] = useState([]);
  const [nweb ,setnweb] = useState([]);
  //function for add user
  function adduser(e){
    e.preventDefault();
    const name = nname.trim();
    const username = nuname.trim();
    const email = nemail.trim();
    const website = nweb.trim();

    if(name && username && email && website){
      fetch("https://jsonplaceholder.typicode.com/users",{
        method : "POSt",
        body : JSON.stringify({
            name,
            username,
            email,
            website
        }),
        headers : {
          'Content-Type': 'application/json; charset=utf-8'
        }
      }).then( (response)=> response.json())
      .then( (usdata)=> setUsers([...users,usdata]))

      //showing Toaster
      apptoast.show({
        message : "User added successfully",
        intent : 'success',
        timeout : 3000
      })
      //clearing last input fields
      setnname('');
      setnuname('');
      setnemail('');
      setnweb('');
    }
  }





  return (
    <div className="App">

      <table className='bp4-html-table modifier'>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Username</th>
            <th>email</th>
            <th>Website</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map( user =>

            <tr key={user.id}>
              <td> {user.id} </td>
              <td><EditableText value={user.name} /></td>
              <td> <EditableText value={user.username} /></td>
              <td> <EditableText value={user.email} /></td>
              <td> <EditableText value={user.website} /></td>
              <td><Button intent='primary'>Edit</Button>
              <Button intent='danger'>Delete</Button></td>
            </tr>
          )
          }

        </tbody>
        <tfoot>
          <tr>
            <td></td>
            <td><InputGroup value={nname} placeholder='Enter name...'
            onChange={ (e)=> setnname(e.target.value) }/></td>
            <td><InputGroup value={nuname} placeholder='Enter username...'
            onChange={ (e)=> setnuname(e.target.value) }/></td>
            <td><InputGroup value={nemail} placeholder='Enter email...'
            onChange={ (e)=> setnemail(e.target.value) }/></td>
            <td><InputGroup value={nweb} placeholder='Enter website...'
            onChange={ (e)=> setnweb(e.target.value) }/></td>
            <td><Button intent='success' onClick={adduser}>Add User</Button></td>
          </tr>
        </tfoot>
      </table>



    </div>
  );
}

export default App;
