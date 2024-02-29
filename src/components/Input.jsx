import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./input.css";
import "./task.css";
import "../index.css";

function Input() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [data, setData] = useState([]);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("task")) || [];
    setData(storedData);
  }, []);
  const notify = () => {
    toast.success("Task Added!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
    });
  };
  const delet = () => {
    toast.info("Task Deleted!", {
      position: "top-right",
      autoClose: 3400,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
    });
  };
  const addTask = async () => {
    if (!title.trim() && !desc.trim()) {
      toast.error("Title and Description are required!");
      return;
    }

    if (!title.trim()) {
      toast.error("Title is required!");
      return;
    }

    if (!desc.trim()) {
      toast.error("Description is required!");
      return;
    }

    const newTask = { title, desc };
    setData([...data, newTask]);
    localStorage.setItem("task", JSON.stringify([...data, newTask]));

    setTitle("");
    setDesc("");
    notify();
  };

  const deleteTask = (name) => {
    const filteredData = data.filter((item) => item.title !== name);
    setData(filteredData);
    localStorage.setItem("task", JSON.stringify([...filteredData]));
    delet();
  };
  return (
    <>
      <div className="inputs">
        <input
          type="text"
          value={title}
          placeholder="Title"
          onChange={(e) => setTitle(e.target.value)}
          className="input"
        />
        <input
          type="text"
          value={desc}
          placeholder="Description"
          onChange={(e) => setDesc(e.target.value)}
          className="input"
        />
        <button onClick={addTask}>ADD</button>
      </div>
      <hr />
      <div className="allTasks">
        {data.map((task, i) => (
          <div key={i} className="border-b border-gray-200 py-4">
            <div className="flex items-center">
              <div
                className={`flex justify-around w-full ${
                  task.cc || ""
                } items-center`}
              >
                <input
                  checked={task.c}
                  type="checkbox"
                  className="mr-2 h-4 w-4 text-blue-500 rounded"
                  onChange={(e) => {
                    const updatedData = data.map((t) => {
                      if (t.title === task.title) {
                        t.c = !t.c;
                        t.cc = t.cc === "click" ? "" : "click"; // Toggle the class 'click' on cc property
                      }
                      return t;
                    });
                    setData(updatedData); // Update the state with the modified data
                    localStorage.setItem("task", JSON.stringify(updatedData)); // Update localStorage
                  }}
                />

                <h1 className="text-lg a font-bold leading-tight">
                  {task.title}
                </h1>
                <p className="text-sm a text-gray-600">{task.desc}</p>

                <button
                  className="ml-4 bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                  onClick={() => deleteTask(task.title)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition:Bounce
      />
    </>
  );
}

export default Input;
