import { ValidatorFn } from "@angular/forms";

export type AlertConfig = {
  type: 'alert';
  title: string;
  message: string;
};

export type ConfirmConfig = {
  type: 'confirm';
  title: string;
  message: string;
  confirmLabel: string;
};

export type PromptConfig = {
  type: 'prompt';
  title: string;
  message: string;
  confirmLabel: string;
  label?: string;
  placeholder?: string;
  initialValue?: string;
  validation?: {
    validators: Array<ValidatorFn>;
    errorMessageKeys: Record<string, string>;
  };
};

export type DialogConfig = AlertConfig | ConfirmConfig | PromptConfig;
