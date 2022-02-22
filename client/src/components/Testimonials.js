import React from "react";
import christina from "./assets/christina.jpg";
import linda from "./assets/linda.jpg";
import alex from "./assets/alex.jpg";

export const Testimonials = () => {
  return (
    <div>
      <section class="text-gray-600 body-font ">
        <div class="container px-5 py-24 mx-auto">
          <div class="flex flex-wrap -m-4">
            <div class="lg:w-1/3 lg:mb-0 mb-6 p-4">
              <div class="h-full text-center">
                <img
                  alt="testimonial"
                  class="w-20 h-20 mb-8 object-cover object-center rounded-full inline-block border-2 border-gray-200 bg-gray-100"
                  src={christina}
                />
                <p class="leading-relaxed">
                  Very reasonable rental fees and reliable vehicles.
                </p>
                <span class="inline-block h-1 w-10 rounded bg-indigo-500 mt-6 mb-4"></span>
                <h2 class="text-gray-900 font-medium title-font tracking-wider text-sm">
                  Christina H
                </h2>
                <p class="text-gray-500">Travel Blogger</p>
              </div>
            </div>
            <div class="lg:w-1/3 lg:mb-0 mb-6 p-4">
              <div class="h-full text-center">
                <img
                  alt="testimonial"
                  class="w-20 h-20 mb-8 object-cover object-center rounded-full inline-block border-2 border-gray-200 bg-gray-100"
                  src={alex}
                />
                <p class="leading-relaxed">
                  I appreciete the flexibility this service provides for renting
                  vehicles at the last minute. Great selection at great prices.
                </p>
                <span class="inline-block h-1 w-10 rounded bg-indigo-500 mt-6 mb-4"></span>
                <h2 class="text-gray-900 font-medium title-font tracking-wider text-sm">
                  Alex S.
                </h2>
                <p class="text-gray-500">Sales Representative</p>
              </div>
            </div>
            <div class="lg:w-1/3 lg:mb-0 p-4">
              <div class="h-full text-center">
                <img
                  alt="testimonial"
                  class="w-20 h-20 mb-8 object-cover object-center rounded-full inline-block border-2 border-gray-200 bg-gray-100"
                  src={linda}
                />
                <p class="leading-relaxed">
                  Have been renting here for a number of months now. No
                  complaints.{" "}
                </p>
                <span class="inline-block h-1 w-10 rounded bg-indigo-500 mt-6 mb-4"></span>
                <h2 class="text-gray-900 font-medium title-font tracking-wider text-sm">
                  Linda M.
                </h2>
                <p class="text-gray-500">Engineer</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
