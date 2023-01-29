import React from 'react';
import { Form, TextArea, Button } from 'semantic-ui-react';
import { toast } from 'react-toastify';
import { useFormik } from 'formik';
import { useMutation } from '@apollo/client';
import { UPDATE_USER } from '../../../gql/user';
import * as Yup from 'yup';
import './DescriptionForm.scss';


export default function DescriptionForm( props ) {
    const { setShowModal, currentDescription, refetch } = props;
    const [ updateUser ] = useMutation(UPDATE_USER);
    const formik = useFormik({
        initialValues: { description: currentDescription || '' },
        validationSchema: Yup.object({
            description: Yup.string().required(),
        }),
        onSubmit: async values => {
            try {
                await updateUser({
                    variables: {
                        input: values
                    }
                });
                refetch();
                setShowModal(false);
                toast.success('Biografía actualizada satisfactoriamente!');
            } catch (err) {
                console.log(err);
                toast.error('Error al actualizar tu biografía');
            }
        }
    });

    return (
        <Form className="description-form" onSubmit={ formik.handleSubmit }>
            <TextArea 
                name="description"
                value={ formik.values.description }
                onChange={ formik.handleChange }
                className={ formik.errors.description && "error" }
            />
            <Button type="submit" className="btn-submit">Actualizar</Button>
        </Form>
    )
}
