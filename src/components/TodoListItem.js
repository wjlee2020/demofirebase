// import { useState, useEffect, useContext } from 'react';
// import { ListItem, ListItemText, Button, Box } from "@material-ui/core";
// import { firebase } from '../lib/firebase';
// import { getTodoFromFb } from '../services/firebase';
// import LoginContext from '../context/loginContext';

// export default function TodoListItem({ todo, setTodoList }) {
//     const [isDone, setIsDone] = useState(!todo.inProgress);
//     const [currentList, setCurrentList] = useState([]);
//     const { user } = useContext(LoginContext);

//     function toggleInProgress(item) {
//         setIsDone(!item);
//         firebase.firestore().collection('todos').doc(todo.docId).update({
//             inProgress: item
//         });
//         // console.log(todo.inProgress)
//     }

//     async function deleteTodo() {
//         await firebase.firestore().collection('todos').doc(todo.docId).delete();
//     }

//     useEffect(() => {
//         let isSubscribed = true;
//         if(isSubscribed) {
//             getTodoFromFb(user.uid).then(todos => {
//                 setCurrentList(todos)
//                 setTodoList(todos)
//             })
//         }
//         return () => isSubscribed = false;
//         // need to add user.uid (need to have protected routes)
//     }, [isDone, setTodoList, currentList, user.uid])


//     return (
//         <Box 
//             display="flex" 
//             justifyContent="center" 
//             alignItems="center"
//             width={2/5} 
//             margin='0 auto'
//         >
//             <ListItem>
//                 <ListItemText 
//                 primary={todo.todo} 
//                 secondary={todo.inProgress ? "In Progress" : "Completed"} />
//             </ListItem>
//             <Box display="flex">
//                 <Button
//                     onClick={() => toggleInProgress(isDone)}
//                 >
//                     {todo.inProgress ? "Done" : "Undone"}
//                 </Button>
//                 <Button onClick={deleteTodo}>
//                     X
//                 </Button>
//             </Box>
//         </Box>
//     )
// }