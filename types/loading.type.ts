export type LoadingType = "idle" | "loading" | "success" | "error";

export interface LoadingState {
  show: boolean;
  message: string;
  type: LoadingType;
}

export interface SetLoadingParams {
  show?: boolean;
  message?: string;
  type?: LoadingType;
}

