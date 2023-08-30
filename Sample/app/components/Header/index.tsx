import logo from 'public/logo.png';
import UserDropdown from './UserDropdown';
import { Separator } from '../ui/separator';
import { Link } from '@remix-run/react';

// TODO: left off here

export default function Header({ username }: { username: string }) {
  return (
    <>
      <header className='h-fit'>
        <div className='flex justify-between items-center p-4'>
          <Link to='/fusion'>
            <img
              src={logo}
              alt='The Chetek Ice Racing Logo'
              className='block max-w-[45vw] sm:max-w-[300px] object-contain'
            />
          </Link>
          <UserDropdown username={username} />
        </div>
        <Separator className='mb-4' />
      </header>
    </>
  );
}
