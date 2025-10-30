import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import Icon from '@/components/ui/icon';
import { useCart } from '@/contexts/CartContext';
import { useUser } from '@/contexts/UserContext';
import { CartSheet } from '@/components/CartSheet';
import { AuthDialog } from '@/components/AuthDialog';
import { UserMenu } from '@/components/UserMenu';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  discount?: number;
}

const products: Product[] = [
  {
    id: 1,
    name: 'Беспроводные наушники Premium',
    description: 'Профессиональные наушники с активным шумоподавлением и до 30 часов автономной работы',
    price: 12990,
    category: 'Аудио',
    image: 'https://cdn.poehali.dev/projects/c030e66d-db8d-4123-9df6-c0c64f26c52f/files/aa50d1cd-525b-434f-85d7-4b5d07becbb4.jpg',
    discount: 20
  },
  {
    id: 2,
    name: 'Умные часы Elite',
    description: 'Стильные смарт-часы с мониторингом здоровья и водонепроницаемым корпусом',
    price: 8990,
    category: 'Гаджеты',
    image: 'https://cdn.poehali.dev/projects/c030e66d-db8d-4123-9df6-c0c64f26c52f/files/af841d8d-eb05-4161-be39-5d92c4326b67.jpg'
  },
  {
    id: 3,
    name: 'Портативная колонка Wave',
    description: 'Компактная беспроводная колонка с мощным звуком и защитой от воды',
    price: 4990,
    category: 'Аудио',
    image: 'https://cdn.poehali.dev/projects/c030e66d-db8d-4123-9df6-c0c64f26c52f/files/06636d8c-14a6-4fe3-bd19-bae1734e84b8.jpg',
    discount: 15
  },
  {
    id: 4,
    name: 'Механическая клавиатура RGB',
    description: 'Игровая клавиатура с настраиваемой RGB подсветкой и переключателями Cherry MX',
    price: 7490,
    category: 'Периферия',
    image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800'
  },
  {
    id: 5,
    name: 'Игровая мышь Pro',
    description: 'Эргономичная мышь с точным сенсором 16000 DPI и программируемыми кнопками',
    price: 3990,
    category: 'Периферия',
    image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=800'
  },
  {
    id: 6,
    name: 'USB-C хаб 7-в-1',
    description: 'Многофункциональный адаптер с HDMI, USB 3.0 и картридером для MacBook',
    price: 2990,
    category: 'Аксессуары',
    image: 'https://images.unsplash.com/photo-1625948515291-69613efd103f?w=800'
  }
];

