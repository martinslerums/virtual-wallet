"use client";

import {useSearchParams, usePathname} from "next/navigation";
import Link from "next/link";
import styles from "./Modal.module.css"
import CreateForm from "../Create/CreateForm";

const Modal = () => {
    const searchParams = useSearchParams();
    const modal = searchParams.get("create");
    const pathname = usePathname();

  return (  
    <>
      { modal && 
        <dialog className={styles.container}>
          <div>
            <CreateForm />
            <div className={styles.action_wrapper}>
                <Link href={pathname} className={styles.link}> Close </Link>
            </div>
          </div>
        </dialog>
      }
    </>
  );
}
 
export default Modal;