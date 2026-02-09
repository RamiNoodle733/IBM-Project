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
      width="56"
      height="22"
      viewBox="-10 -10 1050 420"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="IBM"
    >
      <defs>
        <clipPath id="ibm-clip">
          <path d="M0-1v83h55.937v236H1.523v82h194.65v-82h-55.938V82h54.414V-1zm554.02 1v82h55.938v236h-54.414v82h138.71V171.84l82.656 228.08 1.68.04 81.172-228.12V400h140.23v-82h-55.938V82h54.415V0h-156.33l-64.726 182.89L711.866 0z" />
          <path d="M222.23 0v82h55.937v130h215.31v-24.928s18.011-14.042 23.75-27.367l11.523-25.855s5.352-14.472 5.352-27.405l-2.305-25.855s-3.616-21.063-9.922-27.328l-22.266-25.895S471.276 0 433.75 0zm140.23 82h81.992v76H362.46z" id="ibm-b" />
          <use href="#ibm-b" transform="matrix(1 0 0 -1 0 400)" />
        </clipPath>
      </defs>
      <path
        clipPath="url(#ibm-clip)"
        d="M0 13.683h1030v53.232H0m0 53.232h975v53.242H0v53.222h975v53.222H0m0 53.242h1030v53.242H0"
        strokeWidth="27.37"
        stroke="currentColor"
      />
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
