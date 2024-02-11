import Image from "next/image";
import { Card } from "@repo/ui/card";
import { Code } from "@repo/ui/code";
import styles from "./page.module.css";
import { Button } from "@repo/ui/button";
import Room from "../components/shared/Room";
import TitleBar from "../components/shared/TitleBar";

function Gradient({
  conic,
  className,
  small,
}: {
  small?: boolean;
  conic?: boolean;
  className?: string;
}): JSX.Element {
  return (
    <span
      className={[
        styles.gradient,
        conic ? styles.glowConic : undefined,
        small ? styles.gradientSmall : styles.gradientLarge,
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    />
  );
}

export default function Page(): JSX.Element {
  return (
    <main className="flex flex-col justify-between items-center p-[6rem] min-h-[100vh]">
      <div className={`${styles.description}`}>
        <div className="flex justify-center items-center p-2 divide-x divide-gray-400">
          <span className="pr-4">Deployed On Vercel </span> {""}
          <Image
            alt="Vercel Logo"
            className={`invert pl-4`}
            height={24}
            priority
            src="/vercel.svg"
            width={100}
          />
        </div>
      </div>
      <TitleBar />
      <div className={styles.hero}>
        <div className={styles.heroContent}>
          <div className={styles.logos}>
            <div className={styles.circles}>
              <Image
                alt=""
                height={614}
                src="circles.svg"
                width={614}
                style={{ pointerEvents: "none" }}
              />
            </div>
            <div className={styles.logoGradientContainer}>
              <Gradient className={styles.logoGradient} conic small />
            </div>

            <div className={styles.logo}>
              <Image
                alt="Turborepo"
                height={120}
                priority
                src="turborepo.svg"
                width={120}
                style={{ pointerEvents: "none" }}
              />
            </div>
          </div>
          <Gradient className={styles.backgroundGradient} conic />
        </div>
      </div>

      <div className="absolute top-[50%]">
        <Room />
      </div>
    </main>
  );
}
