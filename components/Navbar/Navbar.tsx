"use client";
import { Fragment, ReactElement, useState } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useAuth } from "./auth-provider";

function classNames(...classes: (string | boolean)[]): string {
  return classes.filter(Boolean).join(" ");
}

export default function Navbar(): ReactElement {
  const [activeTab, setActiveTab] = useState(1);

  const pathName = usePathname();
  const auth = useAuth();

  const isAdminPage = pathName?.includes("/admin");
  const isProPage = pathName?.includes("/pro");
  const isUserPage = pathName?.includes("/user");

  const loginGoogle = () => {
    auth
      ?.loginGoogle()
      .then(() => {
        console.log("Logged In");
      })
      .catch(() => {
        console.log("Something went wrong");
      });
  };

  const logout = () => {
    auth
      ?.logout()
      .then(() => {
        console.log("Logged out");
      })
      .catch(() => {
        console.log("Something went wrong");
      });
  };

  return (
    <Disclosure as="nav" className="bg-gray-700 w-full fixed top-0 ">
      {({ open }): ReactElement => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex flex-shrink-0 items-center">
                  <img
                    className="h-8 w-auto"
                    src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                    alt="Your Company"
                  />
                </div>
                {!auth?.currentUser && (
                  <Disclosure.Button
                    onClick={loginGoogle}
                    key={2}
                    className={` "rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"`}
                  >
                    Login with google
                  </Disclosure.Button>
                )}
                {auth?.currentUser && (
                  <Disclosure.Button
                    onClick={logout}
                    key={2}
                    className={` "rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"`}
                  >
                    Logout
                  </Disclosure.Button>
                )}

                {auth?.currentUser && (
                  <div className="mr-12">
                    <p className="text-white text-sm font-semibold">
                      {auth.currentUser.displayName}
                    </p>
                    <p className="text-gray-400 text-sm font-semibold">
                      {auth.currentUser.email}
                    </p>
                  </div>
                )}

                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-4">
                    {(!isUserPage || !isProPage || !isAdminPage) && (
                      <Link
                        onClick={() => setActiveTab(1)}
                        key={1}
                        href={"/"}
                        className={` "rounded-md px-3 py-2 text-sm font-medium" ${
                          activeTab === 1
                            ? "bg-gray-900 text-white"
                            : "text-gray-300 hover:bg-gray-700 hover:text-white"
                        }`}
                        aria-current={activeTab === 1 ? "page" : undefined}
                      >
                        Home
                      </Link>
                    )}

                    {!isUserPage && (
                      <Link
                        onClick={() => setActiveTab(2)}
                        key={2}
                        href={"/user"}
                        className={` "rounded-md px-3 py-2 text-sm font-medium" ${
                          activeTab === 2
                            ? "bg-gray-900 text-white"
                            : "text-gray-300 hover:bg-gray-700 hover:text-white"
                        }`}
                        aria-current={activeTab === 1 ? "page" : undefined}
                      >
                        Go To User
                      </Link>
                    )}
                    {!isProPage && (
                      <Link
                        onClick={() => setActiveTab(3)}
                        key={3}
                        href={"/pro"}
                        className={` "rounded-md px-3 py-2 text-sm font-medium" ${
                          activeTab === 3
                            ? "bg-gray-900 text-white"
                            : "text-gray-300 hover:bg-gray-700 hover:text-white"
                        }`}
                        aria-current={activeTab === 1 ? "page" : undefined}
                      >
                        Go To Pro
                      </Link>
                    )}
                    {!isAdminPage && (
                      <Link
                        onClick={() => setActiveTab(4)}
                        key={4}
                        href={"/admin"}
                        className={` "rounded-md px-3 py-2 text-sm font-medium" ${
                          activeTab === 4
                            ? "bg-gray-900 text-white"
                            : "text-gray-300 hover:bg-gray-700 hover:text-white"
                        }`}
                        aria-current={activeTab === 4 ? "page" : undefined}
                      >
                        Go To Admin
                      </Link>
                    )}
                  </div>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                <Menu as="div" className="relative ml-3">
                  <div>
                    <Menu.Button className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                      <span className="absolute -inset-1.5" />
                      <span className="sr-only">Open user menu</span>
                      <img
                        className="h-8 w-8 rounded-full"
                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                        alt=""
                      />
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            className={classNames(
                              active ? "bg-gray-100" : "",
                              "block px-4 py-2 text-sm text-gray-700"
                            )}
                          >
                            Your Profile
                          </a>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            className={classNames(
                              active ? "bg-gray-100" : "",
                              "block px-4 py-2 text-sm text-gray-700"
                            )}
                          >
                            Settings
                          </a>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            className={classNames(
                              active ? "bg-gray-100" : "",
                              "block px-4 py-2 text-sm text-gray-700"
                            )}
                          >
                            Sign out
                          </a>
                        )}
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              <Disclosure.Button
                as="a"
                onClick={() => setActiveTab(1)}
                key={1}
                href={"/"}
                className={` "rounded-md px-3 py-2 text-sm font-medium" ${
                  activeTab === 1
                    ? "bg-gray-900 text-white"
                    : "text-gray-300 hover:bg-gray-700 hover:text-white"
                }`}
                aria-current={activeTab === 1 ? "page" : undefined}
              >
                Home
              </Disclosure.Button>

              {isUserPage && (
                <Disclosure.Button
                  as="a"
                  onClick={() => setActiveTab(2)}
                  key={2}
                  href={"/user"}
                  className={` "rounded-md px-3 py-2 text-sm font-medium" ${
                    activeTab === 2
                      ? "bg-gray-900 text-white"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white"
                  }`}
                  aria-current={activeTab === 1 ? "page" : undefined}
                >
                  User
                </Disclosure.Button>
              )}
              {isProPage && (
                <Disclosure.Button
                  as="a"
                  onClick={() => setActiveTab(3)}
                  key={3}
                  href={"/pro"}
                  className={` "rounded-md px-3 py-2 text-sm font-medium" ${
                    activeTab === 3
                      ? "bg-gray-900 text-white"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white"
                  }`}
                  aria-current={activeTab === 1 ? "page" : undefined}
                >
                  Pro
                </Disclosure.Button>
              )}
              {isAdminPage && (
                <Disclosure.Button
                  as="a"
                  onClick={() => setActiveTab(4)}
                  key={4}
                  href={"/admin"}
                  className={` "rounded-md px-3 py-2 text-sm font-medium" ${
                    activeTab === 4
                      ? "bg-gray-900 text-white"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white"
                  }`}
                  aria-current={activeTab === 4 ? "page" : undefined}
                >
                  Admin
                </Disclosure.Button>
              )}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
