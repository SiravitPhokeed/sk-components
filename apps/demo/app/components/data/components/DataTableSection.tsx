"use client";

import {
  Avatar,
  DataTable,
  DataTableBody,
  DataTableContent,
  DataTableHead,
  DataTablePagination,
  DataTableSearch,
  Header,
  InputChip,
  MaterialIcon,
  Section,
} from "@suankularb-components/react";
import {
  createColumnHelper,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type PaginationState,
  type SortingState,
} from "@tanstack/react-table";
import { useState, type FC } from "react";

// #region Data

type Task = {
  task: string;
  assignee?: string;
  progress: "not-started" | "in-progress" | "completed" | "blocked";
  dueDate?: Date;
};

const PROGRESS_MAP = {
  "not-started": {
    icon: (
      <MaterialIcon
        icon="warning"
        size={20}
        className="text-on-surface-variant"
      />
    ),
    label: "Not started",
  },
  "in-progress": {
    icon: <MaterialIcon icon="pending" size={20} className="text-primary" />,
    label: "In progress",
  },
  completed: {
    icon: (
      <MaterialIcon icon="check_circle" size={20} className="text-outline" />
    ),
    label: "Completed",
  },
  blocked: {
    icon: <MaterialIcon icon="block" size={20} className="text-error" />,
    label: "Blocked",
  },
};

const SAMPLE_TASKS: Task[] = [
  {
    task: "MySK Data API specification",
    assignee: "Smart W.",
    progress: "in-progress",
    dueDate: new Date("2023-02-28"),
  },
  {
    task: "MySK Authentication API specification",
    assignee: "Smart W.",
    progress: "not-started",
  },
  {
    task: "SK Components v4.0.0 release",
    progress: "not-started",
    dueDate: new Date("2026-06-30"),
  },
  {
    task: "SK Components v3.2.3 release",
    assignee: "Siravit P.",
    progress: "completed",
    dueDate: new Date("2023-02-15"),
  },
  {
    task: "MySK Club Registry API specification",
    assignee: "Smart W.",
    progress: "blocked",
  },
  {
    task: "MySK Club Registry API requirements",
    assignee: "Wasapol R.",
    progress: "in-progress",
    dueDate: new Date("2023-03-15"),
  },
  {
    task: "MySK Electives design",
    assignee: "Siravit P.",
    progress: "blocked",
    dueDate: new Date("2023-04-01"),
  },
];

const ROWS_PER_PAGE = 5;

// #endregion Data

// #region Columns

const columnHelper = createColumnHelper<Task>();

const COLUMNS = [
  columnHelper.accessor("task", {
    header: "Task",
    cell: (info) => info.getValue(),
    enableSorting: true,
  }),
  columnHelper.accessor("assignee", {
    header: "Assignee",
    cell: (info) =>
      info.getValue() && (
        <InputChip avatar={<Avatar />}>{info.getValue()}</InputChip>
      ),
    enableSorting: true,
  }),
  columnHelper.accessor("progress", {
    header: "Progress",
    cell: (info) => {
      const progress = info.getValue();
      const { icon, label } = PROGRESS_MAP[progress];
      return (
        <span className="flex items-center gap-2">
          {icon}
          {label}
        </span>
      );
    },
    enableSorting: true,
    sortingFn: (a, b) => {
      const order = ["not-started", "in-progress", "blocked", "completed"];
      return (
        order.indexOf(a.original.progress) - order.indexOf(b.original.progress)
      );
    },
  }),
  columnHelper.accessor("dueDate", {
    header: "Due date",
    cell: (info) =>
      info.getValue()?.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      }),
    enableSorting: true,
  }),
];

// #endregion Columns

// #region Component

const DataTableSection: FC = () => {
  const [globalFilter, setGlobalFilter] = useState<string>("");
  const [sorting, setSorting] = useState<SortingState>([]);
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 5,
  });

  const {
    getHeaderGroups,
    getRowModel,
    getPrePaginationRowModel,
    setPageIndex,
  } = useReactTable({
    data: SAMPLE_TASKS,
    columns: COLUMNS,
    state: { globalFilter, sorting, pagination },
    onGlobalFilterChange: setGlobalFilter,
    onSortingChange: setSorting,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <Section>
      <Header>Data Table</Header>

      <DataTable>
        <DataTableSearch value={globalFilter} onChange={setGlobalFilter} />
        <DataTableContent contentWidth={760}>
          <DataTableHead
            headerGroups={getHeaderGroups()}
            colSpans={[7, 4, 4, 4]}
          />
          <DataTableBody rowModel={getRowModel()} />
        </DataTableContent>
        <DataTablePagination
          rowsPerPage={ROWS_PER_PAGE}
          totalRows={getPrePaginationRowModel().rows.length}
          onChange={(newPage) => setPageIndex(newPage - 1)}
        />
      </DataTable>
    </Section>
  );
};

export default DataTableSection;

// #endregion Component
