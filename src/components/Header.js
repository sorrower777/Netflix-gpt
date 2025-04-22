// const Header = () =>{
//     return (
//     <div className="bg-black">
//         <img src="https://wallpapers.com/images/hd/netflix-logo-red-background-rbt3azw93fwahji6.png" 
//         alt="Netflix Logo"
//         /> 
//   </div>
// )};

// export default Header;


// import React from 'react';

const Header = () => {
    return (
      <header className="absolute top-0 w-full z-50">
        <div className="px-4 py-4 md:px-12 flex items-center justify-between">
          <div className="flex items-center">
          <img 
            src="https://cdn.cdnlogo.com/logos/n/82/netflix.png" 
            alt="Netflix Logo"
            className="h-8 md:h-12" 
          />
          </div>
          <div className="flex space-x-4">
            <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-1 rounded text-sm md:text-base">
              Sign In
            </button>
          </div>
        </div>
      </header>
    );
  };
export default Header;