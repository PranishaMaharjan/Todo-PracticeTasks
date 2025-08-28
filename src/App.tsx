// import axios from "axios"

// import Tasks from './components/Tasks';
// import useQuery from './hooks/useQuery';

import "./App.css";
import React, { useState, useEffect, useRef } from "react";
import { draggable } from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import { dropTargetForElements } from "@atlaskit/pragmatic-drag-and-drop/element/adapter";

type Tasks = {
  id: number;
  title: string;
  completed: boolean;
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
  const [theme, setTheme] = useState<"light" | "dark">("light");
  // const [dragTask, setDragTask] = useState<Tasks | null>(null)


  //EDIT TASK
  const startEdit = (task: Tasks) => {
    setEditId(task.id);
    setEditTask(task.title);
  }

  const saveEdit = (id: number) => {
    setTasks((prev) => prev.map((tasks) => (tasks.id === id ? { ...tasks, title: editTask } : tasks)))
    setEditId(null);
    setEditTask("");
  }

  //ADD TASK
  const todoAdder = () => {
    setTasks((prev) => [...prev, { id: Math.random(), title: input, completed: false }]);
  };

  //DELETE TASK
  // const todoRemover = (id: number) => {
  //   console.log(id);
  //   const removeTasks = tasks.filter((e) => e.id !== id);
  //   setTasks(removeTasks);
  // };
  const todoRemover = (id: number) => {
    const removeTasks = tasks.filter((t) => t.id !== id);
    setTasks(removeTasks)
  }

  //SEARCH TASK
  const todoSearch = tasks.filter((e) => e.title.toLowerCase().includes(searchTask.toLowerCase()));

  //COMPLETE/INCOMPLETE TASK 
  const toggleCompleteTask = (id: number) => {
    // if task completed ie completed=true , toggle into completed=false and vice versa
    setTasks((prev) => prev.map((task) => task.id == id ? { ...task, completed: !task.completed } : task))
  }

  //SORT TASKS BY NAME AND COMPLETED TOGGLE CHECKBOX
  const todoSort = [...todoSearch].sort((a, b) => {
    if (sortTask === "name") {
      return a.title.localeCompare(b.title);
    }
    if (sortTask === "completed") {
      return Number(b.completed) - Number(a.completed);
    }
    return 0;
  })



  //DRAG AND DROP
  //Start dragging
  const todoDrag = (task: Tasks) => {
    setDragTask(task);
  }

  // Handle dragging over another item
  const handleDragOver = (e: React.DragEvent, id: number) => {
    e.preventDefault();
    setDragOverId(id);
  };

  // Drop inside incomplete/complete column
  const todoDrop = (completed: boolean) => {
    if (!dragTask) return;

    setTasks((prev: Tasks[]) => {
      // remove dragged task from array
      const updated = prev.filter((t) => t.id !== dragTask.id);

      console.log(updated, 'updated task')
      console.log(dragTask, 'drag task')

      // find index of item we hovered on
      const dropIndex = updated.findIndex((t) => t.id === dragOverId);
      console.log(dragOverId, 'dragOverId')

      console.log(dropIndex, 'id')

      // update dragged task’s completed field
      const newTask = { ...dragTask, completed };

      if (dropIndex === -1) {
        // if dropped on empty space, push to end
        updated.push(newTask);
      } else {
        // insert before hovered item
        updated.splice(dropIndex, 0, newTask);
      }

      return updated;
    });

    setDragTask(null);
    setDragOverId(null);
  };

  const incomplete = [...todoSearch].filter((e) => !e.completed);
  const complete = [...todoSearch].filter((e) => e.completed);


  //Make each element draggable using package
  function DraggableTask({ task, onDropTo }: { task: Tasks; onDropTo: (completed: boolean) => void }) {
    const ref = useRef<HTMLLIElement | null>(null);

    useEffect(() => {
      if (!ref.current) return;

      return draggable({
        element: ref.current,
        getInitialData: () => ({ task }),
      });
    }, [task]);

    return (
      <li
        ref={ref}
        className="flex items-center justify-between p-2 border rounded bg-white cursor-move"
      >
        {task.title}
      </li>
    );
  }


  function Column({
    title,
    completed,
    tasks,
    onTaskMove,
  }: {
    title: string;
    completed: boolean;
    tasks: Tasks[];
    onTaskMove: (task: Tasks, completed: boolean) => void;
  }) {
    const ref = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
      if (!ref.current) return;

      return dropTargetForElements({
        element: ref.current,
        getData: () => ({ completed }),
        onDrop: ({ source }) => {
          const droppedTask = source?.data?.task as Tasks;
          if (droppedTask) {
            onTaskMove(droppedTask, completed);
          }
        },
      });
    }, [completed, onTaskMove]);

    return (
      <div ref={ref} className="p-4 border-2 border-black-900 rounded min-h-[200px]">
        <h2 className="font-bold">{title}</h2>
        <ul className="space-y-2">
          {tasks.map((task) => (
            <DraggableTask key={task.id} task={task} onDropTo={() => { }} />
          ))}
        </ul>
      </div>
    );
  }


  // function Board() {
  //   const [draggableTask, setdraggableTasks] = useState < task
  // }

  return (
    <div className={`w-screen h-screen m-0 p-0 flex justify-center ${theme === "dark" ? "bg-black text-white" : "bg-white text-black"}`}>
      <div className="w-[1280px] my-20">
        <div className="flex justify-between">
          <h1 className="text-4xl font-bold">Todo Lists</h1>
          <button className="theme_bottom relative p-0 w-10 h-5.5" onClick={() => setTheme(theme === "dark" ? "light" : "dark")} >
            {theme == "dark"
              ? <div className="absolute bg-white w-5.5 rounded-xl h-full top-0"></div>
              : <div className="absolute bg-black w-5.5 rounded-xl h-full top-0 right-0"></div>}
          </button>
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
          {/* DND Packages */}
          <div className="grid grid-cols-2 gap-4">

            <Column
              title="Incomplete Tasks"
              completed={false}
              tasks={incomplete}
              onTaskMove={(task, completed) =>
                setTasks((prev) =>
                  prev.map((t) => (t.id === task.id ? { ...t, completed } : t))
                )
              }

            >
              <button>Hello</button>
            </Column>

            <Column
              title="Complete Tasks"
              completed={true}
              tasks={complete}
              onTaskMove={(task, completed) =>
                setTasks((prev) =>
                  prev.map((t) => (t.id === task.id ? { ...t, completed } : t))
                )
              }
            />

            {/* <Column title="Complete Task" completed={true} tasks={complete} /> */}
          </div>


          <ul className="space-y-2">

            {todoSort.length > 0 ? (todoSort.map((task) => (
              <li
                key={task.id}
                className="flex items-center justify-between p-2 border rounded"
              >
                {/* No DND Packages */}
                <div className="grid grid-cols-2 rounded min-h-[200px] gap-4">
                  {/*INCOMPLETE TASK COLUMN */}
                  <div className="drop-column p-4 border-2 border-black-900 " onDragOver={(e) => e.preventDefault()} onDrop={() => todoDrop(false)} >
                    <h2 className="font-bold">Incomplete Task</h2>
                    <ul className="space-y-2">
                      {incomplete.length > 0 ? (incomplete.map((task) => (
                        <li
                          key={task.id}
                          draggable
                          className={`draggable-task flex items-center justify-between p-2 border rounded`} onDragStart={() => todoDrag(task)} onDragOver={(e) => handleDragOver(e, task.id)}
                        >

                          {editId === task.id ? (<input id="edit_input" className=" border-1 border-black px-2 py-1 pointer" type="text" value={editTask} onChange={(e) => setEditTask(e.target.value)} />) : (<span className={task.completed ? "line-through" : ""} >{task.title}</span>)}
                          <div className="flex gap-4">
                            <input type="checkbox" checked={task.completed} onChange={() => toggleCompleteTask(task.id)} />

                            {editId === task.id ? (<button onClick={() => saveEdit(task.id)} className="save_button">Save</button>) : (<button form="edit_input" onClick={() => startEdit(task)}>Edit</button>)}
                            {/* {<button onClick={()=>{if(saveEdit(task.id)){
class=""
                }}}></button>} */}
                            <button onClick={() => todoRemover(task.id)}>Delete</button>

                          </div>

                        </li>
                      ))) : "No tasks found"}

                    </ul>
                  </li>
                  ))) : "No tasks found"
              }
                </ul>
              </div>

          {/*COMPLETE TASK COLUMN */ }
              < div className = "p-4 border-black-2  border-2 border-black-900 " onDragOver = {(e) => e.preventDefault()} onDrop={() => todoDrop(true)} >
            <h2 className="font-bold">Complete Task</h2>
            <ul className="space-y-2">
              {complete.length > 0 ? (complete.map((task) => (
                <li
                  key={task.id}
                  className="flex items-center justify-between p-2 border rounded" draggable onDragStart={() => todoDrag(task)}
                  onDragOver={(e) => handleDragOver(e, task.id)}
                >

                  {editId === task.id ? (<input id="edit_input" className=" border-1 border-black px-2 py-1 pointer" type="text" value={editTask} onChange={(e) => setEditTask(e.target.value)} />) : (<span className={task.completed ? "line-through" : ""} >{task.title}</span>)}
                  <div className="flex gap-4">
                    {/* <input type="checkbox" checked={task.completed} onChange={() => toggleCompleteTask(task.id)} /> */}

                    {editId === task.id ? (<button onClick={() => saveEdit(task.id)} className="save_button">Save</button>) : (<button form="edit_input" onClick={() => startEdit(task)}>Edit</button>)}
                    {/* {<button onClick={()=>{if(saveEdit(task.id)){
class=""
                }}}></button>} */}
                    <button onClick={() => todoRemover(task.id)}>Delete</button>

                  </div>

                </li>
              ))) : "No tasks found"
              }
            </ul>
          </>
        </div>




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
    </div >

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
