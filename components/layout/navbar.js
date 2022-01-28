import Link from "next/link";
import styles from "./navbar.module.css";

function NavBar() {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Link href="/">EventsDemo</Link>
      </div>

      <nav className={styles.navigation}>
        <ul>
          <li>
            <Link href="/events">Browse All Events</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default NavBar;
