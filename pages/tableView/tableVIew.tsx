import type { NextPage } from 'next';
import React from 'react';
import tableStyles from '../../styles/table.module.scss';
import { data } from './testData';

const TableView: NextPage = () => {
  return (
    <table className="table-auto">
      <thead className='bg-gray-300'>
        <tr>
          <th colSpan={5} className="border border-gray-500">
            <button className="bg-blue-500 hover:bg-blue-700 text-white py-1 px-4 rounded">プロジェクト追加＋</button>
          </th>
        </tr>
        <tr>
          <th className="border border-gray-500"></th>
          <th className="border border-gray-500">件名</th>
          <th className="border border-gray-500">開始</th>
          <th className="border border-gray-500">終了</th>
          <th className="border border-gray-500">先行タスク</th>
        </tr>
      </thead>
      <tbody>
        {data.map(d => (
          <tr>
            <td className="border border-gray-500"></td>
            <td className="border border-gray-500">{d.subject}</td>
            <td className="border border-gray-500">{d.start}</td>
            <td className="border border-gray-500">{d.end}</td>
            <td className="border border-gray-500"></td>
            </tr>
        ))}
      </tbody>
    </table>
  )
}

export default TableView;
