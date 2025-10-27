
import UserNavbar from "../components/UserComponents/UserNavbar";
import styles from "./UserLayout.module.css";
import About from "../components/UserComponents/About";
export default function UserLayout() {
  return (
    <div className={styles.userContainer}>
      <UserNavbar />
      <main className={styles.userMain}>
        <About />
      </main>
    </div>
  );
}
