import { NextPage } from "next";
import { AppProps } from "next/app";
import { ReactElement, ReactNode } from "react";

export interface LayoutProps {
  children: ReactNode;
}

export type NextPageWithLayout = NextPage & {
  Layout?: (page: LayoutProps) => ReactElement;
};

export type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export enum KeyMenuAsRoute {
  "Shop" = "",
  "About Us" = "about-us",
  "Contact" = "contact"
}

export enum KeyMenuAdminAsRouter {
  "manage-admin" = "/admin",
  "products" = "/admin/products"
}