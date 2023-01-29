import React from 'react';
import { Form, Button } from 'semantic-ui-react';
import { toast } from 'react-toastify';
import { useFormik } from 'formik';
import { useMutation } from '@apollo/client';
import { UPDATE_USER } from '../../../gql/user';
import * as Yup from 'yup';
import './SiteWebForm.scss';

export default function SiteWebForm( props ) {
    const { setShowModal, currentSiteWeb, refetch } = props;
    const [ updateUser ] = useMutation(UPDATE_USER);
    const formik = useFormik({
        initialValues: { siteWeb: currentSiteWeb || '' },
        validationSchema: Yup.object({
            siteWeb: Yup.string().required(),
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
                toast.success('Sitio Web actualizado satisfactoriamente!');
            } catch (err) {
                console.log(err);
                toast.error('Error al actualizar Sitio Web');
            }
        }
    })
    return (
        <Form className="site-web-form" onSubmit={ formik.handleSubmit }>
            <Form.Input placeholder="URL Web" name="siteWeb" value={ formik.values.siteWeb } onChange={ formik.handleChange } error={ formik.errors.siteWeb || true } />
            <Button type="submit" className="btn-submit">Actualizar</Button>
        </Form>
    )
}
