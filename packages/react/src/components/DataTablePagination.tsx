"use client";

import { Button } from "@/components/Button";
import { MaterialIcon } from "@/components/MaterialIcon";
import cn from "@/lib/helpers/cn";
import type { ElementCustomizableProps, StyleableFC } from "@/lib/types";
import "@suankularb-components/css/data-table-pagination.css";
import { useEffect, useRef, useState } from "react";

/**
 * Props for {@link DataTablePagination Data Table Pagination}.
 */
export interface DataTablePaginationProps extends ElementCustomizableProps {
  /**
   * The maximum number of rows shown on the Data Table at a time.
   *
   * - Must be a non-negative integer.
   * - Always required.
   */
  rowsPerPage: number;

  /**
   * The total number of rows of data, including both those currently shown and
   * not shown on the Data Table.
   *
   * - Must be a non-negative integer.
   * - Always required.
   */
  totalRows: number;

  /**
   * Allows for translation of the page indicator and accessibility labels.
   *
   * - Must be `en-US` or `th`.
   * - Optional.
   */
  locale?: "en-US" | "th";

  /**
   * Called when the user changes the page.
   *
   * - The following is passed to the function: the current page number, the
   *   start index, and the end index.
   * - Optional.
   */
  onChange?: (page: number, start: number, end: number) => any;
}

type FormattedPaginationNumbers = {
  start: string;
  end: string;
  total: string;
};

const STRINGS = {
  "en-US": {
    alt: ({ start, end, total }: FormattedPaginationNumbers) =>
      `Rows ${start} to ${end}, from a total of ${total} rows`,
    label: ({ start, end, total }: FormattedPaginationNumbers) =>
      `${start}-${end} of ${total}`,
    action: {
      first: "Go to first page",
      previous: "Previous page",
      next: "Next page",
      last: "Go to last page",
    },
  },
  th: {
    alt: ({ start, end, total }: FormattedPaginationNumbers) =>
      `แถวที่ ${start} ถึง ${end} จากทั้งหมด ${total} แถว`,
    label: ({ start, end, total }: FormattedPaginationNumbers) =>
      `${start}-${end} จาก ${total}`,
    action: {
      first: "ไปหน้าแรก",
      previous: "หน้าที่แล้ว",
      next: "หน้าต่อไป",
      last: "ไปหน้าสุดท้าย",
    },
  },
};

/**
 * At the footer of a Data Table, Data Table Pagination provides controls for
 * paginating the Data Table data, including the current rows and navigating
 * forward and backward on pages.
 *
 * @param rowsPerPage The maximum number of rows shown on the Data Table at a time.
 * @param totalRows The total number of rows of data, including both those currently shown and not shown on the Data Table.
 * @param locale Allows for translation of the page indicator and accessibility labels.
 * @param onChange Called when the user changes the page.
 */
export const DataTablePagination: StyleableFC<DataTablePaginationProps> = ({
  rowsPerPage,
  totalRows,
  locale = "en-US",
  onChange,
  element: Element = "div",
  style,
  className,
}) => {
  const [page, setPage] = useState<number>(1);
  const [maxPage, setMaxPage] = useState<number>(
    Math.ceil(totalRows / rowsPerPage),
  );
  useEffect(() => {
    const newMaxPage = Math.ceil(totalRows / rowsPerPage);
    setMaxPage(newMaxPage);
    if (newMaxPage < page) setPage(Math.max(newMaxPage, 1));
  }, [totalRows, rowsPerPage]);

  const range = {
    start: totalRows ? rowsPerPage * (page - 1) + 1 : 0,
    end: Math.min(rowsPerPage * page, totalRows),
  };

  const formattedNumbers: FormattedPaginationNumbers = {
    start: range.start.toLocaleString(locale),
    end: range.end.toLocaleString(locale),
    total: totalRows.toLocaleString(locale),
  };

  useEffect(() => onChange?.(page, range.start - 1, range.end - 1), [page]);

  // Imperatively write to a persistent live region so VO picks up page
  // changes — the clear-then-set pattern mirrors the Snackbar announcer.
  const statusRef = useRef<HTMLSpanElement>(null);
  const announcement = STRINGS[locale].alt(formattedNumbers);
  useEffect(() => {
    const el = statusRef.current;
    if (!el) return;
    el.textContent = "";
    requestAnimationFrame(() => {
      el.textContent = announcement;
    });
  }, [announcement]);

  return (
    <Element
      style={style}
      className={cn("skc-data-table-pagination", className)}
    >
      <span className="skc-data-table-pagination__label">
        {/* aria-label is not supported on a generic span — VoiceOver read it
            as a group name AND read the visible text. A visually-hidden
            phrase plus hidden visible text announces once. */}
        <span className="skc-sr-only">
          {STRINGS[locale].alt(formattedNumbers)}
        </span>
        <span aria-hidden>{STRINGS[locale].label(formattedNumbers)}</span>
      </span>
      {/* Persistent live region — content is written imperatively so VO
          picks up changes even when the text is replaced in-place. */}
      <span ref={statusRef} role="status" className="skc-sr-only" />
      <div className="skc-data-table-pagination__controls">
        {/* Skip to first */}
        <Button
          appearance="text"
          icon={<MaterialIcon icon="first_page" />}
          alt={STRINGS[locale].action.first}
          disabled={page === 1}
          onClick={() => setPage(1)}
        />
        {/* Previous */}
        <Button
          appearance="text"
          icon={<MaterialIcon icon="chevron_left" />}
          alt={STRINGS[locale].action.previous}
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
        />
        {/* Next */}
        <Button
          appearance="text"
          icon={<MaterialIcon icon="chevron_right" />}
          alt={STRINGS[locale].action.next}
          disabled={page === maxPage}
          onClick={() => setPage(page + 1)}
        />
        {/* Skip to last */}
        <Button
          appearance="text"
          icon={<MaterialIcon icon="last_page" />}
          alt={STRINGS[locale].action.last}
          disabled={page === maxPage}
          onClick={() => setPage(maxPage)}
        />
      </div>
    </Element>
  );
};
