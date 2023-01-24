import { AiOutlineCheck, AiOutlineDelete, AiOutlineRetweet } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { changeTaskStatus, deleteTask, setMsg } from "../assets/AppSlice";
import { IApp } from "./TodoList";

export type TaskTypes = {
    id: string,
    title: string,
    description: string,
    status: string
}

interface CardTypes {
    task: TaskTypes;
}

export default function Card(data: CardTypes) {
    const dispatch = useDispatch()
    const app = useSelector<IApp, IApp["App"]>(data => data.App)

    const task = {
        id: data.task.id,
        status: "done"
    }

    function handleDoneTask() {
        if (data.task.status == "toDo" && !app.msgVisibility) {
            dispatch(changeTaskStatus(task))
            dispatch(setMsg("Task finished!"))
        }
    }

    function handleRedoTask() {
        task.status = "toDo"
        if (data.task.status == "done" && !app.msgVisibility) {
            dispatch(changeTaskStatus(task))
            dispatch(setMsg("Task can be redone!"))
        }
    }

    function handleDeleteTask() {
        dispatch(deleteTask(data.task.id))
        dispatch(setMsg("Task deleted!"))
    }

    const sla = `card-button ${app.theme == "light" ? "card-button--done" : "card-button-dark--done"}`

    return (
        <div className={data.task.status == "done" ? app.theme == "light" ? "card task--done" : "card task-dark--done" : "card"} id={data.task.id}>
            <h4 className="card-title">{data.task.title}</h4>
            <p className="card-description">{data.task.description}</p>
            <div className="card-buttons">
                {data.task.status == "toDo" ?
                    <AiOutlineCheck className={`card-button ${app.theme == "light" ? "card-button--done" : "card-button-dark--done"}`} onClick={handleDoneTask} /> :
                    <AiOutlineRetweet className={`card-button ${app.theme == "light" ? "card-button--done" : "card-button-dark--done"}`} onClick={handleRedoTask} />
                }
                <AiOutlineDelete className="card-button card-button--delete" onClick={handleDeleteTask} />
            </div>
        </div>
    )
}