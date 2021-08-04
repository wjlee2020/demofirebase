import FirebaseContext from '../context/firebase';
import { useHistory } from 'react-router';
import { useState, useEffect, useContext } from 'react';
import { TextField, Button, Box } from "@material-ui/core";

import { addTodo } from '../services/firebase';
import Pagination from '../components/Pagination';
import LoginContext from '../context/loginContext';
import * as ROUTES from '../constants/routes';
import Todo from '../components/Todo';

export default function MainTodoList() {

  const { firebase } = useContext(FirebaseContext);
  const { user } = useContext(LoginContext);
  // console.log(user)
  const history = useHistory();

  const [todo, setTodo] = useState('');
  const [todoList, setTodoList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(5);



  // move to services with setTodo function separate context: for future
  async function getTodosFromDb(id) {
    await firebase
      .firestore()
      .collection('todos')
      .where('userId', '==', id)
      .orderBy("timestamp", 'desc')
      .onSnapshot((querySnapshot) => {
        setTodoList(
          querySnapshot.docs.map((doc) => ({
            id: doc.id,
            userId: doc.data().userId,
            timestamp: doc.data().timestamp,
            todo: doc.data().todo,
            inProgress: doc.data().inProgress
          }))
        )
      })
  }

  useEffect(() => {
      getTodosFromDb(user.uid)
  },[])


  // pagination
  const indexOfLast = currentPage * postsPerPage;
  const indexOfFirst = indexOfLast - postsPerPage;
  const current = todoList.slice(indexOfFirst, indexOfLast);

  function paginate(pageNumber) {
    setCurrentPage(pageNumber)
  }

  const handleLogOut = async (e) => {
    e.preventDefault();
    try {
      await firebase.auth().signOut();
      history.push(ROUTES.LOGIN)
    } catch(e) {
      console.log(e.message);
    }
  }

  return (
    <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      <h1>hello {user.displayName}</h1>
      <form>
          <TextField
            label='write a todo' 
            value={todo}
            onChange={({target}) => setTodo(target.value)}/>
          <Button
            variant='contained'
            color='primary' 
            type="submit"  
            onClick={(e) => {
              e.preventDefault();
              addTodo(todo, user.uid)
              setTodo('')}}
            >
              Set Todo
          </Button>
      </form>
     {current.map((item, i) => (
       <Box width={2/5} key={i}>
          <Todo todo={item.todo}
              inProgress={item.inProgress}
              id={item.id} /> 
        </Box>
     ))}
      <Pagination postsPerPage={postsPerPage} totalPosts={todoList.length} paginate={paginate} />
      <Button variant="contained" onClick={handleLogOut}>Log Out</Button>
    </Box>
  );
}
