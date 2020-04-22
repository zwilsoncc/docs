export const ButtonStyles = `
.btn-yellow {
	@apply bg-yellow-400 text-black font-bold py-2 px-4 rounded;
}

.btn-yellow:hover {
	@apply bg-yellow-500; 
}
`

export const IndexCSS = `
@import "./button.css";

/* purgecss start ignore */
@tailwind base;
@tailwind components;
/* purgecss end ignore */
@tailwind utilities;
`

export const AppJs = `
import { useState, useEffect } from "react";
import userbase from "userbase-js";
import Layout from "../components/layout";

import "../styles/index.css";

function MyApp({ Component, pageProps }) {
  const [user, setUser] = useState();

  useEffect(() => {
    userbase.init({ appId: process.env.USERBASE_APP_ID });
  }, []);

  return (
    <Layout user={user} setUser={setUser}>
      <Component user={user} {...pageProps} />
    </Layout>
  );
}

export default MyApp;
`

export const Layout = `
import Nav from "../nav";
function Layout({ user, setUser, children }) {
  return (
    <div className="container mx-auto">
      <Nav user={user} setUser={setUser} />
      {children}
    </div>
  );
}

export default Layout;
`

export const Nav = `
import { useState } from "react";
import LoginModal from "../modal";

import userbase from "userbase-js";

export default function Nav({ user, setUser }) {
  const [open, setOpen] = useState();
  const [modalType, setModalType] = useState();

  function openModal(type) {
    setOpen(true);
    setModalType(type);
  }

  async function logOut() {
    try {
      await userbase.signOut();
      setUser(null);
    } catch (e) {
      console.error(e.message);
    }
  }

  return (
    <nav className="container mx-auto">
      <ul className="flex justify-end items-center p-8">
        {!user ? (
          <>
            <li>
              <button
                className="font-bold mx-2"
                onClick={() => openModal("logIn")}
              >
                Log In
              </button>
            </li>
            <li>
              <button
                className="btn-yellow mx-2"
                onClick={() => openModal("signUp")}
              >
                Sign Up
              </button>
            </li>
          </>
        ) : (
          <li>
            <button className="font-bold" onClick={logOut}>
              Log Out
            </button>
          </li>
        )}
      </ul>
      {open && (
        <div className="w-4/5 md:w-1/2 mx-auto">
          <LoginModal
            toggle={setOpen}
            modalType={modalType}
            setUser={setUser}
          />
        </div>
      )}
    </nav>
  );
}
`

export const Modal = `
import { useState, useEffect } from "react";
import userbase from "userbase-js";

function LoginModal({ toggle, modalType, setUser }) {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [loading, setLoading] = useState();
  const [error, setError] = useState();

  useEffect(() => {
    setError("");
  }, [modalType]);

  async function handleSignUp(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const user = await userbase.signUp({ username, password, rememberMe: "none" });
      setUser(user)
      setLoading(false);
      toggle(false);
    } catch (e) {
      setLoading(false);
      setError(e.message);
    }
  }

  async function handleLogIn(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const user = await userbase.signIn({
        username,
        password,
        rememberMe: "none",
      });
      setUser(user);
      setLoading(false);
      toggle(false);
    } catch (e) {
      setLoading(false);
      setError(e.message);
    }
  }

  return (
    <form className="bg-white shadow-md rounded p-8">
      <div className="mb-4">
        <label
          className="block text-purple-700 text-sm font-bold mb-2"
          htmlFor="username"
        >
          Username
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="username"
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label
          className="block text-purple-700 text-sm font-bold mb-2"
          htmlFor="username"
        >
          Password
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="password"
          type="password"
          placeholder="*******"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className="flex items-center justify-between">
        <span
          className="font-bold cursor-pointer"
          onClick={() => toggle(false)}
        >
          Cancel
        </span>
        {modalType === "logIn" ? (
          <button
            disabled={loading}
            className="btn-yellow"
            onClick={handleLogIn}
          >
            {loading ? "Logging In ..." : "Log In"}
          </button>
        ) : (
          <button
            disabled={loading}
            className="btn-yellow"
            onClick={handleSignUp}
          >
            {loading ? "Signing up ..." : "Sign Up"}
          </button>
        )}
      </div>
      <p className="text-red-500 font-bold">{error}</p>
    </form>
  );
}

export default LoginModal;
`

export const TodoForm = `
import { useState, useEffect } from "react";
import userbase from "userbase-js";

function Todo({ name, done, toggleComplete, deleteTodo }) {
  return (
    <li className="my-4">
      <div className="flex items-center">
        <span className={done ? "text-gray-500" : ""}>{name}</span>
        <button
          type="button"
          className="mx-4 p-1 rounded bg-purple-400 text-white font-bold"
          onClick={(e) => {
            e.preventDefault();
            toggleComplete();
          }}
        >
          {done ? "not done" : "done"}
        </button>
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            deleteTodo();
          }}
          className=" p-1 bg-red-500 text-white rounded font-bold"
        >
          delete
        </button>
      </div>
    </li>
  );
}

function TodoForm() {
  const [newTodo, setNewTodo] = useState();
  const [todos, setTodos] = useState([]);
  const [disabled, setDisabled] = useState();

  useEffect(() => {
    async function openDatabase() {
      try {
        await userbase.openDatabase({
          databaseName: "next-userbase-todos",
          changeHandler: function (items) {
            setTodos(items);
          },
        });
      } catch (e) {
        console.error(e.message);
      }
    }
    openDatabase();
  }, []);

  async function addTodo(e) {
    e.preventDefault();
    setDisabled(true);
    try {
      await userbase.insertItem({
        databaseName: "next-userbase-todos",
        item: { name: newTodo, done: false },
      });
      setNewTodo("");
      setDisabled(false);
    } catch (e) {
      console.error(e.message);
      setDisabled(false);
    }
  }

  async function toggleComplete(itemId, currentValue) {
    try {
      await userbase.updateItem({
        databaseName: "next-userbase-todos",
        item: { ...currentValue, done: !currentValue.done },
        itemId,
      });
    } catch (e) {
      console.error(e.message);
    }
  }

  function handleNewTodo(e) {
    e.preventDefault();
    setNewTodo(e.target.value);
  }

  async function deleteTodo(itemId) {
    setDisabled(true);
    try {
      await userbase.deleteItem({
        databaseName: "next-userbase-todos",
        itemId,
      });
      setNewTodo("");
      setDisabled(false);
    } catch (e) {
      console.error(e.message);
      setDisabled(false);
    }
  }

  return (
    <form className="bg-white shadow-md rounded p-8" onSubmit={addTodo}>
      <ul>
        {todos.map((todo) => (
          <Todo
            key={todo.itemId}
            name={todo.item.name}
            done={todo.item.done}
            toggleComplete={() => toggleComplete(todo.itemId, todo.item)}
            deleteTodo={() => deleteTodo(todo.itemId)}
          />
        ))}
      </ul>
      <div className="flex my-4">
        <input
          type="text"
          onChange={handleNewTodo}
          value={newTodo}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          autofocus
        />
        <button disabled={disabled} className="btn-yellow mx-4" type="submit">
          add
        </button>
      </div>
    </form>
  );
}

export default TodoForm;
`

export const HomePage = `
import TodoForm from "../components/todo-form";

function Index({ user }) {
  if (user) {
    return (
      <div className="w-4/5 md:w-1/2 mx-auto">
        <h3 className="font-bold text-4xl">
          Welcome, <span className="bg-yellow-400">{user.username}</span>!
        </h3>
        <TodoForm />
      </div>
    );
  } else {
    return null;
  }
}

export default Index;
`
