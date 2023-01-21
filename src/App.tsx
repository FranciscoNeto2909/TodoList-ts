import { useDispatch, useSelector } from "react-redux";
import { clearMsg, hideMsg } from "./assets/AppSlice";
import { Message } from "./components/Message";
import  TodoList,{ IApp } from "./components/TodoList";
export default function App() {
  const dispatch = useDispatch()
  const app = useSelector<IApp, IApp["App"]>(data => data.App)
  if (app.msgVisibility) {
    setTimeout(() => {
      dispatch(hideMsg())
      dispatch(clearMsg())
    }, 2500);
  }
  return (
    <div className="App">
      {app.msgVisibility && <Message/>}
      <TodoList/>
    </div>
  )
}
