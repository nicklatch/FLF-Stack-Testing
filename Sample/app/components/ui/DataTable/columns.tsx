import type { ColumnDef } from "@tanstack/react-table";
import type { Driver } from "@prisma/client";

export const columns: Array<ColumnDef<Driver>> = [
  {
    accessorKey: "firstName",
    header: () => <div className="font-bold">First Name</div>,
    cell: ({ row }) => {
      const nameFirst = String(row.getValue("firstName"));
      return <div>{nameFirst}</div>;
    },
  },
  {
    accessorKey: "lastName",
    header: () => <div className="font-bold">First Name</div>,
    cell: ({ row }) => {
      const nameLast = String(row.getValue("lastName"));
      return <div>{nameLast}</div>;
    },
  },
  {
    accessorKey: "carNumber",
    header: () => <div className="font-bold">Car Number</div>,
  },
  {
    accessorKey: "baseClass",
    header: () => <div className="font-bold">Base Class</div>,
  },
  {
    accessorKey: "driverPhone",
    header: () => <div className="font-bold">Driver Phone</div>,
  },
  {
    accessorKey: "driverEmail",
    header: "Driver Email",
  },
];

// TODO: Add points
