import type { NextPage } from "next";
import React, { useContext } from "react";
import tableStyles from "../styles/table.module.scss";
import { ScheduleDataContext } from "./scheduleDataProvider";

const TableView: NextPage = () => {
  const [scheduleData, setScheduleData] = useContext(ScheduleDataContext);

  return (
    <table className="table-auto">
      <thead className="bg-gray-300">
        <tr>
          <th colSpan={5} className="border border-gray-500 text-left">
            <button className="mr-2">←</button>
            <button className="bg-blue-500 hover:bg-blue-700 text-white py-1 px-4 rounded">
              プロジェクト追加＋
            </button>
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
        {scheduleData.map((project: any, index: any) => (
          <React.Fragment key={project.id}>
            <tr className="text-center">
              <th className="border border-gray-500">
                {project.name}
                {index}
              </th>
              <th className="border border-gray-500">↓{project.name}</th>
              <th className="border border-gray-500">{project.startDate}</th>
              <th className="border border-gray-500">{project.endDate}</th>
              <th className="border border-gray-500"></th>
            </tr>
            {project.tasks.map((task: any, rowIndex: any) => (
              <tr className="text-center" key={task.id}>
                <td className="border border-gray-500">
                  {project.name}
                  {index + rowIndex + 1}
                </td>
                <td className="border border-gray-500">
                  <input type="checkbox" />
                  <span>{task.name}</span>
                </td>
                <td className="border border-gray-500">
                  {task.start.toISOString()}
                </td>
                <td className="border border-gray-500">
                  {task.end.toISOString()}
                </td>
                <td className="border border-gray-500"></td>
              </tr>
            ))}
            <tr>
              <td className="border border-gray-500"></td>
              <td className="border border-gray-500">
                <button className="text-blue-500">タスク追加＋</button>
              </td>
              <td className="border border-gray-500"></td>
              <td className="border border-gray-500"></td>
              <td className="border border-gray-500"></td>
            </tr>
          </React.Fragment>
        ))}
      </tbody>
    </table>
  );
};

export default TableView;
