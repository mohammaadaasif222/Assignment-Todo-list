import axios from "axios";

const baseUrl = "https://todo-server-qwgg.onrender.com/todos";

const getAllToDo = (setToDo, query) => {
  if (query === null || query ==='?isComplete=All') {
    axios.get(`${baseUrl}`).then(({ data }) => {
      setToDo(data.todos);
    });
  } else {
    axios.get(`${baseUrl + query}`).then(({ data }) => {
      setToDo(data.todos);
    });
  }
};

const addToDo = (text, setText, setToDo) => {
  axios
    .post(baseUrl, { description: text })
    .then((data) => {
      setText("");
      getAllToDo(setToDo);
    })
    .catch((err) => console.log(err));
};

const updateToDo = (toDoId, text, setToDo, setText, setIsUpdating) => {
  axios
    .put(`${baseUrl}/${toDoId}`, { description: text })
    .then((data) => {
      setText("");
      setIsUpdating(false);
      getAllToDo(setToDo);
    })
    .catch((err) => console.log(err));
};
const completeToDo = (toDoId, setToDo) => {
  axios
    .patch(`${baseUrl}/${toDoId}`)
    .then((data) => {
      getAllToDo(setToDo);
    })
    .catch((err) => console.log(err));
};

const deleteToDo = (_id, setToDo) => {
  console.log(_id);
  axios
    .delete(`${baseUrl}/${_id}`)
    .then((data) => {
      getAllToDo(setToDo);
    })
    .catch((err) => console.log(err));
};

export { getAllToDo, addToDo, updateToDo, deleteToDo, completeToDo };
