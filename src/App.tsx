import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearMsg, hideMsg, setTheme } from "./assets/AppSlice";
import { Message } from "./components/Message";
import TodoList, { IApp } from "./components/TodoList";
import CheckButton from "./components/CheckButton"
export default function App() {
  const dispatch = useDispatch()
  const app = useSelector<IApp, IApp["App"]>(data => data.App)
  const [isChecked, setIsChecked] = useState(false)

  if (app.msgVisibility) {
    setTimeout(() => {
      dispatch(hideMsg())
      dispatch(clearMsg())
    }, 2500);
  }

  function handleToggleTheme() {
    if (app.theme == "light") {
      dispatch(setTheme("dark"))
      localStorage.setItem("theme", "dark")
      setIsChecked(true)
    } else if (app.theme == "dark") {
      dispatch(setTheme("light"))
      localStorage.setItem("theme", "light")
      setIsChecked(false)
    }
  }

  useEffect(() => {
    const theme = localStorage.getItem("theme")
    if (theme != null) {
      dispatch(setTheme(theme))
    } 
    if (theme == "dark") {
      setIsChecked(true)
    }
  }, [])

  return (
    <div className={app.theme == "light" ? "App" : "App bg--dark"}>
      <CheckButton value={app.theme} onClick={handleToggleTheme} isChecked={isChecked} />
      {app.msgVisibility && <Message />}
      <TodoList />
    </div>
  )
}
