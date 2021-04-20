import React, { ChangeEvent, useState } from 'react';
import styled from 'styled-components';
import { TextField, Button } from '@material-ui/core';
import Select from 'react-select';
import FriendCard from './FriendCard';

const StyledContainer = styled.div`
    margin-left: 1rem;
    margin-top:1rem;
    width: 95%;
`;

const StyledUl = styled.ul`
   height: 300px;
   overflow-y: scroll;
   padding: 0;
`;

const friends = [
    {name: 'Mathias',value: '1',label:'Mathias'},
    {name: 'bob1',value: '2',label:'bob1'},
    {name: 'bob2',value: '3',label:'bob2'},
    {name: 'bob3',value: '4',label:'bob3'},
    {name: 'bob4',value: '5',label:'bob4'},
    {name: 'bob5',value: '6',label:'bob5'},
    {name: 'bob6',value: '7',label:'bob6'},
    {name: 'bob7',value: '8',label:'bob7'},
]


const FriendList = () => {
    const [searchInput, setSearchInput] = useState<string>('');
    const [addGroupInput, setGroupInput] = useState<any>([]);

     const onSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
        setSearchInput((event.target as HTMLInputElement).value);
    };

    const onAddGroupClick = () => {
        console.log(addGroupInput);
        setGroupInput(null);
    }
    
    return (
        <StyledContainer>
            <Select
                defaultValue={[friends[2], friends[3]]}
                isMulti
                name="colors"
                options={friends}
                onChange={setGroupInput}
                noOptionsMessage={() => 'Ingen grupper med dette navnet'}
                placeholder="Legg til medlemmer"
                className="basic-multi-select"
                classNamePrefix="select"
                isSearchable
                isClearable
            />
            <Button onClick={onAddGroupClick}>Lag gruppe</Button>

            
            <TextField style={{marginTop:'5px'}} 
                onChange={onSearchChange} 
                fullWidth={true} 
                label="Søk etter grupper" 
                variant="outlined" 
            />
            <h2>Dine grupper</h2>
            <StyledUl >
                {friends.filter((friend: { name: string}) => {
                if(searchInput == ""){
                    return friend
                }else if(friend.name != null && friend.name.toLowerCase().includes(searchInput.toLocaleLowerCase())){
                    return friend
                }
                }).map((friend: { name: string; }) => <FriendCard key={friend.name} friend={friend}/>)}
            </StyledUl> 
        </StyledContainer>
    );
};

export default FriendList;