// import axios from "axios"

// import Tasks from './components/Tasks';
// import useQuery from './hooks/useQuery';

import "./App.css";
import { useState } from "react";

type Tasks = {
  id: number;
  title: string;
  completed: boolean
};

function App() {
  const [tasks, setTasks] = useState<Tasks[]>([
    { id: 1, title: "Learn React", completed: true },
    { id: 2, title: "Learn TypeScript", completed: false },
  ]);
  const [input, setInput] = useState("");
  // const [editTasks, setEditTasks] = useState<boolean>(true);
  const [editId, setEditId] = useState<number | null>(null);
  const [editTask, setEditTask] = useState<string>("");
  const [searchTask, setSearchTask] = useState<string>("");
  const [sortTask, setSortTask] = useState<"name" | "completed" | "none">("none");


  //EDIT TASK
  const startEdit = (task: Tasks) => {
    setEditId(task.id);
    setEditTask(task.title);
  }

  const saveEdit = (id: number) => {
    setTasks((prev) => prev.map((tasks) => (tasks.id === id ? { ...tasks, title: editTask } : tasks)))
  }

  //ADD TASK
  const todoAdder = () => {
    setTasks((prev) => [...prev, { id: Math.random(), title: input }]);
  };

  //DELETE TASK
  const todoRemover = (id: number) => {
    console.log(id);
    const removeTasks = tasks.filter((e) => e.id !== id);
    setTasks(removeTasks);
  };

  //SEARCH TASK
  const todoSearch = tasks.filter((e) => e.title.toLowerCase().includes(searchTask.toLowerCase()));

  //COMPLETE/INCOMPLETE TASK 
  const toggleCompleteTask = (id: number) => {
    setTasks((prev) => prev.map((task) => task.id == id ? { ...task, completed: !task.completed } : task))//if task completed ie completed=true , toggle into completed=false and viceversA
  }

  //SORT TASKS BY NAME AND COMPLETED TOGGLE CHECKBOX
  const todoSort = [...todoSearch].sort((a, b) => {
    if (sortTask === "name") {
      return a.title.localeCompare(b.title);
    }
    else if (sortTask === "completed") {
      return Number(b.completed) - Number(a.completed);
    }
    return 0;
  })

  return (
    <div>
      <div>
        <h1 className="text-4xl font-bold">Todo Lists</h1>
      </div>
      <div className="my-10 flex justify-between items-center">
        <div className="flex gap-4">
          <input
            className="bg-white rounded-sm p-2 border-2 border-black"
            type="text"
            placeholder=""
            onChange={(e) => setInput(e.target.value)}
          />
          <button onClick={todoAdder}>Add</button>
        </div>

        <div className="flex gap-4">
          <input className="bg-white rounded-sm p-2 border-2 border-black max-w-48"
            type="text" value={searchTask} onChange={(e) => setSearchTask(e.target.value)} placeholder="Search Tasks..." />
        </div>


      </div>

      <div className="my-4 flex">
        <select className="border-1 rounded-xl px-4 py-1" value={sortTask} onChange={(e) => setSortTask(e.target.value as "name" | "completed" | "none")} >
          <option value="none">No sorting</option>
          <option value="name">Sort by name</option>
          <option value="completed">Sort by completion</option>
        </select>
      </div>


      <ul className="space-y-2">

        {todoSort.length > 0 ? (todoSort.map((task) => (
          <li
            key={task.id}
            className="flex items-center justify-between p-2 border rounded"
          >
            {editId === task.id ? (<input type="text" value={editTask} onChange={(e) => setEditTask(e.target.value)} />) : (<span>{task.title}</span>)}
            <div className="flex gap-4">
              <input type="checkbox" checked={task.completed} onChange={() => toggleCompleteTask(task.id)} />
              {editId === task.id ? (<button onClick={() => saveEdit(task.id)}>Save</button>) : (<button onClick={() => startEdit(task)}>Edit</button>)}
              <button onClick={() => todoRemover(task.id)}>Delete</button>

            </div>

          </li>
        ))) : "No tasks found"}

      </ul>

      {/* <AsncWrapper isError={peopleAPI.isError} isLoading={peopleAPI.isLoading} component={
        <div>
          {
            //@ts-ignore
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            peopleAPI?.data?.data?.map((item: any) => {
              return <div key={`todos-${item.id}`}>
                <p>UserId:{item.userId}</p>
                <p>Title:{item.title}</p>
              </div>
            })
          }
          {JSON.stringify(peopleAPI.data)}
        </div>
      } /> */}
    </div>
  );
}

export default App;

// const AsncWrapper = ({ isError, isLoading, component }: { isLoading: boolean, isError: boolean, component: React.ReactNode }) => {
//   return <div>
//     {isLoading && <div>Loading...</div>}
//     {isError && <div>Error Occurred...</div>}
//     {!isError && !isLoading && component}
//   </div>
// }
