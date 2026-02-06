"use client";

import {
  Header,
  HeaderName,
  HeaderNavigation,
  HeaderMenuItem,
  HeaderGlobalBar,
  HeaderGlobalAction,
} from "@carbon/react";
import { Light, Asleep } from "@carbon/icons-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useThemeContext } from "./ThemeProvider";

function IBM8BarLogo() {
  return (
    <svg
      width="65"
      height="26"
      viewBox="0 0 65 26"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="IBM"
    >
      {/* I */}
      <rect x="0" y="0" width="13" height="2.5" />
      <rect x="0" y="4" width="13" height="2.5" />
      <rect x="3.5" y="8" width="6" height="2.5" />
      <rect x="3.5" y="12" width="6" height="2.5" />
      <rect x="3.5" y="16" width="6" height="2.5" />
      <rect x="0" y="20" width="13" height="2.5" />
      <rect x="0" y="23.5" width="13" height="2.5" />
      {/* B */}
      <rect x="17" y="0" width="16" height="2.5" />
      <rect x="17" y="4" width="16.5" height="2.5" />
      <rect x="20.5" y="8" width="9" height="2.5" />
      <rect x="20.5" y="12" width="11" height="2.5" />
      <rect x="20.5" y="16" width="9.5" height="2.5" />
      <rect x="17" y="20" width="16.5" height="2.5" />
      <rect x="17" y="23.5" width="16" height="2.5" />
      {/* M */}
      <rect x="38" y="0" width="5" height="2.5" />
      <rect x="53" y="0" width="5" height="2.5" />
      <rect x="38" y="4" width="7" height="2.5" />
      <rect x="51" y="4" width="7" height="2.5" />
      <rect x="41.5" y="8" width="13" height="2.5" />
      <rect x="41.5" y="12" width="5" height="2.5" />
      <rect x="49.5" y="12" width="5" height="2.5" />
      <rect x="41.5" y="16" width="3" height="2.5" />
      <rect x="51.5" y="16" width="3" height="2.5" />
      <rect x="38" y="20" width="8.5" height="2.5" />
      <rect x="49.5" y="20" width="8.5" height="2.5" />
      <rect x="38" y="23.5" width="8.5" height="2.5" />
      <rect x="49.5" y="23.5" width="8.5" height="2.5" />
    </svg>
  );
}

export function HeaderBar() {
  const pathname = usePathname();
  const { dark, toggle } = useThemeContext();

  return (
    <Header aria-label="AI Demo Studio">
      <HeaderName as={Link} href="/" prefix="">
        <span style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <IBM8BarLogo />
          <span style={{ borderLeft: "1px solid currentColor", paddingLeft: "0.75rem", opacity: 0.7 }}>
            AI Demo Studio
          </span>
        </span>
      </HeaderName>
      <HeaderNavigation aria-label="Main">
        <HeaderMenuItem
          as={Link}
          href="/demos"
          isCurrentPage={pathname.startsWith("/demos")}
        >
          Demos
        </HeaderMenuItem>
        <HeaderMenuItem
          as={Link}
          href="/guided"
          isCurrentPage={pathname.startsWith("/guided")}
        >
          Guided Mode
        </HeaderMenuItem>
        <HeaderMenuItem
          as={Link}
          href="/follow-up"
          isCurrentPage={pathname.startsWith("/follow-up")}
        >
          Follow-up
        </HeaderMenuItem>
        <HeaderMenuItem
          as={Link}
          href="/analytics"
          isCurrentPage={pathname === "/analytics"}
        >
          Analytics
        </HeaderMenuItem>
      </HeaderNavigation>
      <HeaderGlobalBar>
        <HeaderGlobalAction
          aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
          tooltipAlignment="end"
          onClick={toggle}
        >
          {dark ? <Light size={20} /> : <Asleep size={20} />}
        </HeaderGlobalAction>
      </HeaderGlobalBar>
    </Header>
  );
}
