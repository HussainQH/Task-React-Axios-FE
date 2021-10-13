import React, { useState } from "react";
import ChatRoomitem from "./ChatRoomitem";
import CreateRoomModal from "./CreateRoomModal";

function ChatRoomsList(props) {
  const [isOpen, setIsOpen] = useState(false);

  const closeModal = () => setIsOpen(false);

  const openModal = () => setIsOpen(true);

  const roomsList = props.rooms.map((room) => {
    return (
      <ChatRoomitem
        deleteRoom={props.deleteRoom}
        room={room}
        key={room.id}
        updateRoom={props.updateRoom}
      />
    );
  });
  return (
    <div className="main__chatlist">
      <button className="btn">
        <i className="fa fa-plus"></i>
        <span onClick={openModal}>New room</span>
        <CreateRoomModal
          createRoom={props.createRoom}
          isOpen={isOpen}
          closeModal={closeModal}
        />
      </button>
      <center>
        <div className="chatlist__heading">
          <h2>Chat rooms</h2>
        </div>
      </center>

      <div className="chatlist__items">{roomsList}</div>
    </div>
  );
}
export default ChatRoomsList;
