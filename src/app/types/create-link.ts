export interface CreateLinkReturnData {
  data: {
    shortUrl: any;
    link: FormDataEntryValue | null;
    created: boolean;
    update: boolean;
  } | null;
  error?: CreateLinkReturnError;
  status: "SUCCESS" | "ERROR" | "IDLE";
}

export type CreateLinkReturnError =
  | "alias_exists"
  | "invalid_alias"
  | "invalid_url"
  | "invalid_title"
  | "invalid_description"
  | "invalid_formdata";
