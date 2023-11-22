import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import * as userService from '../../services/userService'


    export default function Logout() {
        const navigate = useNavigate();
        const {logoutHandler} = useContext(AuthContext)

        useEffect(() => {
            userService.logout()
                .then(() => {
                    logoutHandler();
                    navigate('/')
                })
                .catch((err) => console.log(err))
        })
    }