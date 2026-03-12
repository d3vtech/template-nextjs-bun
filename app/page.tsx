import { config } from '@/config';

import styles from './page.module.css';

export default function HomePage(): React.JSX.Element {
  return (
    <main className={styles.container}>
      <h1 className={styles.title}>{config.appName}</h1>
      <p className={styles.subtitle}>Environment: {config.environment}</p>
    </main>
  );
}
