import UserDropdown from './UserDropdown';
import { Separator } from '../ui/separator';
import { Link } from '@remix-run/react';
import { Switch } from '../ui/switch';
import { useAtom } from 'jotai';
import { theme } from '~/root';
import { useEffect } from 'react';

export default function Header({ username }: { username: string }) {
  const [appTheme, setAppTheme] = useAtom(theme);

  const handleChange = () => {
    setAppTheme(appTheme === 'dark' ? 'light' : 'dark');
  };

  return (
    <header className='h-fit p-4'>
      <div className='flex justify-between items-center'>
        <Link to='/fusion' className='font-extrabold text-lg sm:text-2xl'>
          FastLane Fusion
        </Link>
        <span className='flex items-center'>
          <UserDropdown username={username} />
          <span className='flex items-center gap-1'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='24'
              height='24'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
              className='lucide lucide-moon'
            >
              <path d='M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z' />
            </svg>
            <Switch id='theme-toggle' onCheckedChange={handleChange} />
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='24'
              height='24'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
              className='lucide lucide-sun'
            >
              <circle cx='12' cy='12' r='4' />
              <path d='M12 2v2' />
              <path d='M12 20v2' />
              <path d='m4.93 4.93 1.41 1.41' />
              <path d='m17.66 17.66 1.41 1.41' />
              <path d='M2 12h2' />
              <path d='M20 12h2' />
              <path d='m6.34 17.66-1.41 1.41' />
              <path d='m19.07 4.93-1.41 1.41' />
            </svg>
          </span>
        </span>
      </div>
      <Separator className='' />
    </header>
  );
}
