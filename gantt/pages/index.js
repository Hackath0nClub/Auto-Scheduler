import {Gantt, DefaultTheme} from '@dhtmlx/trial-react-gantt'
import { columns, scales, tasks, links } from "../assets/data";

export default function IndexPage() {
  return (
    <div style={{ height: "500px" }}>
    <DefaultTheme>
      <Gantt scales={scales} columns={columns} tasks={tasks} links={links} />
    </DefaultTheme>
    </div>
  )
}
