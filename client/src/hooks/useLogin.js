import { login } from '../API/login';
import { useMutation } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import { setUser,  } from '../store/slices/userSlice';
import { useNavigate } from 'react-router-dom';

export const useLogin = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const mutation = useMutation({
        mutationFn: ({ email, password }) => login({ email, password }),
        onSuccess: (data) => {
            console.log('Login successful:', data);
            navigate('/')
            const user = data;
            dispatch(setUser(user));
        },
        onError: (error) => {
            console.error('Login failed:', error);
        },
    });

    return mutation;
};
