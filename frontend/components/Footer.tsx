import Link from "next/link";
import { useAccount } from "wagmi";

const Footer = () => {
  const { address } = useAccount();

  return (
    <footer className="footer mt-10 p-10 bg-base-200 text-base-content">
      <div>
        <img src="./logod3.jpg" alt="" width={60} />
        <p>
          Disrup3
          <br />
          El mejor bootcamp de web3 en España
        </p>
      </div>
      <div>
        <span className="footer-title">Marketplace</span>
        <Link href="/">
          <p className="link link-hover">Homepage</p>
        </Link>
        <Link href="/explore">
          <p className="link link-hover">Explore</p>
        </Link>
        <Link href={`/user/${address}`}>
          <p className="link link-hover">User</p>
        </Link>
        <Link href={`/collection/0x49cF6f5d44E70224e2E23fDcdd2C053F30aDA28B`}>
          <p className="link link-hover">Collections</p>
        </Link>
      </div>
      <div>
        <span className="footer-title">Company</span>
        <p className="link link-hover">Bootcamp web3</p>
        <p className="link link-hover">Bootcamp Fullstack</p>
      </div>
      <div>
        <span className="footer-title">Legal</span>
        <p className="link link-hover">Terms of use</p>
        <p className="link link-hover">Privacy</p>
      </div>
    </footer>
  );
};

export default Footer;
