export type TaskTypes = {
    title: string,
    description: string,
    status: string
}

interface CardTypes {
    task: TaskTypes;
}

export default function Card(data: CardTypes) {
    return (
        <div className="card">
            <h4 className="card-title">{data.task.title}</h4>
            <p className="card-decription">{data.task.description}</p>
            <div className="card-buttons">
                <button className="card-button">V</button>
                <button className="card-button">X</button>
                </div>
        </div>
    )
}