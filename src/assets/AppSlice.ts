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
    msg: string;
    tasks: Task[];
}

const AppSlice = createSlice({
    name: "AppSlice",
    initialState: {
        formVisibility: false,
        msgVisibility: false,
        msg: "",
        tasks: [{
            id: 1,
            title: "Exemple",
            description: "This is one exemple of task",
            status: "toDo"
        }]
    },
    reducers: {
        showForm: (state) => {
            return { ...state, formVisibility: true }
        },
        hideForm: (state) => {
            return { ...state, formVisibility: false }
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
        createTask: (state, { payload }: { payload: Task }) => {
            return { ...state, tasks: [...state.tasks, payload] }
        },
        deleteTask: (state, { payload }: { payload: number | string }) => {
            const filteredTasks = state.tasks.filter(task => task.id !== payload)
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
            return { ...state, tasks }
        }
    },
})

export const { showForm, hideForm, hideMsg, setMsg, clearMsg, createTask, deleteTask, changeTaskStatus } = AppSlice.actions
export default AppSlice.reducer