const Index = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [addingToCart, setAddingToCart] = useState<number | null>(null);
  const { addToCart } = useCart();
  const { user, login, isAuthenticated } = useUser();
  const { toast } = useToast();

  const handleAddToCart = (product: Product) => {
    setAddingToCart(product.id);
    
    setTimeout(() => {
      addToCart(product);
      toast({
        title: 'Товар добавлен в корзину',
        description: product.name,
      });
      setAddingToCart(null);
    }, 300);
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50">
      <header className="bg-white/80 backdrop-blur-md border-b border-purple-100 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              TechShop
            </h1>
            <div className="flex gap-2">
              <Button variant="ghost" size="icon">
                <Icon name="Heart" size={24} />
              </Button>
              <CartSheet />
              {isAuthenticated ? (
                <UserMenu />
              ) : (
                <AuthDialog onLogin={login} />
              )}
            </div>
          </div>
        </div>
      </header>

      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            Технологии будущего
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Откройте для себя премиальные гаджеты и аксессуары с доставкой по всей России
          </p>
        </div>

        <div className="max-w-2xl mx-auto mb-12 animate-scale-in">
          <div className="relative">
            <Icon name="Search" size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Поиск по товарам, описанию, категории..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 h-14 text-lg border-2 border-purple-200 focus:border-primary transition-colors"
            />
          </div>
          {searchQuery && (
            <p className="mt-2 text-sm text-muted-foreground">
              Найдено товаров: <span className="font-semibold text-primary">{filteredProducts.length}</span>
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product, index) => (
            <Card 
              key={product.id} 
              className="overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 border-2 border-purple-100 animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="relative overflow-hidden group">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
                />
                {product.discount && (
                  <Badge className="absolute top-4 right-4 bg-accent text-accent-foreground text-lg px-3 py-1">
                    -{product.discount}%
                  </Badge>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle className="text-xl">{product.name}</CardTitle>
                  <Badge variant="outline" className="text-xs">
                    {product.category}
                  </Badge>
                </div>
                <CardDescription className="line-clamp-2">{product.description}</CardDescription>
              </CardHeader>
              
              <CardFooter className="flex justify-between items-center pt-0">
                <div className="flex flex-col">
                  {product.discount ? (
                    <>
                      <span className="text-sm text-muted-foreground line-through">
                        {product.price.toLocaleString('ru-RU')} ₽
                      </span>
                      <span className="text-2xl font-bold text-primary">
                        {Math.round(product.price * (1 - product.discount / 100)).toLocaleString('ru-RU')} ₽
                      </span>
                    </>
                  ) : (
                    <span className="text-2xl font-bold text-primary">
                      {product.price.toLocaleString('ru-RU')} ₽
                    </span>
                  )}
                </div>
                <Button 
                  className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-all"
                  onClick={() => handleAddToCart(product)}
                  disabled={addingToCart === product.id}
                >
                  {addingToCart === product.id ? (
                    <>
                      <Icon name="Loader2" size={18} className="mr-2 animate-spin" />
                      Добавляю...
                    </>
                  ) : (
                    <>
                      <Icon name="ShoppingCart" size={18} className="mr-2" />
                      Купить
                    </>
                  )}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-16 animate-fade-in">
            <Icon name="SearchX" size={64} className="mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-2xl font-semibold mb-2">Товары не найдены</h3>
            <p className="text-muted-foreground">Попробуйте изменить поисковый запрос</p>
          </div>
        )}
      </section>

      <section className="container mx-auto px-4 py-16 bg-white/50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              Официальный партнёр Wildberries
            </h2>
            <p className="text-lg text-muted-foreground">
              Надёжное сотрудничество с крупнейшим маркетплейсом России
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="border-2 border-purple-100 hover:shadow-xl transition-all duration-300 animate-fade-in">
              <CardHeader>
                <div className="w-14 h-14 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center mb-4">
                  <Icon name="Package" size={28} className="text-white" />
                </div>
                <CardTitle>Широкий ассортимент</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Все наши товары доступны на площадке Wildberries с быстрой доставкой по всей России
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 border-purple-100 hover:shadow-xl transition-all duration-300 animate-fade-in" style={{ animationDelay: '0.1s' }}>
              <CardHeader>
                <div className="w-14 h-14 bg-gradient-to-br from-secondary to-accent rounded-full flex items-center justify-center mb-4">
                  <Icon name="ShieldCheck" size={28} className="text-white" />
                </div>
                <CardTitle>Гарантия качества</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Официальная гарантия на всю продукцию и проверка подлинности от Wildberries
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 border-purple-100 hover:shadow-xl transition-all duration-300 animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <CardHeader>
                <div className="w-14 h-14 bg-gradient-to-br from-accent to-primary rounded-full flex items-center justify-center mb-4">
                  <Icon name="Truck" size={28} className="text-white" />
                </div>
                <CardTitle>Быстрая доставка</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Доставка через пункты выдачи Wildberries по всей стране в течение 1-3 дней
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="mt-12 text-center">
            <Button size="lg" className="bg-gradient-to-r from-primary via-secondary to-accent hover:opacity-90 transition-opacity text-lg px-8 py-6">
              <Icon name="ExternalLink" size={20} className="mr-2" />
              Перейти в наш магазин на Wildberries
            </Button>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            Отзывы наших покупателей
          </h2>
          <div className="flex items-center justify-center gap-2 text-lg">
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <Icon key={star} name="Star" size={24} className="fill-amber-400 text-amber-400" />
              ))}
            </div>
            <span className="font-semibold text-2xl">4.9</span>
            <span className="text-muted-foreground">из 5 на основе 2,847 отзывов</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          <Card className="border-2 border-purple-100 hover:shadow-xl transition-all duration-300 animate-fade-in">
            <CardHeader>
              <div className="flex items-start justify-between mb-2">
                <div>
                  <CardTitle className="text-lg">Анна Смирнова</CardTitle>
                  <p className="text-sm text-muted-foreground">2 дня назад</p>
                </div>
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Icon key={star} name="Star" size={16} className="fill-amber-400 text-amber-400" />
                  ))}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Купила беспроводные наушники Premium - просто восторг! Звук чистый, шумоподавление работает отлично. Заказывала через Wildberries, пришло за 2 дня. Очень довольна покупкой!
              </p>
              <Badge variant="outline" className="mt-4">
                Беспроводные наушники Premium
              </Badge>
            </CardContent>
          </Card>

          <Card className="border-2 border-purple-100 hover:shadow-xl transition-all duration-300 animate-fade-in" style={{ animationDelay: '0.1s' }}>
            <CardHeader>
              <div className="flex items-start justify-between mb-2">
                <div>
                  <CardTitle className="text-lg">Дмитрий Козлов</CardTitle>
                  <p className="text-sm text-muted-foreground">5 дней назад</p>
                </div>
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Icon key={star} name="Star" size={16} className="fill-amber-400 text-amber-400" />
                  ))}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Умные часы Elite превзошли все ожидания! Стильный дизайн, много функций для спорта и здоровья. Батарея держит 5 дней. Магазин надёжный, рекомендую!
              </p>
              <Badge variant="outline" className="mt-4">
                Умные часы Elite
              </Badge>
            </CardContent>
          </Card>

          <Card className="border-2 border-purple-100 hover:shadow-xl transition-all duration-300 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <CardHeader>
              <div className="flex items-start justify-between mb-2">
                <div>
                  <CardTitle className="text-lg">Екатерина Волкова</CardTitle>
                  <p className="text-sm text-muted-foreground">1 неделю назад</p>
                </div>
                <div className="flex">
                  {[1, 2, 3, 4].map((star) => (
                    <Icon key={star} name="Star" size={16} className="fill-amber-400 text-amber-400" />
                  ))}
                  <Icon name="Star" size={16} className="text-amber-400" />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Портативная колонка Wave - отличный выбор для пикников! Звук мощный, басы хорошие. Водонепроницаемая, проверено на практике. Единственный минус - хотелось бы больше цветов.
              </p>
              <Badge variant="outline" className="mt-4">
                Портативная колонка Wave
              </Badge>
            </CardContent>
          </Card>
        </div>

        <div className="mt-12 text-center animate-fade-in" style={{ animationDelay: '0.3s' }}>
          <Button variant="outline" size="lg" className="border-2 border-primary text-primary hover:bg-primary hover:text-white transition-all">
            <Icon name="MessageCircle" size={20} className="mr-2" />
            Читать все отзывы
          </Button>
        </div>
      </section>

      <footer className="bg-gradient-to-r from-primary via-secondary to-accent text-white py-12 mt-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-2xl font-bold mb-4">TechShop</h3>
              <p className="opacity-90">Ваш надёжный партнёр в мире технологий</p>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Контакты</h4>
              <div className="space-y-2 opacity-90">
                <p className="flex items-center gap-2">
                  <Icon name="Phone" size={16} />
                  +7 (800) 123-45-67
                </p>
                <p className="flex items-center gap-2">
                  <Icon name="Mail" size={16} />
                  info@techshop.ru
                </p>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Социальные сети</h4>
              <div className="flex gap-3">
                <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
                  <Icon name="Instagram" size={20} />
                </Button>
                <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
                  <Icon name="Twitter" size={20} />
                </Button>
                <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
                  <Icon name="Youtube" size={20} />
                </Button>
              </div>
            </div>
          </div>
          <div className="text-center mt-8 pt-8 border-t border-white/20 opacity-75">
            <p>© 2024 TechShop. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;