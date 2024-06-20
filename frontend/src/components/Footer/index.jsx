import System from "@/models/system";
import { SettingsButton } from "../SettingsButton";
import React, { useEffect, useState } from "react";
import { isMobile } from "react-device-detect";
import { Tooltip } from "react-tooltip";
import { v4 } from "uuid";

export default function Footer() {
  const [footerData, setFooterData] = useState(false);

  useEffect(() => {
    async function fetchFooterData() {
      const { footerData } = await System.fetchCustomFooterIcons();
      setFooterData(footerData);
    }
    fetchFooterData();
  }, []);

  // wait for some kind of non-false response from footer data first
  // to prevent pop-in.
  if (footerData === false) return null;

  return (
    <div className="flex justify-center mb-2">
      <div className="flex space-x-4">
        {!isMobile && <SettingsButton />}
      </div>
    </div>
  );
}

export function ToolTipWrapper({ id = v4(), children }) {
  return (
    <div className="flex w-fit">
      {children}
      <Tooltip
        id={id}
        place="top"
        delayShow={300}
        className="tooltip !text-xs z-99"
      />
    </div>
  );
}
