import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearMsg, getTask, hideConfetti, hideMsg, setTheme } from "./assets/AppSlice";
import { Message } from "./components/Message";
import TodoList, { IApp } from "./components/TodoList";
import CheckButton from "./components/CheckButton"
import fireworks from "./sounds/fireworks.mp3"
import toggleTheme from "./sounds/toggleTheme.mp3"

export default function App() {
  const dispatch = useDispatch()
  const app = useSelector<IApp, IApp["App"]>(data => data.App)

  const fireworksAudio = new Audio(fireworks)
  const [isChecked, setIsChecked] = useState(false)
  const [cordenates, setCordenates] = useState({} as { x: number, y: number })
  const imgLink = "https://static.vecteezy.com/system/resources/previews/009/903/094/non_2x/confetti-for-party-occasions-or-festivals-simple-confetti-and-ribbon-flying-image-colorful-confetti-on-a-transparent-background-party-and-anniversary-celebration-elements-free-png.png"

  function handleToggleTheme() {
    const toggleThemeAudio = new Audio(toggleTheme)
    toggleThemeAudio.play()
    
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

  function randomNumber(max: number, min: number) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  useEffect(() => {
    const theme = localStorage.getItem("theme");
    if (theme != null) {
      dispatch(setTheme(theme));
      setIsChecked(theme === "dark");
    } else {
      dispatch(setTheme("light"));
    }

    dispatch(getTask());
  }, []);

  useEffect(() => {
    if (app.msgVisibility) {
      const timeoutId = setTimeout(() => {
        dispatch(hideMsg());
        dispatch(clearMsg());
      }, 2500);

      return () => {
        clearTimeout(timeoutId);
      };
    }
  }, [app.msgVisibility]);

  useEffect(() => {
    if (app.hasTaskDone) {
      fireworksAudio.play()
      const timeoutId = setTimeout(() => {
        dispatch(hideConfetti())
      }, 9800);

      return () => {
        clearTimeout(timeoutId);
      };
    }
  }, [app.hasTaskDone]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCordenates({
        x: randomNumber(0, window.innerWidth),
        y: randomNumber(0, window.innerHeight)
      });
    }, 3000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <div className={app.theme == "light" ? "App" : "App bg--dark"}>
      <CheckButton value={app.theme} onClick={handleToggleTheme} isChecked={isChecked} />
      {app.msgVisibility && <Message />}
      <TodoList />
      {app.hasTaskDone && <img src={imgLink} className="task-done-img" alt="" style={{ top: cordenates.y / 2, left: cordenates.x / 2 }} />}
    </div>
  )
}
