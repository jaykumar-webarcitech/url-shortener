import Submit from "./submit_form";
import styles from "@/app/page.module.css";
import type { CreateLinkReturnData } from "../types/create-link";
import {
  LinkOutlined,
  CheckOutlined,
  CopyOutlined,
  FileDoneOutlined,
} from "@ant-design/icons";
import { useState } from "react";
import { toast } from "react-toastify";

export function SuccessState(state: CreateLinkReturnData) {
  const [copied, setCopied] = useState(false);
  return (
    <>
      <div className={styles.formSection}>
        <div>
          <div className={styles.label}>
            <LinkOutlined />
            <span>{"Your long URL"}</span>
          </div>
          <div className={styles.input}>
            <span>{state.data?.link?.toString() ?? ""}</span>
          </div>
        </div>

        <div>
          <div className={styles.label}>
            <FileDoneOutlined />
            <span>{"Shortened URL"}</span>
          </div>
          <div className={styles.input}>
            <span>{state.data?.shortUrl?.toString() ?? ""}</span>
          </div>
        </div>
      </div>
      <div className={styles.action}>
        <div
          className={styles.iconButton}
          onClick={() => {
            navigator.clipboard.writeText(
              state.data?.shortUrl?.toString() ?? ""
            );
            toast.success("Copied to clipboard", {
              position: "bottom-right",
              hideProgressBar: true,
              pauseOnFocusLoss: false,
            });
            // timeout to allow the user to see the checkmark
            setCopied(true);
            setTimeout(() => setCopied(false), 5000);

            // show toast
          }}
        >
          {!copied ? <CopyOutlined /> : <CheckOutlined />}
        </div>
      </div>
      <Submit type="reset" className={styles.submit}>
        Shorten Another URL
      </Submit>
    </>
  );
}
