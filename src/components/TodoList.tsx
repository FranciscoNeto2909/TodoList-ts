import React from "react";
import { useSelector, useDispatch } from "react-redux"
import AddTaskForm from "./AddTaskForm";
import { hideForm, showForm } from "../assets/AppSlice";
import Card from "./Card";
import { TaskTypes } from "./Card";


export interface IApp {
    App: {
        formVisibility: boolean,
        msgVisibility:boolean,
        msg:string;
        tasks: Array<TaskTypes>
    };
}


export default function TodoList() {
    const dispatch = useDispatch();
    const app = useSelector<IApp, IApp["App"]>(data => data.App)
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
            <button className={!app.formVisibility ? "btn btn--addTask" : "btn btn--addTask btn--cancel" } onClick={handleOpenAddTaskForm}>{app.formVisibility ? "Cancel Task" : "Add Task"}</button>
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