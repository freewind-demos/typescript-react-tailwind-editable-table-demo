import React, {FC} from 'react'
import {useMemo} from 'react';

import './MyTable.pcss';
import {TableColumn} from './typings';
import {EditableTable} from './EditableTable/EditableTable';
import {NumberInputCell} from './EditableTable/NumberInputCell';
import {sum} from './utils';
import {useEditableTable} from './EditableTable/useEditableTable';

type Row = {
  project: string,
  sun: number,
  mon: number,
  tue: number,
  wed: number,
  thu: number,
  fri: number,
  sat: number
};


export const MyTable: FC = () => {
  const {rows, setRows, buildColumns} = useEditableTable<Row>([
    {project: 'project 1', sun: 0, mon: 6, tue: 4, wed: 2, thu: 4, fri: 3, sat: 0},
    {project: 'project 2', sun: 0, mon: 2, tue: 5, wed: 2, thu: 5, fri: 1, sat: 0},
    {project: 'project 3', sun: 0, mon: 4, tue: 2, wed: 2, thu: 4, fri: 3, sat: 0},
    {project: 'project 4', sun: 0, mon: 2, tue: 8, wed: 2, thu: 4, fri: 3, sat: 0},
  ]);

  const bodyColumns: TableColumn<Row>[] = useMemo(() => buildColumns(({updateRow, deleteRow}) => {
    function rowTotal(rows: Row[], index: number) {
      const row = rows[index];
      return row.sun + row.mon + row.tue + row.wed + row.thu + row.fri + row.sat;
    }

    return [
      {
        title: 'Project',
        width: 200,
        renderCell: (rows, index) => rows[index].project, isHead: true,
        cellClasses: {
          body: 'min-w-28 px-2 py-1',
        }
      },
      {
        title: 'Sun 02/13',
        width: 100,
        renderCell: (rows, index) => <NumberInputCell value={rows[index].sun}
                                                      updateValue={v => updateRow(index, {sun: v})}/>,
        renderFootCell: (rows) => sum(rows.map(it => it.sun)).toString(),
      },
      {
        title: 'Mon 02/14',
        width: 100,
        renderCell: (rows, index) => <NumberInputCell value={rows[index].mon}
                                                      updateValue={v => updateRow(index, {mon: v})}/>,
        renderFootCell: (rows) => sum(rows.map(it => it.mon)).toString(),
      },
      {
        title: 'Tue 02/15',
        width: 100,
        renderCell: (rows, index) => <NumberInputCell value={rows[index].tue}
                                                      updateValue={v => updateRow(index, {tue: v})}/>,
        renderFootCell: (rows) => sum(rows.map(it => it.tue)).toString(),
      },
      {
        title: 'Wed 02/16', width: 100,
        renderCell: (rows, index) => <NumberInputCell value={rows[index].wed}
                                                      updateValue={v => updateRow(index, {wed: v})}/>,
        renderFootCell: (rows) => sum(rows.map(it => it.wed)).toString(),
      },
      {
        title: 'Thu 02/17', width: 100,
        renderCell: (rows, index) => <NumberInputCell value={rows[index].thu}
                                                      updateValue={v => updateRow(index, {thu: v})}/>,
        renderFootCell: (rows) => sum(rows.map(it => it.thu)).toString(),
      },
      {
        title: 'Fri 02/18', width: 100,
        renderCell: (rows, index) => <NumberInputCell value={rows[index].fri}
                                                      updateValue={v => updateRow(index, {fri: v})}/>,
        renderFootCell: (rows) => sum(rows.map(it => it.fri)).toString(),
      },
      {
        title: 'Sat 02/19', width: 100,
        renderCell: (rows, index) => <NumberInputCell value={rows[index].sat}
                                                      updateValue={v => updateRow(index, {sat: v})}/>,
        renderFootCell: (rows) => sum(rows.map(it => it.sat)).toString(),
      },
      {
        title: 'Week Total', width: 100,
        renderCell: (rows, rowIndex) => rowTotal(rows, rowIndex),
        cellClasses: {
          base: ['font-bold']
        },
      },
      {title: '', renderCell: (rows, index) => <button onClick={() => deleteRow(index)}/>}
    ] as TableColumn<Row>[]
  }), [buildColumns]);

  return <div className={'MyTable'}>
    <EditableTable<Row> columns={bodyColumns} rows={rows}/>
    <button className={'bg-blue-500 rounded text-white px-4 py-1 hover:bg-blue-700'}
            onClick={() => setRows(rows => [...rows, {
              project: '',
              sun: 0,
              mon: 0,
              tue: 0,
              wed: 0,
              thu: 0,
              fri: 0,
              sat: 0
            },])}>Add new row
    </button>
  </div>
}
