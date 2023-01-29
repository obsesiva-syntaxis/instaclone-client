import React from 'react';
import { Container, Grid, Image } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import Logo from '../../assets/instaclone.png';
import RightHeader from './RightHeader';
import Search from './Search';
import './Header.scss';

export default function Header() {
    return (
        <div className="header">
            <Container>
                <Grid>
                    <Grid.Column width={3} className="header__logo">
                        <Link to="/">
                            <Image src={Logo} alt="instaclone" />
                        </Link>
                    </Grid.Column>
                    <Grid.Column width={10} className="header__logo">
                        <Search />
                    </Grid.Column>
                    <Grid.Column width={3} className="header__logo">
                        <RightHeader />
                    </Grid.Column>
                </Grid>
            </Container>
        </div>
    )
}
