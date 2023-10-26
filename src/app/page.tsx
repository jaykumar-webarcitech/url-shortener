"use client";

// ts-ignore because experimental_useFormStatus is not in the types
// @ts-ignore
import { experimental_useFormState as useFormState } from "react-dom";
import type { useFormState as useFormStateType } from "react-dom";

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
    typeof useFormStateType<CreateLinkReturnData, FormData | undefined>
  > = useFormState(submitLink, initialState);

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
          <form className={styles.form} action={formAction}>
            {showForm && <InputForm errorMessage={errorMessage} />}
            {isSuccess && (
              <SuccessState {...state} onClick={() => formAction(undefined)} />
            )}
          </form>
        </div>
      </div>
    </main>
  );
}
