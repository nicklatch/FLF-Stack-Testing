import { Link, useLocation } from '@remix-run/react';
import { useEffect, useState } from 'react';
import { cn } from '~/lib/utils';

export const pages = [
  { name: 'Overview', path: 'overview' },
  { name: 'Driver Management', path: 'driver-management' },
  { name: 'Registration', path: 'registration' },
  { name: 'Lineup Creation', path: 'lineup-creation' },
  { name: 'Results Entry', path: 'results-entry' },
  { name: 'Payouts', path: 'payouts' },
  { name: 'Track Conditions', path: 'track-conditions' },
];

interface SideNavProps {
  displayProp: string;
}

const SideNav = ({ displayProp }: SideNavProps) => {
  const [focused, setFocused] = useState('');
  const location = useLocation().pathname;

  useEffect(() => {
    setFocused(location);
    console.log(location);
  }, [location]);

  const isFocused = (path: string) => {
    // TODO: change to '.includes()' from useLocation string
    return focused === `/fusion/${path}`
      ? 'bg-background translate-x-[1.1rem] border border-r-0 border-l-primary border-l-8 rounded-r-none'
      : '';
  };

  return (
    <nav>
      <ul
        className={cn(
          'h-full flex-col gap-4 items-center pr-4 text-center ',
          displayProp
        )}
      >
        {pages.map((page) => (
          <li
            key={page.path}
            className={cn(
              'flex justify-center items-center w-full h-14 px-2 border border-input rounded-md hover:bg-primary hover:text-accent-foreground ease-in-out duration-300 ',
              isFocused(page.path)
            )}
          >
            <Link to={`/fusion/${page.path}`} className="">
              {page.name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default SideNav;
