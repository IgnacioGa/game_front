import { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { LoginPage } from "../auth";
import { useAuthStore } from "../hooks";
import { GameRoomPage, IndexPage } from "../rooms";
import { RoomPage } from "../rooms/pages/RoomPage";
import { statusOptions } from "../store";


export const AppRouter = () => {

    const {status, checkAuthToken} = useAuthStore();

    useEffect(() => {
        checkAuthToken();
      }, [])
    
    if(status === statusOptions.checking){
        return (
            <h3>Loading ...</h3>
        )
    }

    return (
    <Routes>
        {
            
            (status === statusOptions.notAuthenticated)
            ? (
                <>
                    <Route path="/auth/*" element={<LoginPage />} />
                    <Route path="/*" element={<Navigate to="/auth/login" />} />
                </>
              )
            : (
                <>
                    <Route path="/" element={<IndexPage />} />
                    <Route path="/:roomId" element={<RoomPage />} />
                    <Route path="/:roomId/room" element={<GameRoomPage />} />
                    <Route path="/*" element={<Navigate to="/" />} />
                </>
            )
        }
    </Routes>
    )
}