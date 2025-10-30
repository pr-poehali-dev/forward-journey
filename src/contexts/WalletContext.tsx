import { createContext, useContext, useState, ReactNode } from 'react';

interface Transaction {
  id: string;
  type: 'deposit' | 'purchase' | 'refund';
  amount: number;
  description: string;
  date: Date;
}

interface WalletContextType {
  balance: number;
  transactions: Transaction[];
  addFunds: (amount: number) => void;
  deductFunds: (amount: number, description: string) => boolean;
  addTransaction: (transaction: Omit<Transaction, 'id' | 'date'>) => void;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export const WalletProvider = ({ children }: { children: ReactNode }) => {
  const [balance, setBalance] = useState<number>(50000);
  const [transactions, setTransactions] = useState<Transaction[]>([
    {
      id: '1',
      type: 'deposit',
      amount: 50000,
      description: 'Начальный баланс',
      date: new Date()
    }
  ]);

  const addFunds = (amount: number) => {
    setBalance(prev => prev + amount);
    addTransaction({
      type: 'deposit',
      amount,
      description: `Пополнение счёта`
    });
  };

  const deductFunds = (amount: number, description: string): boolean => {
    if (balance < amount) {
      return false;
    }
    
    setBalance(prev => prev - amount);
    addTransaction({
      type: 'purchase',
      amount: -amount,
      description
    });
    
    return true;
  };

  const addTransaction = (transaction: Omit<Transaction, 'id' | 'date'>) => {
    const newTransaction: Transaction = {
      ...transaction,
      id: Date.now().toString(),
      date: new Date()
    };
    
    setTransactions(prev => [newTransaction, ...prev]);
  };

  return (
    <WalletContext.Provider
      value={{
        balance,
        transactions,
        addFunds,
        deductFunds,
        addTransaction
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = () => {
  const context = useContext(WalletContext);
  if (context === undefined) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  return context;
};
