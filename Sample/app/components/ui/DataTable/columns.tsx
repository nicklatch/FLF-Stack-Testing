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


export const columns: Array<ColumnDef<Driver>> = [
  {
    accessorKey: 'firstName',
    header: () => <div className="font-bold text-left">First Name</div>,
  },
  {
    accessorKey: 'lastName',
    header: () => <div className="font-bold text-left">First Name</div>,
  },
  {
    accessorKey: 'carNumber',
    header: () => <div className="font-bold text-left">Car Number</div>,
  },
  {
    accessorKey: 'baseClass',
    header: () => <div className="font-bold text-left">Base Class</div>,
  },
  {
    accessorKey: 'driverPhone',
    header: () => <div className="font-bold text-left">Driver Phone</div>,
  },
  {
    accessorKey: 'driverEmail',
    header: () => <div className="font-bold text-left">Driver Email</div>,
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
              <Link to={`${driver.firstName}${driver.lastName}`}>
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
