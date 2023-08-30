import { Form } from '@remix-run/react';
import { Button } from '~/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '~/components/ui/dropdown-menu';
import SideNav from '../SideNav';
type Username = { username: string };

export default function UserDropdown({ username }: Username) {
  console.log(username);
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='ghost' className=''>
          {username}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Profile</DropdownMenuItem>
        <Form action='/logout' method='post'>
          <Button type='submit'>Logout</Button>
        </Form>
        <SideNav className='sm:hidden' />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
