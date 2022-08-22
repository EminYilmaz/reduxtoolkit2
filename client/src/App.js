import { useState, useEffect } from "react";
import "./App.css";
import { useSelector, useDispatch } from "react-redux";
import {
  updateData,
  addData,
  selectPersonel,
  getData,
  addDataAndGet,
} from "./features/Personel";
import { addUser, deleteUser, updateUser } from "./features/Personel";

function App() {
  let userList = useSelector((state) => state.users.users);

  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [newname, setNewname] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getData());
  }, []);

  return (
    <div className="App">
      <h1>ReduxToolkit Uygulaması</h1>
      {userList.loading && <div>Loading...</div>}
      <label>Ad</label>
      <input
        type={"text"}
        onChange={(e) => {
          setName(e.target.value);
        }}
      ></input>
      <label>Ülke</label>
      <input
        type={"text"}
        onChange={(e) => {
          setSurname(e.target.value);
        }}
      ></input>
      <button
        onClick={() => {
          dispatch(
            addData({
              name: name,
              surname: surname,
            })
          );
        }}
      >
        Ekle
      </button>
      <div>
        {userList.map((user) => {
          return (
            <div>
              <h2>
                {user.name} {user.surname}
              </h2>
              <button
                onClick={() => {
                  dispatch(
                    deleteUser({
                      id: user.id,
                    })
                  );
                }}
              >
                Sil
              </button>
              <input
                type={"text"}
                placeholder="name..."
                onChange={(e) => {
                  setNewname(e.target.value);
                }}
              ></input>
              <button
                onClick={() => {
                  dispatch(
                    updateData({
                      id: user.id,
                      name: newname,
                    })
                  );
                }}
              >
                Güncelle
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
