import React from "react";

interface FooterSmallProps {
  absolute?: boolean;
}

const FooterSmall: React.FC<FooterSmallProps> = (props) => {
  return (
    <>
      <footer
        className={
          (props.absolute
            ? "absolute bottom-0 w-full bg-gray-900"
            : "relative") + " pb-6"
        }
      >
        <div className="container mx-auto px-4">
          <hr className="border-b-1 mb-6 border-gray-700" />
          <div className="flex flex-wrap items-center justify-center md:justify-between">
            <div className="w-full px-4 md:w-4/12">
              <div className="py-1 text-sm font-semibold text-white">
                Copyright © {new Date().getFullYear()}{" "}
                <a
                  href="https://www.creative-tim.com"
                  className="py-1 text-sm font-semibold text-white hover:text-gray-400"
                >
                  Creative Tim
                </a>
              </div>
            </div>
            <div className="w-full px-4 md:w-8/12">
              <ul className="flex list-none flex-wrap justify-center  md:justify-end">
                <li>
                  <a
                    href="https://www.creative-tim.com"
                    className="block px-3 py-1 text-sm font-semibold text-white hover:text-gray-400"
                  >
                    Creative Tim
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.creative-tim.com/presentation"
                    className="block px-3 py-1 text-sm font-semibold text-white hover:text-gray-400"
                  >
                    About Us
                  </a>
                </li>
                <li>
                  <a
                    href="http://blog.creative-tim.com"
                    className="block px-3 py-1 text-sm font-semibold text-white hover:text-gray-400"
                  >
                    Blog
                  </a>
                </li>
                <li>
                  <a
                    href="https://github.com/creativetimofficial/argon-design-system/blob/master/LICENSE.md"
                    className="block px-3 py-1 text-sm font-semibold text-white hover:text-gray-400"
                  >
                    MIT License
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default FooterSmall;
