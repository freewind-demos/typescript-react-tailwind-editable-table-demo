import {ReactNode} from 'react';
import {CSSProperties} from 'react';

export type TableColumn<T> = {
  title?: string,
  renderCell: (rows: T[], index: number) => ReactNode,
  renderFootCell?: (rows: T[]) => ReactNode,
  isHead?: boolean,
  width?: number,
  cellClasses?: {
    base?: string,
    head?: string,
    body?: string,
    foot?: string,
  }
}

