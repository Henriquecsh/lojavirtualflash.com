"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export const HeaderNav = () => {
  const pathname = usePathname();

  const isActiveMenu = (paths) => {
    return paths.some((path) => pathname === path);
  };

  return (
    <ul className="navigation">
      <li className={pathname === "/" ? "active" : ""}>
        <a href="/">Home</a>
      </li>
      <li className={pathname === "/sobre-nos" ? "active" : ""}>
        <Link href="/sobre-nos">Sobre nós</Link>
      </li>
      <li className={pathname === "/produtos" ? "active" : ""}>
        <a href="/produtos">Todos produtos</a>
      </li>
      <li className={pathname === "/contato" ? "active" : ""}>
        <Link href="/contato">Contato</Link>
      </li>
    </ul>
  );
};
