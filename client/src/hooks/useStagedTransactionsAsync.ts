import { useQuery, UseQueryResult } from "react-query";
import { STAGED_TRANSACTIONS_URL } from "../utils/config";
import api from "../utils/instance";
import { StagedTransactions, Transaction } from "../types";

type StagedTransactionResponse = {
  status: string;
  isLoading: boolean;
  isSuccess: boolean;
  stagedTransactions: Transaction[] | undefined;
  dataUpdatedAt: number | Date;
  error: any;
};
function useStagedTransactionsAsync(): StagedTransactionResponse {
  const fetcher = (): Promise<StagedTransactions> =>
    api.get(STAGED_TRANSACTIONS_URL).then((response) => response.data);
  const {
    status,
    isLoading,
    isSuccess,
    data,
    error,
    dataUpdatedAt,
  }: UseQueryResult<StagedTransactions> = useQuery<StagedTransactions>(
    STAGED_TRANSACTIONS_URL,
    fetcher,
    { refetchInterval: 1000 }
  );
  return {
    status,
    isLoading,
    isSuccess,
    error,
    stagedTransactions: data?.stagedTransactions,
    dataUpdatedAt,
  };
}

export default useStagedTransactionsAsync;

export type UseStagedTransactionsAsync = ReturnType<
  typeof useStagedTransactionsAsync
>;