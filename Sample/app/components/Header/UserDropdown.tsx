import { Form, Link, useLocation } from '@remix-run/react';
import { Button } from '~/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '~/components/ui/dropdown-menu';
import { pages } from '../SideNav';
import { useState, useEffect } from 'react';
import { cn } from '~/lib/utils';

interface UserDropdownProps {
  username: string;
}
export default function UserDropdown({ username }: UserDropdownProps) {
  const [focused, setFocused] = useState('');
  const location = useLocation().pathname;

  useEffect(() => {
    setFocused(location);
    console.log(location);
  }, [location]);

  const isFocused = (path: string) => {
    return focused === `/fusion/${path}`
      ? 'underline underline-primary decoration-2'
      : '';
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='ghost'>{username}</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='text-center'>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className='sm:hidden'>
          <ul>
            {pages.map((page) => (
              <li key={page.path}>
                <Link to={page.path} className={cn(isFocused(page.path))}>
                  {page.name}
                </Link>
              </li>
            ))}
          </ul>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Form action='/logout' method='post' className='mx-auto'>
            <Button type='submit'>Logout</Button>
          </Form>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
