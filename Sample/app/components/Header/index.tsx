import logo from 'public/logo.png';
import { Button } from '~/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@radix-ui/react-dropdown-menu';
import { DropdownMenuItem } from '../ui/dropdown-menu';
import { Form } from '@remix-run/react';

interface HeaderProps {
  user: { id: string; username: string };
}

// TODO: left off here

export default function Header({ user }: HeaderProps) {
  console.log(user);
  return (
    <header className="col-span-full row-span-1 flex justify-between items-center h-fit">
      <img
        src={logo}
        alt="The Chetek Ice Racing Logo"
        className="block max-w-sm object-contain"
      />
      <Form action="/logout" method="post">
        <Button type="submit">Logout</Button>
      </Form>

      <section className="flex justify-center gap-2 items-center">
        <p>{user.username}</p>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">Menu</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>asdfasdff</DropdownMenuItem>
              <DropdownMenuItem>One Thing</DropdownMenuItem>
              <DropdownMenuItem>Another Thing</DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </section>
    </header>
  );
}
