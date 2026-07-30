"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FiBookOpen,
  FiHelpCircle,
  FiHome,
  FiLogIn,
  FiSearch,
  FiSettings,
  FiStar,
} from "react-icons/fi";
import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";

import { openLoginModal } from "@/app/features/auth/authSlice";
import { auth } from "@/lib/firebase";
import { useAppDispatch, useAppSelector } from "@/app/store/hooks";

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
    icon: <FiSearch />,
  },
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

  const { user, isAuthLoading } = useAppSelector((state) => state.auth);
  const pathname = usePathname();

  async function handleLogout() {
    try {
      await signOut(auth);
      router.push("/");
    } catch (error) {
      console.error("Unable to sign out:", error);
    }
  }

  return (
    <aside className="sidebar">
      <div className="sidebar__logo">
        <Link href="/for-you">Summarist</Link>
      </div>

      <nav aria-label="Main navigation">
        <ul className="sidebar__list">
          {sidebarItems.map((item) => {
            const isActive =
              item.href !== undefined &&
              (pathname === item.href || pathname.startsWith(`${item.href}/`));

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
              <li key={item.label}>
                <Link
                  className={`sidebar__item ${
                    isActive ? "sidebar__item--active" : ""
                  }`}
                  href={item.href}
                >
                  <span className="sidebar__icon">{item.icon}</span>
                  <span>{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
        <ul className="sidebar__list">
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
  );
}
