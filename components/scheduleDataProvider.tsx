import React, { createContext, useState, ReactNode } from "react";
import { tasks } from "../repositories/testData";

const emptyValue: any = [];
export const ScheduleDataContext = createContext(emptyValue);

export const ScheduleDataProvider = ({ children }: { children: ReactNode }) => {
  const [scheduleData, setScheduleData] = useState(tasks);
  return (
    <ScheduleDataContext.Provider value={[scheduleData, setScheduleData]}>
      {children}
    </ScheduleDataContext.Provider>
  );
};
