export default function Footer() {
  return (
    <footer className="px-6 py-4 text-sm text-center bg-dark text-secondary">
      &copy; {new Date().getFullYear()} Northern Yetis FC. All rights reserved.
      <br />
  <span className="italic text-muted"><span className="font-light">Developed by: </span><a className="hover:text-indigo-400" href="https://www.facebook.com/ashish.thapa.1213/" target="_blank">Ashish Thapa</a> </span>
    </footer>
  );
}
