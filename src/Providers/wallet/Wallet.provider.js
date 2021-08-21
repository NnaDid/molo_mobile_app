import React, {createContext , useReducer } from "react";
import WalletReducer, { WALLET_INITIAL_STATE } from './Wallet.reducer';
import WalletTypes from "./Wallet.types";

export const WalletContext = createContext({
    ...WALLET_INITIAL_STATE
});

const WalletProvider = ({ children })=>{
    const [store,dispatch]  = useReducer(WalletReducer,WALLET_INITIAL_STATE);
    const WALLET = store;

    const fundWallet = wallet =>{
        dispatch({
            type: WalletTypes.FUND_WALLET,
            payload:wallet,
        });
    }

    const donateFund = fund =>{
        dispatch({
            type:WalletTypes.DOANTE_FUND,
            payload:fund
        });
    }

    return(
        <WalletContext.Provider value={{ WALLET, fundWallet, donateFund }}>
            {children}
        </WalletContext.Provider>
    )
};

export default WalletProvider;

