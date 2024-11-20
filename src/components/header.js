import React from "react";
import Image from "next/image";
import Link from "next/link";

const Header = () => {
  const headerStyle = {
    backgroundColor: "rgb(37, 31, 31)",
    color: "white",
    padding: "0.75rem",
    textAlign: "center",
    transition: "background-color 0.3s ease-in-out",
  };

  return (
    <header className="flex flex-col items-center" style={headerStyle}>
      <div className="group">
        <Link href="/">
          <Image
            src="/logo.png"
            alt="Epicenter Logo"
            width={0}
            height={0}
            sizes="80vw"
            style={{ width: '100%', height: 'auto' }}
            priority={true}
            className="group-hover:brightness-75 transition-all duration-300"
          />
        </Link>
      </div>
    </header>
  );
};

export default Header;
