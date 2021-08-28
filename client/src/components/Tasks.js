import { useState } from 'react'
import Task from './Task'

const Tasks = () => {
    const [tasks, setTasks] = useState([
        {
            open: '$2.30', high: '2.33', low: '$2.333', volume: '1.298',
        }
    ])




    return (
        <>
          {tasks.map((task) => 
          
          (<Task key={task.open} task={task}/>
              
              ))}  
        </>
    )
}

export default Tasks
