import React, { useState } from 'react';
import { Form, Button } from 'semantic-ui-react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useMutation } from '@apollo/client';
import { LOGIN } from '../../../gql/user';
import { setToken, decodeToken } from '../../../utils/token';
import useAuth from '../../../hooks/useAuth';


import './LoginForm.scss';

export default function LoginForm() {

    const [error, setError] = useState('');
    const [login] = useMutation(LOGIN);
    const { setUser } = useAuth();

    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema: Yup.object({
            email: Yup.string().email().required(),
            password: Yup.string().required(),
        }),
        onSubmit: async formData => {
            setError('');
            try {
                const { data } = await login({
                    variables: {
                        input: formData
                    }
                });
                const { token } = data.login;
                setToken(token);
                setUser(decodeToken(token));
            } catch (err) {
                setError(err.message);            
            }
        }
    });
    return (
        <Form className="login-form" onSubmit={formik.handleSubmit}>
            <h2>Entra para ver fotos y videos de tus amigos.</h2>
            <Form.Input  type="text" placeholder="Correo electrónico" name="email" onChange={formik.handleChange} values={formik.values.email} error={formik.errors.email && true}/>
            <Form.Input  type="password" placeholder="Contraseña" name="password" onChange={formik.handleChange} values={formik.values.password} error={formik.errors.password && true}/>
            <Button type="submit" className="btn-submit">
                Iniciar sesión
            </Button>
            {
                error && <p className="login-alert">{error}</p>
            }
        </Form>
    )
}


function initialValues(){
    return {
        email: '',
        password: '',
    }
}