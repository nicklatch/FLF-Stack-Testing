import { Link } from '@remix-run/react';
import { buttonVariants } from '../ui/button';
import { Separator } from '~/components/ui/separator';

/**
 * Lineup Creation - lineup-creation
 * Results Entry - results-entry
 * Payouts - payouts
 * Track Conditions - track-conditions
 */

const pages = [
  { name: 'Overview', path: 'overview' },
  { name: 'Registration', path: 'registration' },
  { name: 'Lineup Creation', path: 'lineup-creation' },
  { name: 'Results Entry', path: 'results-entry' },
  { name: 'Payouts', path: 'payouts' },
  { name: 'Track Conditions', path: 'track-conditions' },
];

export default function SideNav() {
  return (
    <ul className='hidden sm:flex h-full flex-col gap-4 justify-center items-center pr-4 text-center'>
      {pages.map((page) => (
        <li
          key={page.path}
          className={
            'flex justify-center items-center w-full h-14 border border-input bg-background hover:bg-accent hover:text-accent-foreground active:bg-primary'
          }
        >
          <Link to={`/fusion/${page.path}`} className=''>
            {page.name}
          </Link>
        </li>
      ))}
    </ul>
  );
}
