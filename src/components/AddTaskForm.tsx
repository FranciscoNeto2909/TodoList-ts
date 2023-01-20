import {useState} from "react"
type TodoTypes = {
    title:string,
    Description:string
} 

export default function AddTaskForm() {
    const [todoData, setTodoData] = useState({} as TodoTypes)

    function handleCreateTask() {
        console.log("Criado")
    }
    
    return(
        <form>
            <div className="title-container">
                <label htmlFor="title">Titulo</label>
                <input type="text" id="title" />
            </div>
            <div className="desc-container">
                <label htmlFor="desc">Descrição</label>
                <input type="text" id="desc" />
            </div>
            <button className="btn" onClick={handleCreateTask}>Criar Task</button>
        </form>
    )
}