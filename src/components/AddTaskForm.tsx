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
    const todoid = app.tasks.length + 1
    const [task, setTask] = useState({ id: todoid, title: "", description: "", status: "toDo" } as TodoTypes)

    function handleChangeTitle(e: string) {
        setTask({ ...task, title: e })
    }
    function handleChangeDescription(e: string) {
        setTask({ ...task, description: e })
    }
    function handleCreateTask(e: any): void {
        e.preventDefault()
        if (task.title == "" || task.description == "") {
            dispatch(setMsg("Preencha os campos!"))
            return;
        } else if (app.tasks.filter(filteredTask => filteredTask.title == task.title)) {
            dispatch(setMsg("Titulos iguais!"))
        } else {
            dispatch(createTask(task))
            dispatch(hideForm())
            dispatch(setMsg("Tarefa criada!"))
        }
    }

    return (
        <form className="form">
            <div className="form-title-container">
                <label htmlFor="title">Titulo</label>
                <input type="text" id="title" value={task.title} onChange={e => handleChangeTitle(e.target.value)} className="form-title-input" />
            </div>
            <div className="form-desc-container">
                <label htmlFor="desc">Descrição</label>
                <input type="text" id="desc" value={task.description} onChange={e => handleChangeDescription(e.target.value)} className="form-desc-input" />
            </div>
            <button className="btn btn--form" onClick={handleCreateTask}>Criar Task</button>
        </form>
    )
}