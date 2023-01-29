import React from 'react';
import { Button, Form } from 'semantic-ui-react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useMutation } from '@apollo/client';
import { UPDATE_USER } from '../../../gql/user';
import { toast } from 'react-toastify';
import './PasswordForm.scss';

export default function PasswordForm(props) {
    const { logout } = props;
    const [ updateUser ] = useMutation(UPDATE_USER);

    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema: Yup.object({
            currentPassword: Yup.string().required(),
            newPassword: Yup.string().required().oneOf([Yup.ref('repeatNewPassword')]),
            repeatNewPassword: Yup.string().required().oneOf([Yup.ref('newPassword')]),
        }),
        onSubmit: async values => {
            try {
                const result = await updateUser({
                    variables: {
                        input: {
                            currentPassword: values.currentPassword,
                            newPassword: values.newPassword,
                        }
                    }
                });
                if (!result.data.updateUser) {
                    toast.error('Error al cambiar la contraseña');
                } else {
                    logout();
                    toast.success('Contraseña actualizada!');
                }
            } catch (err) {
                toast.error('Error al cambiar la contraseña');
            }
        }
    });

    return (
        <Form className="password-form" onSubmit={formik.handleSubmit}>
            <Form.Input
                type="password"
                placeholder="Contraseña actual"
                name="currentPassword"
                value={formik.values.currentPassword}
                onChange={formik.handleChange}
                error={formik.errors.currentPassword && true}
            />
            <Form.Input
                type="password"
                placeholder="Nueva Contraseña"
                name="newPassword"
                value={formik.values.newPassword}
                onChange={formik.handleChange}
                error={formik.errors.newPassword && true}
            />
            <Form.Input
                type="password"
                placeholder="Confirmar nueva Contraseña"
                name="repeatNewPassword"
                value={formik.values.repeatNewPassword}
                onChange={formik.handleChange}
                error={formik.errors.repeatNewPassword && true}
            />
            <Button type="submit" className="btn-submit">Actualizar</Button>
        </Form>
    )
}

function initialValues() {
    return {
        currentPassword: '',
        newPassword: '',
        repeatNewPassword: '',
    }
}