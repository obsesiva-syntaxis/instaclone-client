import React from 'react';
import { Form, Button } from 'semantic-ui-react';
import { useFormik } from 'formik';
import { useMutation } from '@apollo/client';
import { UPDATE_USER } from '../../../gql/user';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import './EmailForm.scss';

export default function EmailForm(props) {
    const { setShowModal, currentEmail, refetch } = props;
    const [ updateUser ] = useMutation(UPDATE_USER);

    const formik = useFormik({
        initialValues: { email: currentEmail || '' },
        validationSchema: Yup.object({
            email: Yup.string().required(),
        }),
        onSubmit: async values => {
            console.log(values);
            try {
                await updateUser({
                    variables: {
                        input: values
                    }
                });
                refetch();
                setShowModal(false);
                toast.success('Email actualizado satisfactoriamente!');
            } catch (err) {
                toast.error('Error al actualizar el email');
            }
        }
    });

    return (
        <Form className="email-form" onSubmit={formik.handleSubmit}>
            <Form.Input placeholder="Escribe tu nuevo email" name="email" value={formik.values.email} onChange={formik.handleChange} error={formik.errors.email && true}/>
            <Button className="btn-submit" type="submit">Actualizar</Button>
        </Form>
    )
}
