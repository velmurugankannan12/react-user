import React, { createContext, useState, useMemo } from "react";

const AppStateContext = createContext();

export const AppStateProvider = ({ children }) => {
    const [state, setState] = useState({
        refresh: false,
        activeSidebarMenu: 'users',
        addUserOne: false,
        addUserMul: false,
        viewUser: false,
        editUser: false,
        deleteUser: false,
        userSearch: '',
        userProfileData: null,
    });

    const [people, setPeople] = useState([
        { id: 1, name: 'Alex Johnson', destination: 'Front-end Developer', email: 'alex.johnson@example.com', role: 'User' },
        { id: 2, name: 'Brenda Lee', destination: 'Back-end Developer', email: 'brenda.lee@example.com', role: 'User' },
        { id: 15, name: 'Oliver King', destination: 'Technical Writer', email: 'oliver.king@example.com', role: 'Admin' }
    ]);

    const addUser = (newUser) => {
        console.log(newUser)
        setPeople(prevPeople => [...prevPeople, newUser]); // Correctly updating state
    };

    const editUserData = (userId, updatedUserData) => {
        setPeople(prevPeople => prevPeople.map(person =>
            person.id === userId ? { ...person, ...updatedUserData } : person
        ));
    };

    const updateState = (key, value) => {
        setState(prevState => ({ ...prevState, [key]: value }));
    };

    const contextValue = useMemo(() => ({
        ...state,
        people,
        updateState,
        addUser,
        editUserData
    }), [state, people]);

    return (
        <AppStateContext.Provider value={contextValue}>
            {children}
        </AppStateContext.Provider>
    );
};

export default AppStateContext;
