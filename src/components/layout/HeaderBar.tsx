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
import { useState, useEffect } from "react";

export function HeaderBar() {
  const pathname = usePathname();
  const [dark, setDark] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute(
      "data-carbon-theme",
      dark ? "g100" : "white"
    );
  }, [dark]);

  return (
    <Header aria-label="AI Demo Studio">
      <HeaderName as={Link} href="/" prefix="IBM">
        AI Demo Studio
      </HeaderName>
      <HeaderNavigation aria-label="Main">
        <HeaderMenuItem as={Link} href="/demos" isCurrentPage={pathname.startsWith("/demos")}>
          Demos
        </HeaderMenuItem>
        <HeaderMenuItem as={Link} href="/guided" isCurrentPage={pathname.startsWith("/guided")}>
          Guided Mode
        </HeaderMenuItem>
        <HeaderMenuItem as={Link} href="/follow-up" isCurrentPage={pathname.startsWith("/follow-up")}>
          Follow-up
        </HeaderMenuItem>
        <HeaderMenuItem as={Link} href="/analytics" isCurrentPage={pathname === "/analytics"}>
          Analytics
        </HeaderMenuItem>
      </HeaderNavigation>
      <HeaderGlobalBar>
        <HeaderGlobalAction
          aria-label="Toggle theme"
          onClick={() => setDark((d) => !d)}
        >
          {dark ? <Light size={20} /> : <Asleep size={20} />}
        </HeaderGlobalAction>
      </HeaderGlobalBar>
    </Header>
  );
}
