import { createContext, useState, useCallback } from 'react';

const PaymentContext = createContext();

const PaymentProvider = ({ children }) => {
    const [paymentData, setPaymentData] = useState(null);

    const updatePaymentData = useCallback((data) => {
        setPaymentData(data);
    }, []);

    return (
        <PaymentContext.Provider value={{ paymentData, updatePaymentData }}>
            {children}
        </PaymentContext.Provider>
    );
};

export { PaymentContext, PaymentProvider };