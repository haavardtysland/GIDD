import React, { ChangeEvent, useState } from 'react';
import styled from 'styled-components';
import LoginCard from '../components/LoginCard';
import { useHistory } from 'react-router-dom';
import image from '../assets/GIDD.png';
import { UserContext } from '../components/UserContext';
import { useContext } from 'react';
import User from '../interfaces/User'



const LoginContainer = styled.div`
    width: 100%;
    height: 100vh;
    display: flex; 
    align-items: center;
    justify-content: center;
    background: #334d50; /* fallback for old browsers */
    background: -webkit-linear-gradient(
        to right,
        #cbcaa5,
        #334d50
    ); /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(
        to right,
        #cbcaa5,
        #334d50
    ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
`;

const StyledLogo = styled.img`
    border-radius:100px; 
    width:608px; 
    margin-right:70px; 
`;


const Login = () => {
    const history = useHistory();
    const [email, setEmail] = useState<string>('');
    const [userID, setUserID] = useState<string>('');
    const [name, setName] = useState<string>('');
    const [picture, setPicture] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const {user, setUser} = useContext(UserContext)
  
    
    const onLogin = async() => {
        if (!checkPassword() || email !== '') {
            const user = await login()
            setUser(user)
            history.push('/HomePage');
        } else {
            alert("Vennligst fyll ut alt")
        }
    };

    const onLoginSoMe = async() => {
        history.push('/HomePage')
    }

    const login = async () => {
        const newUser:User = {
            name:name,
            userID:userID,
            email:email,
            picture:picture,
            password:password
        }
        return {
            newUser
        }
    }
    const checkPassword = () => {
        if (email !== '' && password !== '') {
            return false;
        }
        return true;
        //TODO legge flere sjekker
    }

    const handleClickShowPassword = () => {
        if (showPassword) {
            setShowPassword(false);
        } else {
            setShowPassword(true);
        }
    }

    const onNewUser = () => {
        history.push('/newUser');
    };

    const onChangeEmail = (event: ChangeEvent<HTMLInputElement>) => {
        const currentEmail: string = (event.target as HTMLInputElement).value
        setEmail(currentEmail);
    };

    const onChangePassword = (event: ChangeEvent<HTMLInputElement>) => {
        const currentPassword: string = (event.target as HTMLInputElement).value
        setPassword(currentPassword);
    };

    const onKeyDown = (e: KeyboardEvent) => {
        if (e.code === 'Enter') {
            onLogin();
        }
    };


    const responseGoogle = (response:any) => {
        const answer = response;
        console.log(answer)
        console.log('fått svar')
        const newUser:User = {
            name:response.profileObj.name,
            userID: '',
            email:response.profileObj.email,
            picture:response.profileObj.picture,
            password:''
        }
        setUser(newUser)
        onLoginSoMe();
      }

      const responseFacebook = (response:any) => {
        console.log(response)
        const newUser:User = {
            name:response.name,
            userID: '',
            email:response.email,
            picture:response.picture,
            password:''
        }
        setUser(newUser)
        onLoginSoMe();
    }

    const componentClicked  = async() => {
        console.log('gh')
    }

    return (
        <LoginContainer>
            <StyledLogo src={image}></StyledLogo>
            <LoginCard
                onLogin={onLogin}
                onChangeEmail={onChangeEmail}
                onChangePassword={onChangePassword}
                onKeyDown={onKeyDown}
                onNewUser={onNewUser}
                handleClickShowPassword={handleClickShowPassword}
                showPassword={showPassword}
                responseGoogle={responseGoogle}
                responseFacebook={responseFacebook}
                componentClicked={componentClicked}
            ></LoginCard>
        </LoginContainer>
    );
};

export default Login;
