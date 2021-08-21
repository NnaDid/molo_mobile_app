
export const debitWallet = (amountToDebit,prevWalletBalance)=>{
    if (prevWalletBalance<0 || amountToDebit>prevWalletBalance) return;

    return newBalance = prevWalletBalance - amountToDebit
}