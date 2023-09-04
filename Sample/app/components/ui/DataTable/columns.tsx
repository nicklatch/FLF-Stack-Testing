import type { ColumnDef } from '@tanstack/react-table';
import type { Driver } from '@prisma/client';
import { MoreHorizontal } from 'lucide-react';
import { Button } from '~/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '~/components/ui/dropdown-menu';
import { Link } from '@remix-run/react';
import { ColumnHeading } from './column-heading';

export const columns: Array<ColumnDef<Driver>> = [
  {
    accessorKey: 'firstName',
    header: () => <ColumnHeading headingText="First Name" />,
  },
  {
    accessorKey: 'lastName',
    header: () => <ColumnHeading headingText="Last Name" />,
  },
  {
    accessorKey: 'carNumber',
    header: () => <ColumnHeading headingText="Car Number" />,
  },
  {
    accessorKey: 'baseClass',
    header: () => <ColumnHeading headingText="Base Class" />,
  },
  {
    accessorKey: 'driverPhone',
    header: () => <ColumnHeading headingText="Driver Phone" />,
  },
  {
    accessorKey: 'driverEmail',
    header: () => <ColumnHeading headingText="Driver Email" />,
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const driver = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Link to={`${driver.firstName}-${driver.lastName}-${driver.id}`}>
                Edit Driver
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

// TODO: Add points
