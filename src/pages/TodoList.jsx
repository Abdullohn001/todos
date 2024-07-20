//rrd import
import { Form, useActionData } from "react-router-dom";

//custom hooks
import { useCollection } from "../hooks/useCollection";
//components
import { useEffect } from "react";
//firebase
import { signOut } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import toast from "react-hot-toast";

//context
import { useGlobalContext } from "../hooks/useGlobalContext";

//action
export const action = async ({ request }) => {
  let formData = await request.formData();
  let title = formData.get("title");
  return { title };
};

function TodoList() {
  const { user } = useGlobalContext();

  const { data } = useCollection(
    "todos",
    ["uid", "==", user.uid],
    ["createdAt"]
  );

  const dataTodo = useActionData();

  const handleDelete = (id) => {
    deleteDoc(doc(db, "todos", id))
      .then(() => {
        toast.success("Deleted message.");
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  const signOutProfile = async () => {
    await signOut(auth);
    toast.success("See you Soon!");
  };

  useEffect(() => {
    if (dataTodo) {
      const newTodo = {
        ...dataTodo,
        comleted: true,
        createdAt: serverTimestamp(),
        uid: user.uid,
      };

      addDoc(collection(db, "todos"), newTodo)
        .then(() => {
          toast.success("New massage added!");
        })
        .catch((error) => {
          toast.error(error.message);
        });
    }
  }, [dataTodo]);

  return (
    <div className="">
      {data &&
        data.map((todo) => {
          return (
            <div key={todo.id} className=" rounded-lg gap-10 mt-[50px] ">
              <div className="chat chat-start w-full">
                <div className="chat-image avatar">
                  <div className="w-10 rounded-full">
                    <img
                      alt="Tailwind CSS chat bubble component"
                      src={user.photoURL}
                    />
                  </div>
                </div>
                <div className="chat-header">
                  <h5>{user.displayName}</h5>
                  <time className="text-xs opacity-50">
                    <h4>{todo.serverTimestamp}</h4>
                  </time>
                </div>
                <div className="chat-bubble">
                  <h2>{todo.title}</h2>
                </div>
              </div>
              <div className="chat chat-end w-full">
                <div className="chat-image avatar">
                  <div className="w-10 rounded-full">
                    <img
                      alt="Tailwind CSS chat bubble component"
                      src={user.photoURL}
                    />
                  </div>
                </div>
                <div className="chat-header">
                  <h6>{user.displayName}</h6>
                  <time className="text-xs opacity-50"></time>
                </div>
                <div className="chat-bubble">
                  <h2>{todo.title}</h2>
                </div>
              </div>

              {/* <div className="">
                <div className="hover:contrast-50 rounded-lg shadow-xl ">
                  <h2 className="text-3xl rounded-lg bg-base-100 text-center p-3 font-serif">
                    {todo.title}
                  </h2>
                </div>
              </div> */}
            </div>
          );
        })}

      <div className="flex justify-center mt-[20px]">
        <div className="flex pr-5 w-20 lg:flex-col items-center">
          <div className="dropdown dropdown-top">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-20 rounded-full">
                <img alt="Tailwind CSS Navbar component" src={user.photoURL} />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-60 p-2 shadow"
            >
              <li>
                <small className="text-[10px] pb-0">email:</small>
                <p className="justify-between font-medium pt-0">{user.email}</p>
              </li>
              <li>
                <small className="text-[10px] pb-0">full name :</small>
                <p className="capitalize font-semibold font-serif mb-3">
                  {user.displayName}{" "}
                </p>
              </li>
              <li>
                <button
                  onClick={signOutProfile}
                  className=" font-serif text-lg bg-red-300 font-semibold"
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </div>
        <Form className="flex " method="post">
          <input
            name="title"
            type="text"
            placeholder="Write something for Abdulloh"
            className="input input-bordered focus:bg-inherit w-[500px]"
          />
          <button className="btn btn-info ">Add</button>
        </Form>
      </div>
    </div>
  );
}

export default TodoList;
