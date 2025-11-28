import SignIn from "../components/AdminComponents/AuthComponents/SignIn";
import styles from "./AuthPage.module.css";

export default function AuthPage() {
  return (
    <div className={styles.pageWrapper}>
      <div className={styles.content}>
        <h1 className={styles.heading}>Welcome Back</h1>
        <SignIn />
      </div>
    </div>
  );
}
