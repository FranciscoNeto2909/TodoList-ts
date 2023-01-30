import { createSlice } from "@reduxjs/toolkit";

export interface Task {
    id: number;
    title: string;
    description: string;
    status: string;
}

interface State {
    formVisibility: boolean;
    msgVisibility: boolean;
    theme: string,
    msg: string;
    tasks: Task[];
}

const AppSlice = createSlice({
    name: "AppSlice",
    initialState: {
        formVisibility: false,
        msgVisibility: false,
        hasTaskDone:false,
        theme: "light",
        msg: "",
        tasks: [] as Task[]
    },
    reducers: {
        showForm: (state) => {
            return { ...state, formVisibility: true }
        },
        hideForm: (state) => {
            return { ...state, formVisibility: false }
        },
        showConfetti: (state) => {
            return { ...state, hasTaskDone: true }
        },
        hideConfetti: (state) => {
            return { ...state, hasTaskDone: false }
        },
        hideMsg: (state) => {
            return { ...state, msgVisibility: false }
        },
        setMsg: (state, { payload }: { payload: string }) => {
            return { ...state, msg: payload, msgVisibility: true }
        },
        clearMsg: (state) => {
            return { ...state, msg: "" }
        },
        setTheme: (state, { payload }: { payload: string }) => {
            return { ...state, theme: payload }
        },
        getTask: (state) => {
            if (localStorage.getItem("tasks")) {
                const storageTasks = JSON.parse(localStorage.getItem("tasks") || "[]")
                return { ...state, tasks: storageTasks }
            } else {
                const storageTasks = localStorage.setItem("tasks", JSON.stringify([{
                    id: 1,
                    title: "Exemplo",
                    description: "Este é m exemplo de tarefa",
                    status: "toDo"
                }]))
                return { ...state, tasks: storageTasks }
            }
        },
        createTask: (state, { payload }: { payload: Task }) => {
            localStorage.setItem("tasks", JSON.stringify([...state.tasks, payload]))
            return { ...state, tasks: [...state.tasks, payload] }
        },
        deleteTask: (state, { payload }: { payload: number | string }) => {
            const filteredTasks = state.tasks.filter(task => task.id !== payload)

            localStorage.setItem("tasks", JSON.stringify(filteredTasks))

            return { ...state, tasks: filteredTasks }
        },

        changeTaskStatus: (state, { payload }: { payload: { id: number | string, status: string } }) => {
            const tasks = state.tasks.map(task => {
                if (task.id === payload.id) {
                    return { ...task, status: payload.status }
                } else {
                    return task
                }
            });
            localStorage.setItem("tasks", JSON.stringify(tasks))
            return { ...state, tasks }
        }
    },
})

export const { showForm, hideForm, showConfetti,  hideConfetti, hideMsg, setMsg, clearMsg, setTheme, getTask, createTask, deleteTask, changeTaskStatus } = AppSlice.actions
export default AppSlice.reducer