"use client";

import { useEffect, useState } from "react";

export function Clock() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const upd = () => {
      const d = new Date();
      const opts: Intl.DateTimeFormatOptions = { 
        hour: "2-digit", 
        minute: "2-digit", 
        second: "2-digit", 
        timeZone: "Asia/Tbilisi", 
        hour12: false 
      };
      setTime(new Intl.DateTimeFormat("en-GB", opts).format(d));
    };
    
    upd();
    const id = setInterval(upd, 1000);
    return () => clearInterval(id);
  }, []);

  return <span className="font-mono">{time || "--:--:--"}</span>;
}