import React from "react";
import { useAuth } from "../../contexts/AuthContext";
import { Link } from "react-router-dom";
import { classNames } from "../inputs/TextInput";
import { Disclosure, Transition } from "@headlessui/react";
import AuthButton from "../AuthButton/AuthButton";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { useNavigation } from "../../contexts/NavigationContext";
import logo from "../../assets/react.svg";

export default function NavBar() {
  const { isAuthenticated, user, isLoading } = useAuth();

  const { navigation, handleNavigationClick } = useNavigation();

  function generateNavLink() {
    return navigation.map((item) => (
      <Link
        key={item.name}
        to={item.href}
        onClick={() => handleNavigationClick(item.name)}
        className={classNames(
          item.current
            ? "bg-Beige text-black shadow-md"
            : "text-white hover:text-Beige hover:bg-Beige hover:bg-opacity-25",
          "rounded-md p-3 text-sm font-medium"
        )}
        aria-current={item.current ? "page" : undefined}
      >
        {item.name}
      </Link>
    ));
  }

  return (
    <header>
      <Disclosure as="nav" className="bg-Teal-Strong">
        {({ open }) => (
          <>
            <div className="mx-auto max-w-8xl px-2 sm:px-6">
              <div className="relative flex h-16 items-center justify-between">
                <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                  {/* Mobile menu button*/}
                  <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md text-white hover:bg-Beige hover:text-black focus:ring-inset focus:ring-white">
                    {open ? (
                      <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
                {/* navbar middle contents*/}
                <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                  {/* logo container*/}
                  <div className="flex flex-shrink-0 item-center">
                    <img src={logo} alt="My app logo" className="h-10 w-auto" />
                  </div>

                  <div className="hidden sm:ml-6 sm:block">
                    {/* list of all link in the navbar */}
                    <div className="flex space-x-4">{generateNavLink()}</div>
                  </div>
                </div>

                <div className=" right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                  <AuthButton />
                </div>
              </div>
            </div>

            <Disclosure.Panel className="sm:hidden">
              <div className="space-y-1 px-2 pb-3 pt-2">
                {navigation.map((item) => (
                  <Disclosure.Button
                    key={item.name}
                    as="a"
                    href={item.href}
                    className={classNames(
                      item.current
                        ? "bg-Beige text-black shadow-md"
                        : "text-white hover:bg-Beige hover:bg-opacity-25 hover:text-Beige",
                      "block rounded-md px-3 py-2 text-base font-medium"
                    )}
                    aria-current={item.current ? "page" : undefined}
                  >
                    {item.name}
                  </Disclosure.Button>
                ))}
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </header>
  );
}
