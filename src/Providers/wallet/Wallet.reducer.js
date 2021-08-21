import WalletTypes from "./Wallet.types";
import { debitWallet } from "./Wallet.utils";

export const WALLET_INITIAL_STATE ={
    wallet:[
        {
            "wallet_balance":0,
        }
    ]
}

const WalletReducer =(state,action)=>{
    switch(action.type){
        case WalletTypes.FUND_WALLET:
            return{
                ...state,
                wallet:[
                    ...state.wallet,
                    action.payload
                ]
            }
        case WalletTypes.DOANTE_FUND:
            return{
                ...state,
                wallet: debitWallet(action.payload,state.wallet_balance)
            }
        default:
            return state;
    }
}

export default WalletReducer;