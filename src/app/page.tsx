"use client";

// ts-ignore because experimental_useFormStatus is not in the types
// @ts-ignore
import { experimental_useFormState as useFormStateNew } from "react-dom";
import type { useFormState } from "react-dom";

import styles from "./page.module.css";
import submitLink from "./utils/actions/submit-link";
import type {
  CreateLinkReturnData,
  CreateLinkReturnError,
} from "./types/create-link";
import { SuccessState } from "./components/SuccessState";
import { InputForm } from "./components/InputForm";

const initialState: CreateLinkReturnData = {
  data: null,
  status: "IDLE",
};

export default function Home() {
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
            {isSuccess && <SuccessState {...state} />}
          </form>
        </div>
      </div>
    </main>
  );
}
