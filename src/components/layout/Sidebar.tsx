"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Fragment, useEffect, useState } from "react";
import {
  FiBookOpen,
  FiHelpCircle,
  FiHome,
  FiLogIn,
  FiMenu,
  FiSearch,
  FiSettings,
  FiStar,
  FiX,
} from "react-icons/fi";
import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";

import { openLoginModal } from "@/app/features/auth/authSlice";
import { auth } from "@/lib/firebase";
import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import { setFontSize } from "@/app/features/readerSlice";

type SidebarItem = {
  label: string;
  href?: string;
  icon: React.ReactNode;
};

const sidebarItems: SidebarItem[] = [
  {
    label: "For You",
    href: "/for-you",
    icon: <FiHome />,
  },
  {
    label: "My Library",
    href: "/library",
    icon: <FiBookOpen />,
  },
  {
    label: "Highlights",
    icon: <FiStar />,
  },
  {
    label: "Search",
    href: "/search",
    icon: <FiSearch />,
  },
];

const bottomSidebarItems: SidebarItem[] = [
  {
    label: "Settings",
    href: "/settings",
    icon: <FiSettings />,
  },
  {
    label: "Help & Support",
    icon: <FiHelpCircle />,
  },
];

export default function Sidebar() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const { user, isAuthLoading } = useAppSelector((state) => state.auth);
  const pathname = usePathname();

  const fontSize = useAppSelector((state) => state.reader.fontSize);

  const isReaderPage = pathname.startsWith("/reader/");

  useEffect(() => {
    if (!isMobileMenuOpen) {
      return;
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsMobileMenuOpen(false);
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isMobileMenuOpen]);

  async function handleLogout() {
    try {
      await signOut(auth);
      router.push("/");
    } catch (error) {
      console.error("Unable to sign out:", error);
    }
  }

  return (
    <>
      <button
        className="sidebar-toggle"
        type="button"
        aria-label={
          isMobileMenuOpen ? "Close navigation menu" : "Open navigation menu"
        }
        aria-controls="dashboard-sidebar"
        aria-expanded={isMobileMenuOpen}
        onClick={() => setIsMobileMenuOpen((isOpen) => !isOpen)}
      >
        {isMobileMenuOpen ? (
          <FiX aria-hidden="true" />
        ) : (
          <FiMenu aria-hidden="true" />
        )}
      </button>

      {isMobileMenuOpen && (
        <button
          className="sidebar-backdrop"
          type="button"
          aria-label="Close navigation menu"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      <aside
        id="dashboard-sidebar"
        className={`sidebar ${isMobileMenuOpen ? "sidebar--open" : ""}`}
      >
        <div className="sidebar__logo">
          <Link href="/for-you">Summarist</Link>
        </div>

        <nav aria-label="Main navigation">
          <ul className="sidebar__list">
            {sidebarItems.map((item) => {
              const isActive =
                item.href !== undefined &&
                (pathname === item.href ||
                  pathname.startsWith(`${item.href}/`));

              if (!item.href) {
                return (
                  <li key={item.label}>
                    <button
                      className="sidebar__item sidebar__item--disabled"
                      type="button"
                      disabled
                    >
                      <span className="sidebar__icon">{item.icon}</span>
                      <span>{item.label}</span>
                    </button>
                  </li>
                );
              }

              return (
                <Fragment key={item.label}>
                  <li>
                    <Link
                      className={`sidebar__item ${
                        isActive ? "sidebar__item--active" : ""
                      }`}
                      href={item.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <span className="sidebar__icon">{item.icon}</span>
                      <span>{item.label}</span>
                    </Link>
                  </li>

                  {item.label === "Search" && isReaderPage && (
                    <li>
                      <div
                        className="sidebar__font-controls"
                        aria-label="Reader font size"
                      >
                        {[14, 18, 22, 26].map((size) => (
                          <button
                            key={size}
                            type="button"
                            className={`sidebar__font-button ${
                              fontSize === size
                                ? "sidebar__font-button--active"
                                : ""
                            }`}
                            aria-label={`${
                              size === 14
                                ? "Small"
                                : size === 18
                                  ? "Medium"
                                  : size === 22
                                    ? "Large"
                                    : "Extra-large"
                            } font size`}
                            aria-pressed={fontSize === size}
                            onClick={() => dispatch(setFontSize(size))}
                          >
                            <span style={{ fontSize: `${size}px` }}>Aa</span>
                          </button>
                        ))}
                      </div>
                    </li>
                  )}
                </Fragment>
              );
            })}
          </ul>
          <ul className="sidebar__list sidebar__list--bottom">
            {bottomSidebarItems.map((item) => {
              const isActive =
                item.href !== undefined &&
                (pathname === item.href ||
                  pathname.startsWith(`${item.href}/`));

              return (
                <li key={item.label}>
                  {item.href ? (
                    <Link
                      className={`sidebar__item ${
                        isActive ? "sidebar__item--active" : ""
                      }`}
                      href={item.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <span className="sidebar__icon">{item.icon}</span>
                      <span>{item.label}</span>
                    </Link>
                  ) : (
                    <button
                      className="sidebar__item sidebar__item--disabled"
                      type="button"
                      disabled
                    >
                      <span className="sidebar__icon">{item.icon}</span>
                      <span>{item.label}</span>
                    </button>
                  )}
                </li>
              );
            })}

            <li>
              {isAuthLoading ? (
                <button
                  className="sidebar__item sidebar__item--disabled"
                  type="button"
                  disabled
                >
                  <span className="sidebar__icon">
                    <FiLogIn />
                  </span>

                  <span>Loading...</span>
                </button>
              ) : user ? (
                <button
                  className="sidebar__item"
                  type="button"
                  onClick={handleLogout}
                >
                  <span className="sidebar__icon">
                    <FiLogIn />
                  </span>

                  <span>Logout</span>
                </button>
              ) : (
                <button
                  className="sidebar__item"
                  type="button"
                  onClick={() => dispatch(openLoginModal())}
                >
                  <span className="sidebar__icon">
                    <FiLogIn />
                  </span>

                  <span>Login</span>
                </button>
              )}
            </li>
          </ul>
        </nav>
      </aside>
    </>
  );
}
