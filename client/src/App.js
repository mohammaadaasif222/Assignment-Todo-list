import React, { useEffect, useState } from "react";

import ToDo from "./components/ToDo";
import {
  addToDo,
  getAllToDo,
  updateToDo,
  deleteToDo,
  completeToDo,
} from "./utils/HandleApi";

function App() {
  const [toDo, setToDo] = useState([]);
  const [text, setText] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);
  const [toDoId, setToDoId] = useState("");
  const [query, setQuery] = useState(null);

  useEffect(() => {
    getAllToDo(setToDo, query);
  }, [query]);

  const updateMode = (_id, text) => {
    setIsUpdating(true);
    setText(text);
    setToDoId(_id);
  };

  const handleSelect = (e) => {
    setQuery(`?isComplete=${e.target.value}`);
  };

  return (
    <div className="App">
      <section className="vh-100">
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col">
              <div
                className="card"
                id="list1"
                style={{ borderRadius: ".75rem", backgroundColor: "#eff1f2" }}
              >
                <div className="card-body py-4 px-4 px-md-5">
                  <p className="h1 text-center mt-3 mb-4 pb-3 text-primary">
                    <i className="fas fa-check-square me-1"></i>
                    <u>My Todo-s</u>
                  </p>
                  <div className="pb-2">
                    <div className="card">
                      <div className="card-body">
                        <div className="d-flex flex-row align-items-center">
                          <input
                            type="text"
                            className="form-control form-control-lg"
                            id="exampleFormControlInput1"
                            placeholder="Add ToDos..."
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                          />
                          <a
                            href="#!"
                            data-mdb-toggle="tooltip"
                            title="Set due date"
                          >
                            <i className="fas fa-calendar-alt fa-lg me-3"></i>
                          </a>
                          <div>
                            <button
                              type="button"
                              className="btn btn-primary"
                              onClick={
                                isUpdating
                                  ? () =>
                                      updateToDo(
                                        toDoId,
                                        text,
                                        setToDo,
                                        setText,
                                        setIsUpdating
                                      )
                                  : () => addToDo(text, setText, setToDo)
                              }
                            >
                              {isUpdating ? "Update" : "Add"}
                              Add
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <hr className="my-4" />
                  <div className="d-flex justify-content-end align-items-center mb-4 pt-2 pb-3">
                    <p className="small mb-0 me-2 text-muted">Filter</p>
                    <select className="select" onChange={handleSelect}>
                      <option value={null}>All</option>
                      <option value={true}>Completed</option>
                      <option value={false}>Active</option>
                    </select>
                    {/* <p className="small mb-0 ms-4 me-2 text-muted">Sort</p>
                    <select className="select">
                      <option value="1">Added date</option>
                      <option value="2">Due date</option>
                    </select> */}
                    <a
                      href="#!"
                      style={{ color: "#23af89" }}
                      data-mdb-toggle="tooltip"
                      title="Ascending"
                    >
                      <i className="fas fa-sort-amount-down-alt ms-2"></i>
                    </a>
                  </div>
                  {toDo.map((item) => (
                    <ToDo
                      isComplete={item.isComplete}
                      key={item._id}
                      idx={item._id}
                      text={item.description}
                      date={item.createdAt}
                      complete={() => completeToDo(item._id, setToDo)}
                      updateMode={() => updateMode(item._id, item.text)}
                      deleteToDo={() => deleteToDo(item._id, setToDo)}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default App;
