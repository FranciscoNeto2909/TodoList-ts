import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { createTask, hideForm, setMsg } from "../assets/AppSlice"
import { IApp } from "./TodoList"
type TodoTypes = {
    id: number,
    title: string,
    description: string,
    status: string
}

export default function AddTaskForm() {
    const dispatch = useDispatch()
    const app = useSelector<IApp, IApp["App"]>(data => data.App)
    const todoId = app.tasks.length + 1
    const [task, setTask] = useState({ id: todoId, title: "", description: "", status: "toDo" } as TodoTypes)

    function handleChangeTitle(e: string) {
        const firstLetter = e.charAt(0).toUpperCase();
        const restOfString = e.slice(1);
        const capitalized = firstLetter + restOfString;
        setTask({ ...task, title: capitalized })
    }
    function handleChangeDescription(e: string) {
        const firstLetter = e.charAt(0).toUpperCase();
        const restOfString = e.slice(1);
        const capitalized = firstLetter + restOfString;
        setTask({ ...task, description: capitalized })
    }

    function handleCreateTask(e: any): void {
        if (task.title == "" || task.description == "") {
            dispatch(setMsg("Fill in the fields!"))
            return;
        } else if (app.tasks.some(filteredTask => task.title == filteredTask.title)) {
            dispatch(setMsg("The titles are equals!"))
        } else {
            dispatch(createTask(task))
            dispatch(hideForm())
            dispatch(setMsg("Task created!"))
        }
    }

    return (
        <form className="form">
            <div className="form-title-container">
                <label htmlFor="title">Title</label>
                <input type="text" id="title" autoCapitalize="on" value={task.title} onChange={e => handleChangeTitle(e.target.value)} className={`form-input ${app.theme == "light" ? "form-input--light" : "form-input--dark"}`} />
            </div>
            <div className="form-desc-container">
                <label htmlFor="desc">Description</label>
                <input type="text" autoCapitalize="on" id="desc" value={task.description} onChange={e => handleChangeDescription(e.target.value)} className={`form-input ${app.theme == "light" ? "form-input--light" : "form-input--dark"}`} />
            </div>
            <button type="button" className={`btn btn--form ${app.theme == "light" ? "btn--light" : "btn--dark"}`} onClick={handleCreateTask}>Create Task</button>
        </form>
    )
}