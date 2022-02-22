import React from "react";

const Footer = () => {
  return (
    <div>
      <footer class="text-gray-600 body-font p-10 ">
        <div class="container px-5 py-24 mx-auto">
          <div class="flex flex-wrap md:text-left text-center -mb-10 mx-4">
            <div class="lg:w-1/4 md:w-1/2 w-full px-4">
              <h2 class="title-font font-medium text-gray-900 tracking-widest text-sm mb-3">
                Sales Support
              </h2>
              <nav class="list-none mb-10">
                <li>
                  <a class="text-gray-600 hover:text-gray-800">
                    1 (432) 342-3456
                  </a>
                </li>
                <li>
                  <a class="text-gray-600 hover:text-gray-800">
                    Toll Free 1 (800) 123-4567
                  </a>
                </li>
                <li>
                  <a class="text-gray-600 hover:text-gray-800">
                    sales@rentmycar.com
                  </a>
                </li>
              </nav>
            </div>
            <div class="lg:w-1/4 md:w-1/2 w-full px-4">
              <h2 class="title-font font-medium text-gray-900 tracking-widest text-sm mb-3">
                Locations
              </h2>
              <nav class="list-none mb-10">
                <li>
                  <a class="text-gray-600 hover:text-gray-800">Seattle, WA</a>
                </li>
                <li>
                  <a class="text-gray-600 hover:text-gray-800">Portland, OR</a>
                </li>
                <li>
                  <a class="text-gray-600 hover:text-gray-800">Phoenix, AZ</a>
                </li>
                <li>
                  <a class="text-gray-600 hover:text-gray-800">
                    San Francisco, CA
                  </a>
                </li>
              </nav>
            </div>
            <div class="lg:w-1/4 md:w-1/2 w-full px-4">
              <h2 class="title-font font-medium text-gray-900 tracking-widest text-sm mb-3">
                Social
              </h2>
              <nav class="list-none mb-10">
                <li>
                  <a class="text-gray-600 hover:text-gray-800">Twitter</a>
                </li>
                <li>
                  <a class="text-gray-600 hover:text-gray-800">Instagram</a>
                </li>
                <li>
                  <a class="text-gray-600 hover:text-gray-800">Facebook</a>
                </li>
                <li>
                  <a class="text-gray-600 hover:text-gray-800">Linkedin</a>
                </li>
              </nav>
            </div>
            <div class="lg:w-1/4 md:w-1/2 w-full px-4">
              <h2 class="title-font font-medium text-gray-900 tracking-widest text-sm mb-3">
                Technical Support
              </h2>
              <nav class="list-none mb-10">
                <li>
                  <a class="text-gray-600 hover:text-gray-800">
                    1 (432) 342-3456
                  </a>
                </li>
                <li>
                  <a class="text-gray-600 hover:text-gray-800">
                    Toll Free 1 (800) 333 -4567
                  </a>
                </li>
                <li>
                  <a class="text-gray-600 hover:text-gray-800">
                    @TechRentalSupport on Twitter
                  </a>
                </li>
                <li>
                  <a class="text-gray-600 hover:text-gray-800">
                    techsupport@rentmycar.com
                  </a>
                </li>
              </nav>
            </div>
          </div>
        </div>
        <div class="border-t border-gray-200">
          <div class="container px-5 py-8 flex flex-wrap mx-auto items-center">
            <div class="flex md:flex-nowrap flex-wrap justify-center items-end md:justify-start">
              <div class="relative sm:w-64 w-40 sm:mr-4 mr-2">
                <label
                  for="footer-field"
                  class="leading-7 text-sm text-gray-600"
                >
                  Subscribe To Our Newsletter
                </label>
                <input
                  type="text"
                  id="footer-field"
                  name="footer-field"
                  class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:ring-2 focus:bg-transparent focus:ring-indigo-200 focus:border-indigo-500 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>
              <button class="inline-flex text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded">
                Submit
              </button>
              <p class="text-gray-500 text-sm md:ml-6 md:mt-0 mt-2 sm:text-left text-center">
                Stay updated with latest
                <div class="lg:block hidden">rental tips and strategies.</div>
              </p>
            </div>
            <span class="inline-flex lg:ml-auto lg:mt-0 mt-6 w-full justify-center md:justify-start md:w-auto">
              
            </span>
          </div>
        </div>
        <div class="bg-gray-100">
          <div class="container mx-auto py-4 px-5 flex flex-wrap flex-col sm:flex-row">
            <p class="text-gray-500 text-sm text-center sm:text-left">
              © 2022 SoloProject —
              <a
                href="https://twitter.com/knyttneve"
                class="text-gray-600 ml-1"
                target="_blank"
                rel="noopener noreferrer"
              >
                @suhrobh1
              </a>
            </p>
            <span class="sm:ml-auto sm:mt-0 mt-2 sm:w-auto w-full sm:text-left text-center text-gray-500 text-sm">
              Solo Project
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
