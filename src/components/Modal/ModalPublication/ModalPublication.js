import React from 'react';
import { Grid, Modal } from 'semantic-ui-react'
import CommentForm from './CommentForm'
import Comments from './Comments';
import Actions from './Actions';

import './ModalPublication.scss';

export default function ModalPublication( props ) {
    const { showModal, setShowModal, publication } = props;
    
    const onClose = () => setShowModal(false);

    return (
        <Modal open={showModal} onClose={ onClose } className="modal-publication">
            <Grid>
                <Grid.Column className="modal-publication__left" width={10} style={{ backgroundImage: `url('${ publication.file }')`}} />
                <Grid.Column className="modal-publication__right" width={6}>
                    <Comments publication={ publication } />
                    <Actions publication={ publication } />
                    <CommentForm publication={ publication }/>
                </Grid.Column>
            </Grid>
        </Modal>
    )
}
