import React from 'react';
import { Button } from 'semantic-ui-react';
import useAuth from '../../../hooks/useAuth';
import { useHistory } from 'react-router-dom';
import { useApolloClient } from '@apollo/client';
import PasswordForm from '../PasswordForm';
import EmailForm from '../EmailForm';
import DescriptionForm from '../DescriptionForm';

import './SettingsForm.scss';
import SiteWebForm from '../SiteWebForm';

export default function SettingsForm( props ) {
    const { setShowModal, setTitleModal, setChildrenModal, getUser, refetch } = props;
    const history = useHistory();
    const { logout } = useAuth();
    const client = useApolloClient();

    const onChangePassword = () => {
        setTitleModal('Cambiar la contraseña');
        setChildrenModal(<PasswordForm logout={ onLogout } />);
    }

    const onChangeEmail = () => {
        setTitleModal('Cambiar Email');
        setChildrenModal(<EmailForm setShowModal={ setShowModal } currentEmail={ getUser.email } refetch={ refetch }/>);
    }

    const onLogout = () => {
        client.clearStore();
        logout();
        history.push('/')
    }

    const onChangeDescription = () => {
        setTitleModal('Actualizar tu biografia');
        setChildrenModal(<DescriptionForm setShowModal={ setShowModal } currentDescription={ getUser.description } refetch={ refetch } />)
    }

    const onChangeSiteWeb = () => {
        setTitleModal('Actualizar Sitio Web');
        setChildrenModal(<SiteWebForm setShowModal={ setShowModal } currentSiteWeb={ getUser.siteweb } refetch={ refetch } />)
    }

    return (
        <div className="settings-form">
            <Button onClick={onChangePassword}>Cambiar Contraseña</Button>
            <Button onClick={onChangeEmail}>Cambiar Email</Button>
            <Button onClick={onChangeDescription}>Descripción</Button>
            <Button onClick={onChangeSiteWeb}>Sition Web</Button>
            <Button onClick={onLogout}>Cerrar Sesión</Button>
            <Button onClick={() => setShowModal(false)}>Cancelar</Button>
        </div>
    )
}
