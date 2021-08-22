import { useContext, useState } from "react";
import {
    ListItem,
    ListItemText,
    Button,
    Box,
    TextField,
    useMediaQuery,
} from "@material-ui/core";
import FirebaseContext from "../context/firebase";

export default function TodoListItem({ todo, inProgress, id }) {
    const { firebase } = useContext(FirebaseContext);
    const isActive = useMediaQuery("(min-width: 700px)");

    const [updatedTodo, setUpdatedTodo] = useState("");
    const [updatingTodo, setUpdatingTodo] = useState(false);

    function toggleInProgress() {
        firebase.firestore().collection("todos").doc(id).update({
            inProgress: !inProgress,
        });
        // console.log(inProgress)
    }

    function deleteTodo() {
        firebase.firestore().collection("todos").doc(id).delete();
    }

    function handleSetTodo() {
        setUpdatingTodo((prev) => !prev);
        setUpdatedTodo("");
    }

    function handleUpdateTodo() {
        firebase.firestore().collection("todos").doc(id).update({
            todo: updatedTodo,
        });
        setUpdatedTodo("updated!");
        setTimeout(() => {
            setUpdatedTodo("");
            setUpdatingTodo((prev) => !prev);
        }, 500);
    }

    return (
        <Box
            display="flex"
            flexDirection={isActive ? "row" : "column"}
            justifyContent="space-between"
            alignItems="center"
            width="100%"
            margin="0 auto"
        >
            <ListItem>
                <ListItemText
                    primary={todo}
                    secondary={inProgress ? "In Progress" : "Completed"}
                />
                {updatingTodo ? (
                    <>
                        <TextField
                            id="standard-basic"
                            label={todo}
                            value={updatedTodo}
                            onChange={({ target }) =>
                                setUpdatedTodo(target.value)
                            }
                        />
                        <Button onClick={handleUpdateTodo}>🔼</Button>
                    </>
                ) : null}
            </ListItem>

            <Button onClick={toggleInProgress}>
                {inProgress ? "Done" : "UnDone"}
            </Button>
            <Button onClick={deleteTodo}>X</Button>
            <Button onClick={handleSetTodo}>U</Button>
        </Box>
    );
}
