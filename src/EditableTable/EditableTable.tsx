import React from 'react';
import {TableColumn} from './typings';

type Props<T> = {
  columns: TableColumn<T>[]
  rows: T[]
}

export function EditableTable<T>({columns, rows}: Props<T>) {
  return <table className={'table-auto text-sm'}>
    <thead>
    <tr>
      {columns.map((column, index) => <th
        className={`border px-2 py-1 ${column.cellClasses?.base} ${column.cellClasses?.head}`}
        key={index}>{column.title}</th>)}
    </tr>
    </thead>
    <tbody>
    {rows.map((row, rowIndex) => (
      <tr key={rowIndex} className={`${rowIndex % 2 === 0 ? 'bg-gray-200' : ''} hover:bg-gray-300 h-8`}>
        {columns.map((column, colIndex) => <td
          className={`border ${column.cellClasses?.base} ${column.cellClasses?.body}`} key={colIndex}
          scope="row">{column.renderCell(rows, rowIndex)}</td>
        )}
      </tr>
    ))}
    </tbody>
    {
      columns.some(it => it.renderFootCell !== undefined) &&
      <tbody>
      <tr>
        {columns.map((column, index) => <td
          className={`border px-2 py-1 font-bold ${column.cellClasses?.base} ${column.cellClasses?.foot}`}
          key={index}>{column.renderFootCell?.(rows)}</td>)}
      </tr>
      </tbody>
    }
  </table>
}
