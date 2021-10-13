import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import ChatRoom from "./components/ChatRoom";
import ChatRoomsList from "./components/ChatRoomsList";
import { Route, Switch } from "react-router";
import axios from "axios";

function App() {
  const [rooms, setRooms] = useState([]);

  const fetchRoom = async () => {
    try {
      const response = await axios.get(
        "https://coded-task-axios-be.herokuapp.com/rooms"
      );
      setRooms(response.data);
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    fetchRoom();
  }, []);
  const createRoom = async (newRoom) => {
    try {
      const response = await axios.post(
        "https://coded-task-axios-be.herokuapp.com/rooms",
        newRoom
      );
      setRooms([...rooms, response.data]);
    } catch (error) {
      alert(error);
    }
  };

  const deleteRoom = async (id) => {
    try {
      const response = await axios.delete(
        `https://coded-task-axios-be.herokuapp.com/rooms/${id}`
      );

      const roomsNew = rooms.filter((room) => room.id !== id);
      setRooms(roomsNew);
    } catch (error) {
      alert(error);
    }
  };
  const updateRoom = async (id, room) => {
    try {
      const response = await axios.put(
        `https://coded-task-axios-be.herokuapp.com/rooms/${id}`,
        room
      );

      const updatedRoom = rooms.map((room) =>
        room.id === id ? response.data : room
      );

      setRooms(updatedRoom);
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div className="__main">
      <div className="main__chatbody">
        <Switch>
          <Route path="/room/:roomSlug">
            <ChatRoom rooms={rooms} />
          </Route>
          <Route exact path="/">
            <center>
              <ChatRoomsList
                deleteRoom={deleteRoom}
                createRoom={createRoom}
                rooms={rooms}
                updateRoom={updateRoom}
              />
            </center>
          </Route>
        </Switch>
      </div>
    </div>
  );
}

export default App;
