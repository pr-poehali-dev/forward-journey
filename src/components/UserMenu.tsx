import { useUser } from '@/contexts/UserContext';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { useToast } from '@/hooks/use-toast';
import Icon from '@/components/ui/icon';

export const UserMenu = () => {
  const { user, logout } = useUser();
  const { toast } = useToast();

  const handleLogout = () => {
    logout();
    toast({
      title: 'Вы вышли из аккаунта',
      description: 'До скорой встречи!',
    });
  };

  if (!user) return null;

  const initials = user.name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-10 w-10 rounded-full">
          <Avatar>
            <AvatarFallback className="bg-gradient-to-br from-primary to-secondary text-white">
              {initials}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end">
        <DropdownMenuLabel>
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{user.name}</p>
            <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Icon name="User" size={16} className="mr-2" />
          Мой профиль
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Icon name="Package" size={16} className="mr-2" />
          Мои заказы
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Icon name="Heart" size={16} className="mr-2" />
          Избранное
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Icon name="Settings" size={16} className="mr-2" />
          Настройки
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout}>
          <Icon name="LogOut" size={16} className="mr-2" />
          Выйти
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
