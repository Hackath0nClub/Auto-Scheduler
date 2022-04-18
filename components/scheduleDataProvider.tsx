import React, { createContext, useState, ReactNode } from "react";
import { projects } from "../repositories/testData";

const emptyValue: any = [];
export const ScheduleDataContext = createContext(emptyValue);

export const ScheduleDataProvider = ({ children }: { children: ReactNode }) => {
  const [scheduleData, setScheduleData] = useState(projects);
  return (
    <ScheduleDataContext.Provider value={[scheduleData, setScheduleData]}>
      {children}
    </ScheduleDataContext.Provider>
  );
};
