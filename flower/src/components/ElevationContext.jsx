import { createContext, useContext, useState } from 'react';

const ElevationContext = createContext(null);

export const useElevation = () => useContext(ElevationContext);

export const ElevationProvider = ({ children }) => {
    const [elevation, setElevation] = useState(5);  

    return (
        <ElevationContext.Provider value={{ elevation, setElevation }}>
            {children}
        </ElevationContext.Provider>
    );
};
// selin's notes: i connected blobs, caps and stipes height to the same variable, elevation change can be mapped between 3 - 9