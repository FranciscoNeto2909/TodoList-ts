import React from "react";
import { useSelector, useDispatch } from "react-redux"
import AddTaskForm from "./AddTaskForm";
import { hideForm, showForm } from "../assets/AppSlice";
import Card from "./Card";
import { TaskTypes } from "./Card";


interface RootState {
    App: {
        formVisibility: boolean;
        tasks: Array<TaskTypes>
    };
}


export default function TodoList() {
    const dispatch = useDispatch();
    const app = useSelector<RootState, RootState["App"]>(data => data.App)
    function handleOpenAddTaskForm() {
        if (!app.formVisibility) {
            dispatch(showForm())
        } else {
            dispatch(hideForm())
        }
    }
    return (
        <div className="todo-list">
            <h1 className="todo-list-title">Lists</h1>
            <button className="btn" onClick={handleOpenAddTaskForm}>Adicionar Task</button>
            <div className="addtask-container">
                {app.formVisibility &&
                    <AddTaskForm />
                }
            </div>
            <div className="cards-container">
                {
                    app.tasks.length > 0 && app.tasks.map((task, i) => (
                        <Card task={task} key={i} />
                    ))
                }
            </div>
        </div>
    )
}