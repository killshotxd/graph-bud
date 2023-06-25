import { BsGithub, BsLinkedin } from "react-icons/bs";
import { SiGmail } from "react-icons/si";

const Footer = () => {
  return (
    <footer className="footer footer-center p-10 bg-base-200 text-base-content rounded">
      <div>
        <p className="text-2xl">Developed by Mohd Hassan</p>
        <p className="text-2xl">
          Visit Portfolio here :{" "}
          <a
            className="text-red-400 link-hover"
            target="_blank"
            rel="noreferrer"
            href="https://portfolio-killshotxd.vercel.app/"
          >
            LINK
          </a>
        </p>
      </div>
      <div>
        <div className="grid grid-flow-col gap-4">
          <a
            target="_blank"
            rel="noreferrer"
            href="https://www.linkedin.com/in/mohd-hassan-11707a223/"
          >
            <BsLinkedin size={25} />
          </a>
          <a
            target="_blank"
            rel="noreferrer"
            href="https://github.com/killshotxd"
          >
            <BsGithub size={25} />
          </a>

          <a
            target="_blank"
            rel="noreferrer"
            href="mailto:hassanansari211@gmail.com"
          >
            <SiGmail size={25} />
          </a>
        </div>
      </div>
      <div>
        <p>Copyright © 2023</p>
      </div>
    </footer>
  );
};

export default Footer;
