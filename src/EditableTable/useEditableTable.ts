import {useState} from 'react';
import {useEffect} from 'react';
import {useCallback} from 'react';
import {TableColumn} from '../typings';

export function useEditableTable<T>(newRows: T[]) {
  const [rows, setRows] = useState(newRows);
  useEffect(() => {
    setRows(newRows)
  }, [JSON.stringify(newRows)])

  const buildColumns = useCallback((callback: (helpers: { updateRow: (index: number, rowChanges: Partial<T>) => void, deleteRow: (index: number) => void }) => TableColumn<T>[]): TableColumn<T>[] => {
    function updateRow(index: number, rowChanges: Partial<T>) {
      setRows(rows => {
        const newRows = [...rows];
        newRows.splice(index, 1, {...newRows[index], ...rowChanges})
        return newRows
      })
    }

    function deleteRow(index: number) {
      setRows(rows => {
        const newRows = [...rows];
        newRows.splice(index, 1)
        return newRows;
      })
    }

    return callback({updateRow, deleteRow})
  }, [])

  return {rows, setRows, buildColumns}
}
