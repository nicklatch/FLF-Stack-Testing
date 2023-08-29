import logo from 'public/logo.png';
import { Button } from '~/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@radix-ui/react-dropdown-menu';

export default function Header({ user }) {
  return (
    <header className='col-span-full row-span-1 flex justify-between items-center h-fit'>
      <img
        src={logo}
        alt='The Chetek Ice Racing Logo'
        className='block max-w-sm object-contain'
      />

      <section className='flex justify-center items-center'>
        <p>{user?.username ?? 'username'}</p>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant='outline'>Menu</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
          </DropdownMenuContent>
        </DropdownMenu>
      </section>
    </header>
  );
}
