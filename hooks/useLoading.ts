import { useState, useCallback } from "react";
import {
  LoadingState,
  LoadingType,
  SetLoadingParams,
} from "@/types/loading.type";

export const DEFAULT_LOADING_STATE: LoadingState = {
  show: false,
  message: "",
  type: "idle",
};

export type UseLoadingTuple = [
  LoadingState,
  (
    params: boolean | SetLoadingParams,
    message?: string,
    type?: LoadingType
  ) => void,
  () => void
];

export type UseLoadingReturn = UseLoadingTuple & {
  loading: LoadingState;
  setLoading: (
    params: boolean | SetLoadingParams,
    message?: string,
    type?: LoadingType
  ) => void;
  handleResetLoading: () => void;
  startLoading: (message?: string) => void;
  setSuccess: (message?: string) => void;
  setError: (message?: string) => void;
};

export default function useLoading(
  initialState?: Partial<LoadingState>
): UseLoadingReturn {
  const [loading, setLoadingState] = useState<LoadingState>(() => ({
    ...DEFAULT_LOADING_STATE,
    ...initialState,
  }));

  const handleSetLoading = useCallback(
    (
      params: boolean | SetLoadingParams,
      message?: string,
      type?: LoadingType
    ) => {
      if (typeof params === "boolean") {
        setLoadingState({
          show: params,
          message: message ?? (params ? "Memuat..." : ""),
          type: type ?? (params ? "loading" : "idle"),
        });
      } else {
        setLoadingState((prev) => ({
          ...prev,
          ...params,
          show: params.show ?? true,
          message: params.message ?? prev.message,
          type: params.type ?? prev.type,
        }));
      }
    },
    []
  );

  const handleResetLoading = useCallback(() => {
    setLoadingState(DEFAULT_LOADING_STATE);
  }, []);

  const startLoading = useCallback(
    (message = "Memuat data...") => {
      handleSetLoading({ show: true, message, type: "loading" });
    },
    [handleSetLoading]
  );

  const setSuccess = useCallback(
    (message = "Berhasil!") => {
      handleSetLoading({ show: true, message, type: "success" });
    },
    [handleSetLoading]
  );

  const setError = useCallback(
    (message = "Terjadi kesalahan") => {
      handleSetLoading({ show: true, message, type: "error" });
    },
    [handleSetLoading]
  );

  const returnValue = [
    loading,
    handleSetLoading,
    handleResetLoading,
  ] as unknown as UseLoadingReturn;

  returnValue.loading = loading;
  returnValue.setLoading = handleSetLoading;
  returnValue.handleResetLoading = handleResetLoading;
  returnValue.startLoading = startLoading;
  returnValue.setSuccess = setSuccess;
  returnValue.setError = setError;

  return returnValue;
}
