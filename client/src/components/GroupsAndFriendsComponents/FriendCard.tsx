import {
    Card,
    CardMedia,
    CardContent,
    Typography,
    Grid,
    Avatar,
    Tooltip,
    Chip,
} from '@material-ui/core';
import React, { useState } from 'react';
import styled from 'styled-components';
import logo from '../../assets/logo.png';
import User from '../../interfaces/User';
import Popup from '../Popup';
import UserProfile from './UserProfile';

const CardInformation = styled.div`
    height: 100%;
    cursor: pointer;

    :hover {
        background-color: #ebebeb;
    }
`;
const TitleArea = styled.div`
    flex: 1;
    padding: 15px;
    color: white;
    background-color: #f44336;
`;

interface Props {
    friend: User;
    updateFriends: () => void;
}


const FriendCard = ({ friend, updateFriends }: Props) => {
    const [openPopup, setOpenPopup] = useState<boolean>(false);

    const onCardClick = () => {
        setOpenPopup(!openPopup)
    }
    return (
        <div>
            <Card
                style={{ minWidth: '100px', maxWidth: '100%', margin: '5px' }}
                onClick={onCardClick}
            >

                <CardInformation>
                    <Grid container spacing={2}>
                        <Grid item xs={3}>
                            <Avatar src={friend.image}></Avatar>
                        </Grid>
                        <Grid item >
                            <Typography
                                gutterBottom
                                variant="subtitle2"
                                component="h3"
                            >
                                {friend.firstName + ' ' + friend.surname}
                            </Typography>
                        </Grid>
                    </Grid>
                </CardInformation>
            </Card>
            <Popup
                title={friend.firstName + ' ' + friend.surname}
                openPopup={openPopup}
                setOpenPopup={setOpenPopup}
            >
                <UserProfile
                    updateFriends={updateFriends}
                    openPopup={openPopup}
                    setOpenPopup={setOpenPopup}
                    friend={friend}
                />
            </Popup>
        </div>
    );
};

export default FriendCard;