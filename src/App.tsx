// import axios from "axios"

// import Tasks from './components/Tasks';
// import useQuery from './hooks/useQuery';

import "./App.css";
import { useState } from "react";

type Tasks = {
  id: number;
  title: string;
};

function App() {
  const [tasks, setTasks] = useState<Tasks[]>([
    { id: 1, title: "Learn React" },
    { id: 2, title: "Learn TypeScript" },
  ]);
  const [input, setInput] = useState("");
  // const [editTasks, setEditTasks] = useState<boolean>(true);
  const [editId, setEditId] = useState<number | null>(null);
  const [editTask, setEditTask] = useState<string>("");

  const startEdit = (task: Tasks) => {
    setEditId(task.id);
    setEditTask(task.title);
  }

  const saveEdit = (id: number) => {
    setTasks((prev) => prev.map((tasks) => (tasks.id === id ? { ...tasks, title: editTask } : tasks)))
  }

  const todoAdder = () => {
    setTasks((prev) => [...prev, { id: Math.random(), title: input }]);
  };

  const todoRemover = (id: number) => {
    console.log(id);
    const removeTasks = tasks.filter((e) => e.id !== id);
    setTasks(removeTasks);
  };
  return (
    <div>
      <div>
        <h1 className="text-4xl font-bold">Todo Lists</h1>
      </div>
      <div className="my-4 flex justify-center">
        <div className="flex gap-4">
          <input
            className="bg-white rounded-sm p-2 border-2 border-black"
            type="text"
            placeholder=""
            onChange={(e) => setInput(e.target.value)}
          />
          <button onClick={todoAdder}>Add</button>
        </div>
      </div>
      <ul className="space-y-2">
        {tasks.map((task) => (
          <li
            key={task.id}
            className="flex items-center justify-between p-2 border rounded"
          >
            {editId === task.id ? (<input type="text" value={editTask} onChange={(e) => setEditTask(e.target.value)} />) : (<span>{task.title}</span>)}
            <div className="flex gap-4">
              {editId === task.id ? (<button onClick={() => saveEdit(task.id)}>Save</button>) : (<button onClick={() => startEdit(task)}>Edit</button>)}
              <button onClick={() => todoRemover(task.id)}>Delete</button>

            </div>

          </li>
        ))}
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
