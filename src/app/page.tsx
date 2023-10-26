"use client";

// ts-ignore because experimental_useFormStatus is not in the types
// @ts-ignore
import { experimental_useFormState as useFormStateNew } from "react-dom";
import type { useFormState } from "react-dom";

import Submit from "./components/submit_form";
import styles from "./page.module.css";
import submitLink from "./utils/actions/submit-link";
import type {
  CreateLinkReturnData,
  CreateLinkReturnError,
} from "./types/create-link";
import Input from "./components/input";
import {
  LinkOutlined,
  EditOutlined,
  CheckOutlined,
  CopyOutlined,
  FileDoneOutlined,
} from "@ant-design/icons";
import { useState } from "react";
import { toast } from "react-toastify";

const initialState: CreateLinkReturnData = {
  data: null,
  status: "IDLE",
};

export default function Home() {
  const [copied, setCopied] = useState(false);
  const [state, formAction]: ReturnType<
    typeof useFormState<typeof initialState, FormData>
  > = useFormStateNew(submitLink, initialState);

  const showForm = state.status === "IDLE" || state.status === "ERROR";
  const isSuccess = state.status === "SUCCESS";
  const errorMessage = !state.error
    ? undefined
    : {
        alias_exists: "Alias already exists",
        invalid_alias: "Invalid alias",
        invalid_description: "Invalid description",
        invalid_title: "Invalid title",
        invalid_url: "Please enter a valid URL",
      }[state.error as CreateLinkReturnError];

  return (
    <main className={styles.main}>
      <div className={styles.formcard}>
        <div className="p-2">
          <form className={styles.form} action={formAction}>
            {showForm && <InputForm errorMessage={errorMessage} />}
            {isSuccess && (
              <>
                <div className={styles.formSection}>
                  <Input
                    id="url"
                    name="url"
                    type="url"
                    aria-label="Long Url"
                    placeholder="Enter long link here"
                    label="Your long URL"
                    value={state.data?.link?.toString() ?? ""}
                    styles={styles}
                    disabled
                    leadingIcon={<LinkOutlined />}
                  />
                  <Input
                    id="title"
                    name="title"
                    type="text"
                    aria-label="Custom Title"
                    placeholder="Enter title"
                    label="Shortened URL"
                    value={state.data?.shortUrl?.toString() ?? ""}
                    styles={styles}
                    disabled
                    leadingIcon={<FileDoneOutlined />}
                  />
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
            )}
          </form>
        </div>
      </div>
    </main>
  );
}

function InputForm({ errorMessage }: { errorMessage?: string }) {
  return (
    <>
      <div className={styles.formSection}>
        <Input
          id="url"
          name="url"
          type="url"
          aria-label="Long Url"
          placeholder="Enter long link here"
          label="Shorten your URL"
          styles={styles}
          leadingIcon={<LinkOutlined />}
        />
        <Input
          id="title"
          name="title"
          type="text"
          aria-label="Custom Title"
          placeholder="Enter title"
          label="Customize your Link"
          styles={styles}
          leadingIcon={<EditOutlined />}
        />
        <Input
          id="description"
          name="description"
          type="text"
          aria-label="Custom Description"
          placeholder="Enter description"
          styles={styles}
        />
        <Input
          id="alias"
          name="alias"
          type="text"
          aria-label="Custom Alias"
          placeholder="Enter alias"
          styles={styles}
        />
      </div>
      {errorMessage && (
        <div className={styles.error}>
          <p>{errorMessage}</p>
        </div>
      )}
      <Submit className={styles.submit}>Shorten URL</Submit>
    </>
  );
}
