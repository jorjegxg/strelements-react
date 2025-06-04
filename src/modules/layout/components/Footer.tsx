import { colors2 } from "../../../shared/utils/colors";

const Footer = () => {
  return (
    <footer
      className="footer sm:footer-horizontal flex justify-center items-center p-4"
      style={{ background: colors2.background }}
    >
      <aside
        className="grid-flow-col items-center "
        style={{ color: colors2.kick }}
      >
        <svg
          width="36"
          height="36"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          fillRule="evenodd"
          clipRule="evenodd"
          className="fill-current"
        >
          <path d="M22.672 15.226l-2.432.811.841 2.515c.33 1.019-.209 2.127-1.23 2.456-1.15.325-2.148-.321-2.463-1.226l-.84-2.518-5.013 1.677.84 2.517c.391 1.203-.434 2.542-1.831 2.542-.88 0-1.601-.564-1.86-1.314l-.842-2.516-2.431.809c-1.135.328-2.145-.317-2.463-1.229-.329-1.018.211-2.127 1.231-2.456l2.432-.809-1.621-4.823-2.432.808c-1.355.384-2.558-.59-2.558-1.839 0-.817.509-1.582 1.327-1.846l2.433-.809-.842-2.515c-.33-1.02.211-2.129 1.232-2.458 1.02-.329 2.13.209 2.461 1.229l.842 2.515 5.011-1.677-.839-2.517c-.403-1.238.484-2.553 1.843-2.553.819 0 1.585.509 1.85 1.326l.841 2.517 2.431-.81c1.02-.33 2.131.211 2.461 1.229.332 1.018-.21 2.126-1.23 2.456l-2.433.809 1.622 4.823 2.433-.809c1.242-.401 2.557.484 2.557 1.838 0 .819-.51 1.583-1.328 1.847m-8.992-6.428l-5.01 1.675 1.619 4.828 5.011-1.674-1.62-4.829z"></path>
        </svg>
        <p>Copyright © {new Date().getFullYear()} - All right reserved</p>

        <Socials />
      </aside>
    </footer>
  );
};

const Socials = () => {
  return (
    <footer className="footer footer-center p-4 bg-neutral text-neutral-content">
      <div className="flex gap-4">
        <a
          href="https://www.instagram.com/strelements/"
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-primary btn-outline flex items-center gap-2"
          aria-label="Instagram"
        >
          {/* Icon Instagram */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M7.75 2h8.5A5.75 5.75 0 0122 7.75v8.5A5.75 5.75 0 0116.25 22h-8.5A5.75 5.75 0 012 16.25v-8.5A5.75 5.75 0 017.75 2zm0 1.5A4.25 4.25 0 003.5 7.75v8.5A4.25 4.25 0 007.75 20.5h8.5a4.25 4.25 0 004.25-4.25v-8.5A4.25 4.25 0 0016.25 3.5h-8.5zM12 7a5 5 0 110 10 5 5 0 010-10zm0 1.5a3.5 3.5 0 100 7 3.5 3.5 0 000-7zm4.75-.75a1.25 1.25 0 110 2.5 1.25 1.25 0 010-2.5z" />
          </svg>
          Instagram
        </a>

        <a
          href="https://www.youtube.com/@strelements"
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-error btn-outline flex items-center gap-2"
          aria-label="YouTube"
        >
          {/* Icon YouTube corectat */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M23.498 6.186a2.994 2.994 0 00-2.104-2.116C19.796 3.5 12 3.5 12 3.5s-7.796 0-9.394.57a2.995 2.995 0 00-2.104 2.116A31.096 31.096 0 000 12a31.096 31.096 0 00.502 5.814 2.995 2.995 0 002.104 2.116C4.204 20.5 12 20.5 12 20.5s7.796 0 9.394-.57a2.994 2.994 0 002.104-2.116A31.097 31.097 0 0024 12a31.097 31.097 0 00-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
          </svg>
          YouTube
        </a>
      </div>
    </footer>
  );
};

export default Footer;
