"use client";
import Submit from "./submit_form";
import styles from "@/app/page.module.css";
import Input from "./input";
import { LinkOutlined, EditOutlined } from "@ant-design/icons";

export function InputForm({ errorMessage }: { errorMessage?: string }) {
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
