import { useState } from 'react';
import { useWallet } from '@/contexts/WalletContext';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import Icon from '@/components/ui/icon';

export const WalletDialog = () => {
  const { balance, transactions, addFunds } = useWallet();
  const { toast } = useToast();
  const [amount, setAmount] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const quickAmounts = [1000, 5000, 10000, 50000];

  const handleAddFunds = (value: number) => {
    if (value <= 0) {
      toast({
        title: 'Ошибка',
        description: 'Введите корректную сумму',
        variant: 'destructive'
      });
      return;
    }

    addFunds(value);
    toast({
      title: 'Баланс пополнен',
      description: `+${value.toLocaleString('ru-RU')} ₽`,
    });
    setAmount('');
  };

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case 'deposit':
        return 'ArrowDownToLine';
      case 'purchase':
        return 'ShoppingBag';
      case 'refund':
        return 'ArrowUpFromLine';
      default:
        return 'CircleDollarSign';
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="gap-2 border-2 border-primary/20 hover:border-primary/40">
          <Icon name="Wallet" size={20} />
          <span className="font-semibold">{balance.toLocaleString('ru-RU')} ₽</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-2xl flex items-center gap-2">
            <Icon name="Wallet" size={28} className="text-primary" />
            Мой кошелёк
          </DialogTitle>
          <DialogDescription>
            Управляйте балансом и просматривайте историю транзакций
          </DialogDescription>
        </DialogHeader>

        <div className="bg-gradient-to-r from-primary to-secondary p-6 rounded-xl text-white my-4">
          <p className="text-sm opacity-90 mb-1">Доступный баланс</p>
          <p className="text-4xl font-bold">{balance.toLocaleString('ru-RU')} ₽</p>
        </div>

        <div className="space-y-4">
          <div>
            <Label htmlFor="amount">Сумма пополнения</Label>
            <div className="flex gap-2 mt-2">
              <Input
                id="amount"
                type="number"
                placeholder="Введите сумму"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="flex-1"
              />
              <Button 
                onClick={() => handleAddFunds(Number(amount))}
                disabled={!amount || Number(amount) <= 0}
              >
                <Icon name="Plus" size={18} className="mr-1" />
                Пополнить
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-4 gap-2">
            {quickAmounts.map((quickAmount) => (
              <Button
                key={quickAmount}
                variant="outline"
                size="sm"
                onClick={() => handleAddFunds(quickAmount)}
                className="text-xs"
              >
                +{(quickAmount / 1000).toFixed(0)}k
              </Button>
            ))}
          </div>

          <Separator />

          <div>
            <h4 className="font-semibold mb-3 flex items-center gap-2">
              <Icon name="History" size={18} />
              История операций
            </h4>
            <ScrollArea className="h-[200px]">
              <div className="space-y-2">
                {transactions.length === 0 ? (
                  <p className="text-center text-muted-foreground py-4">
                    Нет транзакций
                  </p>
                ) : (
                  transactions.map((transaction) => (
                    <div
                      key={transaction.id}
                      className="flex items-center justify-between p-3 bg-muted/30 rounded-lg"
                    >
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-full ${
                          transaction.type === 'deposit' 
                            ? 'bg-green-100' 
                            : transaction.type === 'purchase'
                            ? 'bg-red-100'
                            : 'bg-blue-100'
                        }`}>
                          <Icon 
                            name={getTransactionIcon(transaction.type)} 
                            size={16}
                            className={
                              transaction.type === 'deposit' 
                                ? 'text-green-600' 
                                : transaction.type === 'purchase'
                                ? 'text-red-600'
                                : 'text-blue-600'
                            }
                          />
                        </div>
                        <div>
                          <p className="text-sm font-medium">{transaction.description}</p>
                          <p className="text-xs text-muted-foreground">
                            {new Date(transaction.date).toLocaleString('ru-RU', {
                              day: '2-digit',
                              month: '2-digit',
                              year: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </p>
                        </div>
                      </div>
                      <Badge
                        variant={transaction.amount > 0 ? 'default' : 'secondary'}
                        className={transaction.amount > 0 ? 'bg-green-500' : ''}
                      >
                        {transaction.amount > 0 ? '+' : ''}
                        {transaction.amount.toLocaleString('ru-RU')} ₽
                      </Badge>
                    </div>
                  ))
                )}
              </div>
            </ScrollArea>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
