import React, { createContext, useContext, useState } from "react";

const AnnouncementContext = createContext();

export const AnnouncementProvider = ({ children }) => {
  const [announcements, setAnnouncements] = useState([]);

  const sendAnnouncement = (announcement) => {
    setAnnouncements([announcement, ...announcements]);
  };

  return (
    <AnnouncementContext.Provider value={{ announcements, sendAnnouncement }}>
      {children}
    </AnnouncementContext.Provider>
  );
};

export const useAnnouncement = () => useContext(AnnouncementContext);
