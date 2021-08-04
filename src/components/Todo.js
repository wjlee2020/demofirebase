import { useContext } from 'react';
import { ListItem, ListItemText, Button, Box } from "@material-ui/core";
import FirebaseContext from "../context/firebase";

export default function TodoListItem({ todo, inProgress, id }) {

    const {firebase} = useContext(FirebaseContext);
    function toggleInProgress() {
        firebase.firestore().collection("todos").doc(id).update({
        inProgress: !inProgress,
        });
        // console.log(inProgress)
    }

    function deleteTodo() {
        firebase.firestore().collection("todos").doc(id).delete();
    }

    return (
        <Box
            display="flex" 
            justifyContent="space-between" 
            alignItems="center"
            width="100%" 
            margin='0 auto'>
                <ListItem>
                    <ListItemText
                    primary={todo}
                    secondary={inProgress ? "In Progress" : "Completed"}
                    />
                </ListItem>

                <Button onClick={toggleInProgress}>
                    {inProgress ? "Done" : "UnDone"}
                </Button>
                <Button onClick={deleteTodo}>X</Button>
        </Box>
    );
}