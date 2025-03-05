"use client"
import React, { useState, useEffect } from 'react';

const ExpandableNavbar = () => {
  const [isHovered, setIsHovered] = useState(false);
  
  const links = [
    { name: "Home", link: "/" },
    { name: "Upload File", link: "/upload" },
    { name: "All Users", link: "/getDetails" },
    { name: "Search User", link: "/searchUser" },
  ];
  
  // Calculate appropriate width based on the number of links
  const targetWidth = links.length * 120; // Each link gets 120px space
  
  // Calculate position for each link
  const getOffset = (index) => {
    const totalLinks = links.length;
    const spacing = targetWidth / totalLinks;
    return spacing * index - (targetWidth / 2) + (spacing / 2);
  };
  
  return (
    <div
      className="absolute top-0 left-1/2 z-30"
      style={{
        transform: "translateX(-50%)",
        marginTop: "10px"
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className="relative border-2 border-blue-400 rounded-2xl bg-black bg-opacity-80 backdrop-blur-md transition-all duration-300 
          shadow-lg shadow-blue-700/30 
          before:absolute before:inset-0 before:bg-gradient-to-b before:from-green-400/10 before:to-green-400/5 
          before:rounded-2xl before:opacity-50 
          after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 
          after:w-4/5 after:h-2 after:bg-green-400 after:blur-lg after:rounded-b-2xl after:opacity-30"
        style={{
          width: isHovered ? `${targetWidth}px` : '200px',
          height: '40px'
        }}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          {links.map((link, i) => (
            <a
              key={i}
              href={link.link}
              className="bg-black text-white px-3 py-1 rounded-full text-xs shadow-md hover:bg-opacity-80 absolute transition-all duration-300 hover:text-blue-400"
              style={{
                transform: isHovered
                  ? `translateX(${getOffset(i)}px)`
                  : 'translateX(0px)',
                opacity: isHovered ? 1 : 0
              }}
            >
              {link.name}
            </a>
          ))}
          
          {/* Label shown when not hovered */}
          <span 
            className="text-white text-sm font-medium transition-opacity duration-300"
            style={{ opacity: isHovered ? 0 : 1 }}
          >
            Navigation
          </span>
        </div>
      </div>
    </div>
  );
};

export default ExpandableNavbar;