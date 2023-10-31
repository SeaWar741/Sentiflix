import React from 'react';
import Link from 'next/link';

interface ButtonProps {
  children: React.ReactNode;
  href: string;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({ children, href, className }) => {
  return (
    <Link href={href} passHref>
      <button className={className}>
        {children}
      </button>
    </Link>
  );
};

export default Button;
