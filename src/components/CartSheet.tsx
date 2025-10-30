import { useCart } from '@/contexts/CartContext';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger, SheetFooter } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import Icon from '@/components/ui/icon';
import { ScrollArea } from '@/components/ui/scroll-area';

export const CartSheet = () => {
  const { items, removeFromCart, updateQuantity, totalItems, totalPrice, clearCart } = useCart();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Icon name="ShoppingCart" size={24} />
          {totalItems > 0 && (
            <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs bg-accent">
              {totalItems}
            </Badge>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-lg">
        <SheetHeader>
          <SheetTitle className="text-2xl">Корзина</SheetTitle>
          <SheetDescription>
            {totalItems === 0 ? 'Ваша корзина пуста' : `Товаров в корзине: ${totalItems}`}
          </SheetDescription>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-[60vh] text-center">
            <Icon name="ShoppingBag" size={80} className="text-muted-foreground mb-4 opacity-50" />
            <p className="text-lg text-muted-foreground">Добавьте товары в корзину</p>
          </div>
        ) : (
          <>
            <ScrollArea className="h-[calc(100vh-280px)] mt-6">
              <div className="space-y-4">
                {items.map((item) => {
                  const itemPrice = item.discount
                    ? Math.round(item.price * (1 - item.discount / 100))
                    : item.price;

                  return (
                    <div key={item.id} className="flex gap-4 p-4 bg-muted/30 rounded-lg animate-fade-in">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-20 h-20 object-cover rounded-md"
                      />
                      <div className="flex-1">
                        <h4 className="font-semibold text-sm mb-1">{item.name}</h4>
                        <p className="text-sm text-muted-foreground mb-2">
                          {itemPrice.toLocaleString('ru-RU')} ₽
                        </p>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-7 w-7"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          >
                            <Icon name="Minus" size={14} />
                          </Button>
                          <span className="w-8 text-center font-medium">{item.quantity}</span>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-7 w-7"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          >
                            <Icon name="Plus" size={14} />
                          </Button>
                        </div>
                      </div>
                      <div className="flex flex-col items-end justify-between">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-destructive hover:text-destructive"
                          onClick={() => removeFromCart(item.id)}
                        >
                          <Icon name="Trash2" size={16} />
                        </Button>
                        <p className="font-bold text-primary">
                          {(itemPrice * item.quantity).toLocaleString('ru-RU')} ₽
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </ScrollArea>

            <div className="mt-6 space-y-4">
              <Separator />
              <div className="flex justify-between items-center text-lg">
                <span className="font-semibold">Итого:</span>
                <span className="text-2xl font-bold text-primary">
                  {totalPrice.toLocaleString('ru-RU')} ₽
                </span>
              </div>
              <SheetFooter className="flex-col sm:flex-col gap-2">
                <Button 
                  className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity h-12 text-lg"
                  size="lg"
                >
                  <Icon name="CreditCard" size={20} className="mr-2" />
                  Оформить заказ
                </Button>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={clearCart}
                >
                  <Icon name="Trash2" size={18} className="mr-2" />
                  Очистить корзину
                </Button>
              </SheetFooter>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
};
