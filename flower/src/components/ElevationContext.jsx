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
