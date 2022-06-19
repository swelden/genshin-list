const Footer = () => {
  return (
    <footer className="container mt-auto flex flex-col items-center justify-center gap-2 border-t border-zinc-400 px-4 py-6 text-center text-sm text-zinc-700 dark:border-zinc-700 dark:text-zinc-300">
      <p className="">
        <strong>Genshin List</strong> is not affiliated with or endorsed by
        HoYoverse.
      </p>
      <p>
        Designed & Developed by <br className="sm:hidden" />
        swelden -{" "}
        <a
          href="https://github.com/swelden/genshin-list"
          rel="noopener noreferrer"
          target="_blank"
          className="text-blue-600 dark:text-blue-400"
        >
          GitHub
        </a>
      </p>
    </footer>
  );
};

export default Footer;
