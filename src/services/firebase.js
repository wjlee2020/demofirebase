import { firebase, FieldValue } from "../lib/firebase";

export async function doesUsernameExist(username) {
    const result = await firebase
        .firestore()
        .collection('users')
        .where('username', '==', username)
        .get();
    return result.docs.map((user) => user.data().length > 0);
}


export async function getTodoFromFb(userId) {
    // get from each userid once auth is set
    let result = await firebase
    .firestore()
    .collection('todos')
    .where('userId', '==', userId)
    .get();
    
    let todos = result.docs.map(item => ({
        ...item.data(),
        docId: item.id
    }))
    
    // console.log(todos)
    return todos;
}

    export function addTodo(todo, userId) {
        firebase.firestore().collection('todos').add({
            inProgress: true,
            timestamp: FieldValue.serverTimestamp(),
            todo,
            userId
        }).then(() => {
            getTodoFromFb(userId)
        });
    }