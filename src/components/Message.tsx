import { useState } from "react"
import { useSelector } from "react-redux"
import { IApp } from "./TodoList"
export function Message() {
    const [progress, setProgress] = useState<number>(0)
    const app = useSelector<IApp, IApp["App"]>(data => data.App)
    function handleChangeProgress() {
        if (progress < 10) {
            setTimeout(() => {
                setProgress(progress + 1)
            }, 230)
        }
    }
    handleChangeProgress()
    return (
        <div className="message">
            <p>{app.msg}</p>
            <progress className={app.theme == "light" ? "message-progress" : "message-progress--dark"} value={progress} max={10} style={{ width: "100%", height: "6px" }}></progress>
        </div>
    )
}