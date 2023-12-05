import React, { useState, useEffect } from "react";
import { classNames } from "../../utilities/utils";

export default function LoginForm({ styles }) {
  return (
    <div
      className={classNames(
        ...styles,
        " bg-gray-200 rounded-md bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-70 border border-gray-100 "
      )}
    >
      <div className="flex flex-col items-center px-6 py-8 mx-auto lg:py-0 ">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
            Sign in to your account
          </h1>

          <form className="space-y-4 md:space-y-6" action="#">
            <div>
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Your email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                required
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                className="bg-gray-50 border border-gray-300 text-gray-900  rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                required=""
              />
            </div>

            <div>
              <div className="flex flex-col items-end justify-between">
                <a
                  href="#"
                  className="text-sm font-medium text-primary-600 hover:underline"
                >
                  Forgot password?
                </a>
              </div>
            </div>

            <button
              type="submit"
              className="w-full text-center text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5"
            >
              Sign in
            </button>

            <p className="text-sm font-light text-black-100">
              Dont't have an account yet?{" "}
              <a className="font-medium text-blue-600 hover:underline" href="#">
                Sign up
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
