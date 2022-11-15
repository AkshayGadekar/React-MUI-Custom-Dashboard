import React, {useState, useEffect} from 'react';
import apiEndPoints from "../../apiEndPoints";
import {useNavigate} from "react-router-dom";
import withAxios from '../../HOC/withAxios';
import type {FetchUserProps} from '../../types/components';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { loggedIn, gotUser } from '../../store/slices/userSlice';
import DesktopLoader from './DesktopLoader';

const FetchUser = (props: FetchUserProps) => {
    const [isLoading, setIsLoading] = useState(true);
    const dispatch = useAppDispatch();

    useEffect(() => {
        
        props.authAxios({...apiEndPoints.auth.getUserDetails})
        .then(res => {
            const successResponse = res.data;
            
            dispatch(loggedIn(true));
            dispatch(gotUser(successResponse));
        })
        .catch(error => {
            dispatch(loggedIn(false));
        })
        
    }, [])
    

    return <DesktopLoader />;
}

export default withAxios<FetchUserProps>(FetchUser)