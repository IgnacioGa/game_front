import { useDispatch, useSelector } from "react-redux";
import { onCreate } from "../store";

export const useRoomStore = () => {
    const dispatch = useDispatch();

    const {room_id, type} = useSelector( state => state.room );

    const handleCreateRoom = ({room_id, type}) => {
        console.log('em', room_id, type)
        dispatch(onCreate({room_id: room_id, type: type}))
    }

    return {
        // Properties
        room_id,
        type,

        // Metodos
        handleCreateRoom,
    }
}