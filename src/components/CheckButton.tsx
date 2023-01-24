export default function name({value,onClick, isChecked}:{value:string, onClick:any, isChecked:boolean}) {
    return (
        <div className="theme-container">
            <input id="theme" onChange={() => {}} className="theme-input" checked={isChecked} value={value} type="checkbox" onClick={onClick}/>
            <label htmlFor="theme" className="theme-label">
                <span className="theme-slider"></span>
            </label>
        </div>
    )
}