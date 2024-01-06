
import  React from "react";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";
import Chatbot from "@/app/Components/Chatbot/Chatbot";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

const Home = () => {

  return (
    <div className={styles.App}>
      <Chatbot/>
    </div>
  );
};

export default Home;


// export async function getStaticProps({ locale }: any) {
//   return {
//     props: {
//       ...(await serverSideTranslations(locale, ["common"])),
//     },
//   };
// }
