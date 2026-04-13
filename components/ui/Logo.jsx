import Link from "next/link";

const Logo = () => {
  return (
    <Link href="/" passHref>
      <a>
        <span className="text-[2rem] font-dancing font-bold cursor-pointer">
          Feane
        </span>
      </a>
    </Link>
  );
};

export default Logo;
