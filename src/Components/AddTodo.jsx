import React, { useContext, useState } from 'react';
import logo from '../assets/logo.png';
import { addTodoApi } from '../services/allApi';
import { addStatusContext } from '../context/ContextShare';

function AddTodo() {
  const{isadd,setIsAdd}=useContext(addStatusContext)
  const [todos,setTodos]=useState({
    email:JSON.parse(sessionStorage.getItem('CurrentUser')),
    title:'',
    description:''
  })

  const handleAdd = async()=>{
    console.log(todos);
    if(!todos.title || !todos.description){
      alert('please add a title and description')
    }else{
      try{
        const result = await addTodoApi(todos)
        console.log(result);
        if(result.status==200){
          setTodos({
            title:'',
            description:''
          })
          setIsAdd(true)
          alert('done')
        }else{
          alert('error adding ')
        }
      }catch(err){
        console.log(err);
      }
    }
   }

  return (
  <div>
       <div className='p-5'>
       <div className='border-end'>
           <img src={logo} alt="logo" width={50} />
                <div className='d-flex flex-column align-items-center justify-content-center mt-5 '>
                
                  <div className='text-center'>
                    <h3 className='fw-bold'>TODO</h3>
                    <div className='lead p-3'>
                      Envision a landscape where your to-dos aren't burdens but stepping stones toward a grander vision of success. The clutter of everyday life gives way to a digital canvas where you, the curator, arrange your tasks into a masterpiece of efficiency. 
                    </div>
                  </div>
                  <div className='w-100'>
                    <div className='d-flex flex-column align-items-center'>
                      <input type="text" placeholder="Title" className='form-control mb-3 w-75' onChange={(e)=>setTodos({...todos,title:e.target.value})} value={todos.title}/>
                      <input type="text" placeholder='Description' className='form-control mb-3 w-75' onChange={(e)=>setTodos({...todos,description:e.target.value})} value={todos.description}/>
                      <button className='btn btn-primary w-75' onClick={handleAdd}>Add</button>
                    </div>
                  </div>
                </div>
       </div>
       </div>
       
  </div>
  );
}

export default AddTodo;
