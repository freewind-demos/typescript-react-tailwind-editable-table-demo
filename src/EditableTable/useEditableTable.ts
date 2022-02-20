import { useState } from 'react';
import { useEffect } from 'react';
import { useCallback } from 'react';

import type { TableColumn } from './typings';

export type TableHelpers<T> = {
  updateRow: (index: number, rowChanges: Partial<T>) => void;
  deleteRow: (index: number) => void;
  addRow: (index?: number) => void;
};

export function useEditableTable<T>(newRows: T[], createRow?: () => T) {
  const [rows, setRows] = useState<T[]>(newRows);
  useEffect(() => {
    setRows(newRows);
  }, [JSON.stringify(newRows)]);

  const buildColumns = useCallback(
    (callback: (helpers: TableHelpers<T>) => TableColumn<T>[]): TableColumn<T>[] => {
      function updateRow(index: number, rowChanges: Partial<T>) {
        setRows((rows) => {
          const newRows = [...rows];
          newRows.splice(index, 1, { ...newRows[index], ...rowChanges });
          return newRows;
        });
      }

      function deleteRow(index: number) {
        setRows((rows) => {
          const newRows = [...rows];
          newRows.splice(index, 1);
          return newRows;
        });
      }

      function addRow(index?: number) {
        if (createRow === undefined) {
          return;
        }

        const newRow = createRow();
        if (index === undefined) {
          setRows((rows) => [...rows, newRow]);
        } else {
          setRows((rows) => {
            const newRows = [...rows];
            newRows.splice(index, 0, newRow);
            return newRows;
          });
        }
      }

      return callback({ updateRow, deleteRow, addRow });
    },
    [] // no dependency needed
  );

  return { rows, setRows, buildColumns };
}
