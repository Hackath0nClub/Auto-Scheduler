import React from "react";
import Chart from "react-google-charts";

const Gantt = () => {
    function daysToMilliseconds(days: number) {
        return days * 24 * 60 * 60 * 1000;
      }
    //   各タスクに必要な項目
      const columns = [
        { type: "string", label: "Task ID" },
        { type: "string", label: "Task Name" },
        { type: "date", label: "Start Date" },
        { type: "date", label: "End Date" },
        { type: "number", label: "Duration" },
        { type: "number", label: "Percent Complete" },
        { type: "string", label: "Dependencies" }
      ];
      
    //   各タスクの情報
      const rows = [
        [
          "Research",
          "技術検証",
          new Date(2015, 0, 1),
          new Date(2015, 0, 5),
          null,
          100,
          null
        ],
        [
          "Write",
          "計画策定",
          null,
          new Date(2015, 0, 9),
          daysToMilliseconds(3),
          25,
          "Research,Outline"
        ],
        [
          "Cite",
          "発表用資料作成",
          null,
          new Date(2015, 0, 7),
          daysToMilliseconds(1),
          20,
          "Research"
        ],
        [
          "Complete",
          "完成",
          null,
          new Date(2015, 0, 10),
          daysToMilliseconds(1),
          0,
          "Cite,Write"
        ],
        [
          "Outline",
          "基本系完成",
          null,
          new Date(2015, 0, 6),
          daysToMilliseconds(1),
          100,
          "Research"
        ]
      ];
      class Gantt extends React.Component {
        state = {
          chartImageURI: ""
        };
        render() {
          return (
            <div className="App">
              <Chart
                chartType="Gantt"
                data={[columns, ...rows]}
                width="100%"
                height="50%"
                legendToggle
              />
            </div>
          );
        }
      }
      return <Gantt />;
}


export default Gantt;