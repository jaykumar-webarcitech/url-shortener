"use client";

import { useFormState } from "react-dom";

import styles from "./page.module.css";
import submitLink from "./utils/actions/submit-link";
import type {
  CreateLinkReturnData,
  CreateLinkReturnError,
} from "./types/create-link";
import { SuccessState } from "./components/SuccessState";
import { InputForm } from "./components/InputForm";

const initialState: CreateLinkReturnData = {
  status: "IDLE",
};

export default function Home() {
  const [state, formAction] = useFormState<
    CreateLinkReturnData,
    FormData | undefined
  >(submitLink, initialState);

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
        invalid_formdata: "",
      }[state.error as CreateLinkReturnError];

  return (
    <main className={styles.main}>
      <div className={styles.formcard}>
        <div className="p-2">
          <form
            className={styles.form}
            action={(payload) => {
              formAction(payload);
            }}
          >
            {showForm && (
              <InputForm errorMessage={errorMessage} key={"INPUT_FORM"} />
            )}
            {isSuccess && <SuccessState {...state} />}
          </form>
        </div>
      </div>
    </main>
  );
}
