import { firebase, FieldValue } from "../lib/firebase";

export async function doesUsernameExist(username) {
    const result = await firebase
        .firestore()
        .collection("users")
        .where("username", "==", username)
        .get();
    return result.docs.map((user) => user.data().length > 0);
}

export function addTodo(todo, userId) {
    firebase.firestore().collection("todos").add({
        inProgress: true,
        timestamp: FieldValue.serverTimestamp(),
        todo,
        userId,
    });
}
