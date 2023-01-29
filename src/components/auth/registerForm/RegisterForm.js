import React from 'react';
import { Form, Button } from 'semantic-ui-react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useMutation } from '@apollo/client';
import { REGISTER } from '../../../gql/user';
import { toast } from 'react-toastify';

import './RegisterForm.scss';

export default function RegisterForm(props) {
    const { setShowLogin } = props;

    const [ register ] = useMutation(REGISTER);

    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema: Yup.object({
            name: Yup.string().required(true),
            username: Yup.string().matches(/^[a-zA-Z0-9-]*$/).required(true),
            email: Yup.string().email().required(true),
            password: Yup.string().required(true).oneOf([ Yup.ref('repeatPassword') ]),
            repeatPassword: Yup.string().required(true).oneOf([ Yup.ref('password') ]),
        }),
        onSubmit: async values => {
            try {
                const newUser = values;
                delete newUser.repeatPassword;

                await register({
                    variables: {
                        input: newUser
                    }
                });
                toast.success('Usuario registrado correctamente');
                setShowLogin(true);
            } catch (err) {
                toast.error(err.message);
                console.log(err);
            }
        },
    });

    return (
        <>
            <h2 className="register-form-title">Registrate para ver fotos y videos de tus amigos.</h2>
            <Form className="register-form" onSubmit={formik.handleSubmit}>
                <Form.Input type="text" placeholder="Nombre y apellidos" name="name" onChange={formik.handleChange} value={formik.values.name} error={formik.errors.name && true}/>
                <Form.Input type="text" placeholder="Nombre de usuario" name="username" onChange={formik.handleChange} value={formik.values.username} error={formik.errors.username && true}/>
                <Form.Input type="text" placeholder="Correo electrónico" name="email" onChange={formik.handleChange} value={formik.values.email} error={formik.errors.email && true}/>
                <Form.Input type="password" placeholder="Contraseña" name="password" onChange={formik.handleChange} value={formik.values.password} error={formik.errors.password && true}/>
                <Form.Input type="password" placeholder="Repetir Contraseña" name="repeatPassword" onChange={formik.handleChange} value={formik.values.repeatPassword} error={formik.errors.repeatPassword && true}/>

                <Button type="submit" className="btn-submit"> Registrar </Button>
                {/* <button type="button" onClick={formik.handleReset}>Reiniciar formulario</button> */}
            </Form>
        </>
    )
}

function initialValues() {
    return {
        name: '',
        username: '',
        email: '',
        password: '',
        repeatPassword: '',
    }
}
