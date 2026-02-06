"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";
import { redirect } from "next/navigation";

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [taskDate, setTaskDate] = useState("");

  async function logout() {
    await supabase.auth.signOut();
    redirect("/login");
  }

  useEffect(() => {
  async function loadData() {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    // ❌ Not logged in → redirect
    if (!session) {
      redirect("/login");
      return;
    }

    // ✅ Logged in → fetch only their tasks
    const { data } = await supabase
      .from("tasks")
      .select("*")
      .eq("user_id", session.user.id)
      .order("created_at", { ascending: false });

    setTasks(data || []);
  }

  loadData();
}, []);


  async function addTask() {
  if (!title.trim()) return;

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    redirect("/login");
    return;
  }

  const { data, error } = await supabase
    .from("tasks")
    .insert([
      {
        title,
        description,
        task_date: taskDate,
        status: "pending",
        user_id: session.user.id, // 🔥 important
      },
    ])
    .select();

  if (error) return console.error(error);

  setTasks((prev) => [data[0], ...prev]);
  setTitle("");
  setDescription("");
  setTaskDate("");
}


  async function updateStatus(id, status) {
    await supabase.from("tasks").update({ status }).eq("id", id);
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, status } : t))
    );
  }

  async function deleteTask(id) {
    await supabase.from("tasks").delete().eq("id", id);
    setTasks((prev) => prev.filter((t) => t.id !== id));
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#667eea] to-[#764ba2] px-6 py-10">
      <div className="mx-auto max-w-5xl rounded-3xl bg-white p-10 shadow-2xl">
        {/* Header */}
        <div className="mb-10 flex flex-wrap items-center justify-between gap-4 border-b pb-6">
          <div>
            <h1 className="text-4xl font-bold text-gray-800">
              TaskFlow ✅
            </h1>
            <p className="mt-1 text-gray-500">
              Manage your daily tasks
            </p>
          </div>

          <form action={logout}>
            <button className="rounded-xl bg-gradient-to-r from-red-500 to-red-600 px-6 py-3 font-semibold text-white shadow-md transition hover:scale-105 active:scale-95">
              Logout
            </button>
          </form>
        </div>

        {/* Add Task */}
        <div className="mb-10 rounded-2xl border bg-gray-50 p-8 shadow-sm">
          <h2 className="mb-6 text-xl font-semibold text-gray-800">
            ➕ Add New Task
          </h2>

          <div className="flex flex-col gap-4 md:flex-row">
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="What do you need to do?"
              className="flex-1 rounded-xl border px-4 py-3 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />

            <input
              type="date"
              value={taskDate}
              onChange={(e) => setTaskDate(e.target.value)}
              className="rounded-xl border px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />

            <button
              onClick={addTask}
              className="rounded-xl bg-green-600 px-8 py-3 font-semibold text-white shadow-md transition hover:bg-green-700 active:scale-95"
            >
              Add
            </button>
          </div>

          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Add task details (optional)"
            className="mt-4 w-full resize-none rounded-xl border px-4 py-3 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Tasks */}
        <h2 className="mb-5 text-xl font-semibold text-gray-800">
          📋 Your Tasks ({tasks.length})
        </h2>

        {tasks.length === 0 ? (
          <div className="rounded-2xl border-2 border-dashed bg-gray-50 p-12 text-center">
            <p className="text-gray-500">
              🎉 No tasks yet. Add your first task above!
            </p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {tasks.map((task) => (
              <div
                key={task.id}
                className="group relative rounded-2xl border bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-lg"
              >
                {/* Status stripe */}
                <div
                  className={`absolute left-0 top-0 h-full w-1 rounded-l-2xl ${
                    task.status === "completed"
                      ? "bg-green-500"
                      : task.status === "in_progress"
                      ? "bg-blue-500"
                      : task.status === "not_done"
                      ? "bg-red-500"
                      : "bg-yellow-400"
                  }`}
                />

                <h3
                  className={`text-lg font-medium text-gray-800 ${
                    task.status === "completed" ? "line-through" : ""
                  }`}
                >
                  {task.title}
                </h3>

                <p className="mt-1 text-sm text-gray-500">
                  📅{" "}
                  {task.task_date
                    ? new Date(task.task_date).toLocaleDateString()
                    : "No date"}
                </p>

                {task.description && (
                  <p className="mt-2 text-sm text-gray-600">
                    {task.description}
                  </p>
                )}

                <div className="mt-4 flex items-center justify-between">
                  <select
                    value={task.status}
                    onChange={(e) =>
                      updateStatus(task.id, e.target.value)
                    }
                    className={`rounded-full px-3 py-1 text-sm font-medium focus:outline-none ${
                      task.status === "completed"
                        ? "bg-green-100 text-green-700"
                        : task.status === "in_progress"
                        ? "bg-blue-100 text-blue-700"
                        : task.status === "not_done"
                        ? "bg-red-100 text-red-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    <option value="pending">🕒 Pending</option>
                    <option value="in_progress">⚙️ In Progress</option>
                    <option value="completed">✅ Completed</option>
                    <option value="not_done">❌ Not Done</option>
                  </select>

                  <button
                    onClick={() => deleteTask(task.id)}
                    className="text-sm font-medium text-red-500 opacity-70 transition hover:opacity-100 hover:underline"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
