import React, { useContext, useEffect, useState } from 'react'
import Dropdown from 'react-bootstrap/Dropdown';
import './view.css'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import{signOut} from 'firebase/auth'
import { auth } from '../firbase';
import { useNavigate } from 'react-router-dom';
import { addCompletedTodoApi, addDeleTodoApi, addFavTodoApi, addTodoApi, delTodoApi, deleteAllTodoApi, getCompletedTodoApi, getDelTodoApi, getFavTodoApi, getTodosApi, getUserTodosApi } from '../services/allApi';
import { addStatusContext, isLoginContext } from '../context/ContextShare';

function ViewTodo() {
  const navigate = useNavigate()
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

    const [search,setSearch] = useState('')
    const [allTodos , setAllTodos] = useState([])
    const [filter , setFilter] = useState([])
    const [deleteBtn,setDeleteBtn] = useState(false)
    const [todoStatus , setTodoStatus] = useState(false)
    const{isadd,setIsAdd}=useContext(addStatusContext)
    const {islogin, setIsLogin}=useContext(isLoginContext)

  
  
    const [todos,setTodos]=useState({
      email:JSON.parse(sessionStorage.getItem('CurrentUser')),
      title:'',
      description:''
    })

    const handleLogOut = ()=>{
         signOut(auth).then((res)=>{
           sessionStorage.removeItem('CurrentUser')
           setIsLogin(false)
           navigate('/')
         }).catch((err)=>{
          console.log(err);
         })
    }
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
            setTodoStatus(true)
            handleClose()
            alert('done')
          }else{
            alert('error adding ')
          }
          
        }catch(err){
          console.log(err);
        }
      }
     }

     const getAllTodos = async ()=>{
      const email = JSON.parse(sessionStorage.getItem('CurrentUser'))
      console.log(email);
      try {
        const result = await getTodosApi(search)
        const todos =  result.data.filter((item)=>item.email === email)
        setAllTodos(todos)
        console.log(allTodos);

      } catch (error) {
         console.log(error);
      }
     
     }

     const getUserTodo = async()=>{
      const email = JSON.parse(sessionStorage.getItem('CurrentUser'))
      console.log(email);
      try {
        const result = await getUserTodosApi(email)
        console.log(result);
        setAllTodos(result.data)
      } catch (error) {
        console.log(error);
      }
     
     }

     useEffect(()=>{
      getAllTodos()
      setTodoStatus(false)
      setIsAdd(false)
     },[search,todoStatus,isadd])

     useEffect(()=>{
      getUserTodo()
      setIsAdd(false)
     },[todoStatus,isadd])

    const handleComplete = async(title)=>{
      const completedTodo = allTodos.find((item)=>item.title === title)
      try{
        const result = await addCompletedTodoApi(completedTodo)
        console.log(result);
        if(result.status==200){
          alert('added')
          setTodoStatus(true)
          const res = await delTodoApi(completedTodo._id)
          console.log(res);
        }else{
          console.log(result.response.data);
        }
      }catch(error){
        console.log(error);
      }
    }
    const handleFavourite = async(title)=>{

     const favTodo = allTodos.find((item)=>item.title === title)
    //  console.log(favTodo);
     try {
        const result = await addFavTodoApi(favTodo)
        console.log(result);
        if(result.status==200){
          alert('added')
          setTodoStatus(true)
        }else{
          alert(result.response.data);
        }
     } catch (error) {
      console.log(error);
     }
    }
    const handleDelete = async(title)=>{
      const delTodo = allTodos.find((item)=>item.title === title)
      try{
        const result = await addDeleTodoApi(delTodo)
        if(result.status==200){
          alert('deleted')
          setTodoStatus(true)
         const res = await delTodoApi(delTodo._id)
         console.log(res);
        }else{
          console.log(result.response.data);
        }
      } catch (error) {
      console.log(error);
     }
    }

  const viewComplete = async()=>{
    const email = JSON.parse(sessionStorage.getItem('CurrentUser'))
    console.log(email);
    try {
      const result = await getCompletedTodoApi(email)
      console.log(result);
      if(result.status==200) {
        setFilter(result.data)
        setDeleteBtn(false)
      }else{
        console.log(result.response.data);
      }
    } catch (error) {
      console.log(error);
    }
  }
  const viewFavourite = async()=>{
    const email = JSON.parse(sessionStorage.getItem('CurrentUser'))
      console.log(email);
    try {
      const result = await getFavTodoApi(email)
      console.log(result);
      if(result.status==200) {
        setFilter(result.data)
        setDeleteBtn(false)
      }else{
        console.log(result.response.data);
      }
    } catch (error) {
      console.log(error);
    }
  }
  const viewDelete = async()=>{
    const email = JSON.parse(sessionStorage.getItem('CurrentUser'))
      console.log(email);
      try {
        const result = await getDelTodoApi(email)
        console.log(result);
        if(result.status==200) {
          setFilter(result.data)
          setDeleteBtn(true)
        }else{
          console.log(result.response.data);
        }
      } catch (error) {
        console.log(error);
      }
  }
  console.log(allTodos);

  const dispTodo = filter.length>0?filter:allTodos

  const handleAllDelete = async()=>{
    const email = JSON.parse(sessionStorage.getItem('CurrentUser'))
    console.log(email);
    try{
     const result =  await deleteAllTodoApi(email)
     if(result.status==200){
      setTodoStatus(true)
      alert('deleted successfully')
     }else{
      console.log(result.response.data);
     }
    }catch(error){
      console.log(error);
    }
  }

  return (
    <div>
        <div className='p-5'>
           <div className='d-flex justify-content-between '> 
            <h3>Todo list</h3>

            <button className='btn btn-outline-primary' onClick={handleLogOut}>logOut</button>
            </div>
            <div className='d-flex justify-content-between mt-5'>
              <div className='me-3 '>
                 <input type="text" placeholder='search' className='form-control' value={search} onChange={(e)=>setSearch(e.target.value)}/>
              </div>
              <div>
              
              <Dropdown>
                <Dropdown.Toggle variant="outline-secondary" id="dropdown-basic">
                   Filter By
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    <Dropdown.Item onClick={viewComplete}>completed</Dropdown.Item>
                    <Dropdown.Item onClick={viewFavourite}>Favourite</Dropdown.Item>
                    <Dropdown.Item onClick={viewDelete}>Deleted</Dropdown.Item>
                </Dropdown.Menu>
                </Dropdown>
              </div>
            </div>
            <div className='text-center mt-5 d-flex d-md-none '>
                <button className='btn btn-light'onClick={handleShow}>Add Todo +</button>
              </div>
            <div style={{marginTop:100}}>

               {dispTodo.length>0?
                dispTodo.map((items)=>(
                  <div className='d-flex justify-content-between  border-bottom '>
                  <div>
                      <h4>{items.title}</h4>
                      <p>{items.description}</p>
                  </div>
                  <div>
                  
                  {!filter.length>0&&<Dropdown>
                  <Dropdown.Toggle variant="light" id='toggle'>
                  <i className="fa-solid fa-ellipsis-vertical"></i>
                  </Dropdown.Toggle>
  
                  <Dropdown.Menu>
                      <Dropdown.Item onClick={()=>handleComplete(items.title)}>completed</Dropdown.Item>
                      <Dropdown.Item onClick={()=>handleFavourite(items.title)}>Favourite</Dropdown.Item>
                      <Dropdown.Item onClick={()=>handleDelete(items.title)}>Delete</Dropdown.Item>
                  </Dropdown.Menu>
                  </Dropdown>}
                  </div>
                 </div>
                ))
               :<p>Nothing To Found</p>
               }

               {deleteBtn&&<button className='btn btn-outline-primary' onClick={handleAllDelete}>delete all</button>}

            </div>
        </div>
        <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <div className='d-flex flex-column align-items-center'>
            <input type="text" placeholder="Title" className='form-control mb-3 w-75' onChange={(e)=>setTodos({...todos,title:e.target.value})} value={todos.title}/>
           <input type="text" placeholder='Description' className='form-control mb-3 w-75' onChange={(e)=>setTodos({...todos,description:e.target.value})} value={todos.description}/>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleAdd}>
            Add
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default ViewTodo