

const Task = ( { task }) => {
    return (
        <div className = 'task'>
            
            <h4>Open</h4>
            <p>{task.open}</p>
            
            <h4>High</h4>
            <p>{task.high}</p>
            
            <h4>Low</h4>
            <p>{task.low}</p>
            
            <h4>Volume</h4>
            <p>{task.volume}</p>
        </div>
    )
}

export default Task
