import { AiOutlineCheck, AiOutlineDelete } from "react-icons/ai";
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
    const task = {
        id: data.task.id,
        status: "done"
    }

    const dispatch = useDispatch()
    const app = useSelector<IApp, IApp["App"]>(data => data.App)

    function handleDoneTask() {
        dispatch(changeTaskStatus(task))
        dispatch(setMsg("Tarefa finalizada!"))
    }

    function handleDeleteTask() {
        dispatch(deleteTask(data.task.id))
        dispatch(setMsg("Tarefa apagada!"))
    }

    return (
        <div className={data.task.status == "done" ? "card task--done" : "card"} id={data.task.id}>
            <h4 className="card-title">{data.task.title}</h4>
            <p className="card-decription">{data.task.description}</p>
            <div className="card-buttons">
                <AiOutlineCheck className="card-button card-button--done" onClick={handleDoneTask} />
                <AiOutlineDelete className="card-button card-button--delete" onClick={handleDeleteTask} />
            </div>
        </div>
    )
}