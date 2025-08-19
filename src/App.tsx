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
  const [editTasks, setEditTasks] = useState<boolean>(true);

  const todoEditer = (id: number) => {
    setEditTasks(false)
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
      <div className="mb-4">
        <div className="flex justify-center">
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
            <input disabled={editTasks} value={task.title} />
            <div className="flex justify-between gap-2">
              <button onClick={() => todoEditer(task.id)}>Edit</button>
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
