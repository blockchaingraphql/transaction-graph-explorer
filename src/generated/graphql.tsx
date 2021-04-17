import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
import { FieldPolicy, FieldReadFunction, TypePolicies, TypePolicy } from '@apollo/client/cache';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions =  {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The javascript `Date` as integer. Type represents date and time as number of milliseconds from start of UNIX epoch. */
  Timestamp: any;
};

export type Address = {
  __typename?: 'Address';
  coin: Coin;
  address: Scalars['String'];
  guestimatedWallet: AddressCluster;
  ohlc: PaginatedOhlcResponse;
  unconfirmedTransactions: PaginatedUnconfirmedAddressTransactionResponse;
  unconfirmedTxCount: Scalars['Int'];
  unconfirmedBalanceChange: Scalars['Float'];
  confirmedTransactions: PaginatedAddressTransactionResponse;
  balances: PaginatedAddressBalanceResponse;
};


export type AddressOhlcArgs = {
  limit?: Maybe<Scalars['Int']>;
  cursor?: Maybe<OhlcCursor>;
  interval?: Maybe<Scalars['Int']>;
};


export type AddressUnconfirmedTransactionsArgs = {
  limit?: Maybe<Scalars['Int']>;
  cursor?: Maybe<UnconfirmedAddressTransactionCursor>;
};


export type AddressConfirmedTransactionsArgs = {
  limit?: Maybe<Scalars['Int']>;
  cursor?: Maybe<AddressTransactionCursor>;
};


export type AddressBalancesArgs = {
  limit?: Maybe<Scalars['Int']>;
  cursor?: Maybe<AddressBalanceCursor>;
};

export type AddressBalance = {
  __typename?: 'AddressBalance';
  balance: Scalars['Float'];
  timestamp: Scalars['Timestamp'];
};

export type AddressBalanceChange = {
  __typename?: 'AddressBalanceChange';
  address: Address;
  balanceChange: Scalars['Float'];
};

export type AddressBalanceChangeCursor = {
  balanceChange: Scalars['Float'];
  address: Scalars['String'];
};

export type AddressBalanceCursor = {
  timestamp: Scalars['Timestamp'];
};

export type AddressCluster = {
  __typename?: 'AddressCluster';
  clusterId: Scalars['String'];
  coin: Coin;
  transactions: PaginatedClusterTransactionResponse;
  addresses: PaginatedAddressResponse;
  dailyBalanceChanges: PaginatedAddressClusterDailyBalanceChangeResponse;
  details: Maybe<AddressClusterDetails>;
};


export type AddressClusterTransactionsArgs = {
  limit?: Maybe<Scalars['Int']>;
  cursor?: Maybe<ClusterTransactionCursor>;
};


export type AddressClusterAddressesArgs = {
  limit?: Maybe<Scalars['Int']>;
  cursor?: Maybe<AddressCursor>;
};


export type AddressClusterDailyBalanceChangesArgs = {
  limit?: Maybe<Scalars['Int']>;
  cursor?: Maybe<AddressClusterDailyBalanceChangeCursor>;
};

export type AddressClusterBalanceChange = {
  __typename?: 'AddressClusterBalanceChange';
  guestimatedWallet: AddressCluster;
  balanceChange: Scalars['Float'];
};

export type AddressClusterBalanceChangeCursor = {
  balanceChange: Scalars['Float'];
  clusterId: Scalars['String'];
};

export type AddressClusterDailyBalanceChange = {
  __typename?: 'AddressClusterDailyBalanceChange';
  date: Scalars['String'];
  balanceChange: Scalars['Float'];
};

export type AddressClusterDailyBalanceChangeCursor = {
  date: Scalars['String'];
};

export type AddressClusterDetails = {
  __typename?: 'AddressClusterDetails';
  balance: Scalars['Float'];
};

export type AddressClusterRichlist = {
  __typename?: 'AddressClusterRichlist';
  cluster: AddressCluster;
  balance: Scalars['Float'];
};

export type AddressClusterRichlistCursor = {
  balance: Scalars['Float'];
  clusterId: Scalars['String'];
};

export type AddressCursor = {
  address: Scalars['String'];
};

export type AddressTransaction = {
  __typename?: 'AddressTransaction';
  timestamp: Scalars['Timestamp'];
  height: Scalars['Int'];
  txN: Scalars['Int'];
  balanceChange: Scalars['Float'];
  balanceAfterBlock: Scalars['Float'];
  confirmedTransaction: ConfirmedTransaction;
};

export type AddressTransactionCursor = {
  timestamp: Scalars['Timestamp'];
  height: Scalars['Int'];
  txN: Scalars['Int'];
};

export type Block = {
  __typename?: 'Block';
  hash: Scalars['String'];
  height: Scalars['Int'];
  size: Scalars['Int'];
  version: Maybe<Scalars['Int']>;
  versionHex: Scalars['String'];
  merkleRoot: Scalars['String'];
  time: Scalars['Timestamp'];
  medianTime: Scalars['Int'];
  nonce: Scalars['Int'];
  bits: Scalars['String'];
  difficulty: Scalars['Float'];
  chainWork: Scalars['String'];
  previousBlockHash: Scalars['String'];
  txCount: Scalars['Int'];
  coin: Coin;
  transactions: PaginatedConfirmedTransactionResponse;
};


export type BlockTransactionsArgs = {
  limit?: Maybe<Scalars['Int']>;
  cursor?: Maybe<ConfirmedTransactionCursor>;
};

export type BlockHash = {
  __typename?: 'BlockHash';
  hash: Scalars['String'];
  height: Scalars['Int'];
  coin: Coin;
  block: Block;
};

export type BlockHashCursor = {
  height: Scalars['Int'];
};

export type ClusterTransaction = {
  __typename?: 'ClusterTransaction';
  timestamp: Scalars['Timestamp'];
  height: Scalars['Int'];
  txN: Scalars['Int'];
  balanceChange: Scalars['Float'];
  confirmedTransaction: ConfirmedTransaction;
};

export type ClusterTransactionCursor = {
  timestamp: Scalars['Timestamp'];
  height: Scalars['Int'];
  txN: Scalars['Int'];
};

export type Coin = {
  __typename?: 'Coin';
  name: Scalars['String'];
  bip44_index: Scalars['Int'];
  bip44_symbol: Scalars['String'];
  date: Date;
  mempool: Mempool;
  address: Address;
  transaction: Maybe<Transaction>;
  transactionInput: Maybe<TransactionInput>;
  transactionOutput: Maybe<TransactionOutput>;
  confirmedTransaction: Maybe<ConfirmedTransaction>;
  blocks: PaginatedAddressBlockHashtResponse;
  blockByHeight: Maybe<BlockHash>;
  block: Maybe<Block>;
  clusterRichlist: PaginatedAddressClusterRichlistResponse;
};


export type CoinDateArgs = {
  date: Scalars['String'];
};


export type CoinAddressArgs = {
  address: Scalars['String'];
};


export type CoinTransactionArgs = {
  txid: Scalars['String'];
};


export type CoinTransactionInputArgs = {
  spendingIndex: Scalars['Int'];
  spendingTxid: Scalars['String'];
};


export type CoinTransactionOutputArgs = {
  n: Scalars['Int'];
  txid: Scalars['String'];
};


export type CoinConfirmedTransactionArgs = {
  tx_n: Scalars['Int'];
  height: Scalars['Int'];
};


export type CoinBlocksArgs = {
  limit?: Maybe<Scalars['Int']>;
  cursor?: Maybe<BlockHashCursor>;
};


export type CoinBlockByHeightArgs = {
  height: Scalars['Int'];
};


export type CoinBlockArgs = {
  hash: Scalars['String'];
};


export type CoinClusterRichlistArgs = {
  limit?: Maybe<Scalars['Int']>;
  cursor?: Maybe<AddressClusterRichlistCursor>;
};

export type ConfirmedTransaction = {
  __typename?: 'ConfirmedTransaction';
  height: Scalars['Int'];
  txN: Scalars['Int'];
  txid: Scalars['String'];
  coin: Coin;
  blockHash: BlockHash;
  transaction: Transaction;
};

export type ConfirmedTransactionCursor = {
  txN: Scalars['Int'];
};

export type Date = {
  __typename?: 'Date';
  coin: Coin;
  date: Scalars['String'];
  richList: PaginatedRichlistResponse;
  topGainers: PaginatedAddressBalanceChangeResponse;
  topLosers: PaginatedAddressBalanceChangeResponse;
  topClusterGainers: PaginatedAddressClusterBalanceChangeResponse;
  topClusterLosers: PaginatedAddressClusterBalanceChangeResponse;
};


export type DateRichListArgs = {
  limit?: Maybe<Scalars['Int']>;
  cursor?: Maybe<RichListCursor>;
};


export type DateTopGainersArgs = {
  limit?: Maybe<Scalars['Int']>;
  cursor?: Maybe<AddressBalanceChangeCursor>;
};


export type DateTopLosersArgs = {
  limit?: Maybe<Scalars['Int']>;
  cursor?: Maybe<AddressBalanceChangeCursor>;
};


export type DateTopClusterGainersArgs = {
  limit?: Maybe<Scalars['Int']>;
  cursor?: Maybe<AddressClusterBalanceChangeCursor>;
};


export type DateTopClusterLosersArgs = {
  limit?: Maybe<Scalars['Int']>;
  cursor?: Maybe<AddressClusterBalanceChangeCursor>;
};

export type Mempool = {
  __typename?: 'Mempool';
  coin: Coin;
  totalFees: Scalars['Float'];
  txCount: Scalars['Int'];
  transactions: PaginatedUnconfirmedTransactionResponse;
};


export type MempoolTransactionsArgs = {
  limit?: Maybe<Scalars['Int']>;
  cursor?: Maybe<UnconfirmedTransactionCursor>;
};

export type Mutation = {
  __typename?: 'Mutation';
  sendRawTransaction: SendRawTransactionResult;
};


export type MutationSendRawTransactionArgs = {
  hexString: Scalars['String'];
  coinName: Scalars['String'];
};

export type Ohlc = {
  __typename?: 'OHLC';
  open: Scalars['Float'];
  high: Scalars['Float'];
  low: Scalars['Float'];
  close: Scalars['Float'];
  timestamp: Scalars['Timestamp'];
};

export type OhlcCursor = {
  timestamp: Scalars['Timestamp'];
};

export type PaginatedAddressBalanceChangeResponse = {
  __typename?: 'PaginatedAddressBalanceChangeResponse';
  items: Array<AddressBalanceChange>;
  hasMore: Scalars['Boolean'];
};

export type PaginatedAddressBalanceResponse = {
  __typename?: 'PaginatedAddressBalanceResponse';
  items: Array<AddressBalance>;
  hasMore: Scalars['Boolean'];
};

export type PaginatedAddressBlockHashtResponse = {
  __typename?: 'PaginatedAddressBlockHashtResponse';
  items: Array<BlockHash>;
  hasMore: Scalars['Boolean'];
};

export type PaginatedAddressClusterBalanceChangeResponse = {
  __typename?: 'PaginatedAddressClusterBalanceChangeResponse';
  items: Array<AddressClusterBalanceChange>;
  hasMore: Scalars['Boolean'];
};

export type PaginatedAddressClusterDailyBalanceChangeResponse = {
  __typename?: 'PaginatedAddressClusterDailyBalanceChangeResponse';
  items: Array<AddressClusterDailyBalanceChange>;
  hasMore: Scalars['Boolean'];
};

export type PaginatedAddressClusterRichlistResponse = {
  __typename?: 'PaginatedAddressClusterRichlistResponse';
  items: Array<AddressClusterRichlist>;
  hasMore: Scalars['Boolean'];
};

export type PaginatedAddressResponse = {
  __typename?: 'PaginatedAddressResponse';
  items: Array<Address>;
  hasMore: Scalars['Boolean'];
};

export type PaginatedAddressTransactionResponse = {
  __typename?: 'PaginatedAddressTransactionResponse';
  items: Array<AddressTransaction>;
  hasMore: Scalars['Boolean'];
};

export type PaginatedClusterTransactionResponse = {
  __typename?: 'PaginatedClusterTransactionResponse';
  items: Array<ClusterTransaction>;
  hasMore: Scalars['Boolean'];
};

export type PaginatedConfirmedTransactionResponse = {
  __typename?: 'PaginatedConfirmedTransactionResponse';
  items: Array<ConfirmedTransaction>;
  hasMore: Scalars['Boolean'];
};

export type PaginatedOhlcResponse = {
  __typename?: 'PaginatedOHLCResponse';
  items: Array<Ohlc>;
  hasMore: Scalars['Boolean'];
};

export type PaginatedRichlistResponse = {
  __typename?: 'PaginatedRichlistResponse';
  items: Array<RichList>;
  hasMore: Scalars['Boolean'];
};

export type PaginatedTransactionInputResponse = {
  __typename?: 'PaginatedTransactionInputResponse';
  items: Array<TransactionInput>;
  hasMore: Scalars['Boolean'];
};

export type PaginatedTransactionOutputResponse = {
  __typename?: 'PaginatedTransactionOutputResponse';
  items: Array<TransactionOutput>;
  hasMore: Scalars['Boolean'];
};

export type PaginatedUnconfirmedAddressTransactionResponse = {
  __typename?: 'PaginatedUnconfirmedAddressTransactionResponse';
  items: Array<UnconfirmedAddressTransaction>;
  hasMore: Scalars['Boolean'];
};

export type PaginatedUnconfirmedTransactionResponse = {
  __typename?: 'PaginatedUnconfirmedTransactionResponse';
  items: Array<UnconfirmedTransaction>;
  hasMore: Scalars['Boolean'];
};

export type Query = {
  __typename?: 'Query';
  coins: Array<Coin>;
  coin: Maybe<Coin>;
};


export type QueryCoinArgs = {
  name: Scalars['String'];
};

export type RichList = {
  __typename?: 'RichList';
  address: Address;
  balance: Scalars['Float'];
  balanceChange: Scalars['Float'];
};

export type RichListCursor = {
  balanceChange: Maybe<Scalars['Float']>;
  address: Scalars['String'];
  balance: Scalars['Float'];
};

export type ScriptPubKey = {
  __typename?: 'ScriptPubKey';
  asm: Scalars['String'];
  hex: Scalars['String'];
  reqSigs: Scalars['Int'];
  type: Scalars['String'];
  addresses: Maybe<Array<Address>>;
};

export type ScriptSig = {
  __typename?: 'ScriptSig';
  asm: Scalars['String'];
  hex: Scalars['String'];
};

export type SendRawTransactionResult = {
  __typename?: 'SendRawTransactionResult';
  txid: Scalars['String'];
};


export type Transaction = {
  __typename?: 'Transaction';
  txid: Scalars['String'];
  height: Maybe<Scalars['Int']>;
  txN: Maybe<Scalars['Int']>;
  size: Scalars['Int'];
  version: Scalars['Int'];
  lockTime: Scalars['Int'];
  fee: Scalars['Float'];
  inputCount: Scalars['Int'];
  outputCount: Scalars['Int'];
  coin: Coin;
  blockHash: Maybe<BlockHash>;
  inputs: PaginatedTransactionInputResponse;
  outputs: PaginatedTransactionOutputResponse;
};


export type TransactionInputsArgs = {
  limit?: Maybe<Scalars['Int']>;
  cursor?: Maybe<TransactionInputCursor>;
};


export type TransactionOutputsArgs = {
  limit?: Maybe<Scalars['Int']>;
  cursor?: Maybe<TransactionOutputCursor>;
};

export type TransactionInput = {
  __typename?: 'TransactionInput';
  sequence: Scalars['Float'];
  txid: Maybe<Scalars['String']>;
  vout: Maybe<Scalars['Int']>;
  coinbase: Maybe<Scalars['String']>;
  scriptSig: ScriptSig;
  spendingTxid: Scalars['String'];
  spendingIndex: Scalars['Int'];
  coin: Coin;
  spentOutput: Maybe<TransactionOutput>;
  transaction: Transaction;
};

export type TransactionInputCursor = {
  spendingIndex: Scalars['Int'];
};

export type TransactionOutput = {
  __typename?: 'TransactionOutput';
  txid: Scalars['String'];
  n: Scalars['Int'];
  value: Scalars['Float'];
  scriptPubKey: ScriptPubKey;
  spendingTxid: Maybe<Scalars['String']>;
  spendingIndex: Maybe<Scalars['Int']>;
  coin: Coin;
  spendingInput: Maybe<TransactionInput>;
  transaction: Transaction;
};

export type TransactionOutputCursor = {
  n: Scalars['Int'];
};

export type UnconfirmedAddressTransaction = {
  __typename?: 'UnconfirmedAddressTransaction';
  timestamp: Scalars['Timestamp'];
  txid: Scalars['String'];
  balanceChange: Scalars['Float'];
  transaction: Transaction;
};

export type UnconfirmedAddressTransactionCursor = {
  timestamp: Scalars['Timestamp'];
  txid: Scalars['String'];
};

export type UnconfirmedTransaction = {
  __typename?: 'UnconfirmedTransaction';
  txid: Scalars['String'];
  timestamp: Scalars['Timestamp'];
  coin: Coin;
  transaction: Transaction;
};

export type UnconfirmedTransactionCursor = {
  timestamp: Scalars['Timestamp'];
  txid: Scalars['String'];
};

export type AddressOverviewQueryVariables = Exact<{
  coin: Scalars['String'];
  address: Scalars['String'];
}>;


export type AddressOverviewQuery = (
  { __typename?: 'Query' }
  & { coin: Maybe<(
    { __typename?: 'Coin' }
    & Pick<Coin, 'name'>
    & { address: (
      { __typename?: 'Address' }
      & Pick<Address, 'address' | 'unconfirmedTxCount'>
      & { coin: (
        { __typename?: 'Coin' }
        & Pick<Coin, 'name'>
      ), guestimatedWallet: (
        { __typename?: 'AddressCluster' }
        & Pick<AddressCluster, 'clusterId'>
      ) }
    ) }
  )> }
);

export type AddressTransactionsQueryVariables = Exact<{
  coin: Scalars['String'];
  address: Scalars['String'];
  cursor?: Maybe<AddressTransactionCursor>;
  limit?: Maybe<Scalars['Int']>;
}>;


export type AddressTransactionsQuery = (
  { __typename?: 'Query' }
  & { coin: Maybe<(
    { __typename?: 'Coin' }
    & Pick<Coin, 'name'>
    & { address: (
      { __typename?: 'Address' }
      & Pick<Address, 'address'>
      & { coin: (
        { __typename?: 'Coin' }
        & Pick<Coin, 'name'>
      ), confirmedTransactions: (
        { __typename?: 'PaginatedAddressTransactionResponse' }
        & { items: Array<(
          { __typename?: 'AddressTransaction' }
          & Pick<AddressTransaction, 'timestamp' | 'height' | 'txN' | 'balanceChange' | 'balanceAfterBlock'>
          & { confirmedTransaction: (
            { __typename?: 'ConfirmedTransaction' }
            & Pick<ConfirmedTransaction, 'height' | 'txN' | 'txid'>
            & { coin: (
              { __typename?: 'Coin' }
              & Pick<Coin, 'name'>
            ) }
          ) }
        )> }
      ) }
    ) }
  )> }
);

export type BlockQueryVariables = Exact<{
  coin: Scalars['String'];
  hash: Scalars['String'];
  cursor?: Maybe<ConfirmedTransactionCursor>;
  limit?: Maybe<Scalars['Int']>;
}>;


export type BlockQuery = (
  { __typename?: 'Query' }
  & { coin: Maybe<(
    { __typename?: 'Coin' }
    & Pick<Coin, 'name'>
    & { block: Maybe<(
      { __typename?: 'Block' }
      & Pick<Block, 'hash' | 'txCount'>
      & { coin: (
        { __typename?: 'Coin' }
        & Pick<Coin, 'name'>
      ), transactions: (
        { __typename?: 'PaginatedConfirmedTransactionResponse' }
        & { items: Array<(
          { __typename?: 'ConfirmedTransaction' }
          & Pick<ConfirmedTransaction, 'height' | 'txid' | 'txN'>
          & { transaction: (
            { __typename?: 'Transaction' }
            & Pick<Transaction, 'txid' | 'inputCount' | 'outputCount' | 'fee'>
            & { coin: (
              { __typename?: 'Coin' }
              & Pick<Coin, 'name'>
            ) }
          ), coin: (
            { __typename?: 'Coin' }
            & Pick<Coin, 'name'>
          ) }
        )> }
      ) }
    )> }
  )> }
);

export type AvailableCoinsQueryVariables = Exact<{ [key: string]: never; }>;


export type AvailableCoinsQuery = (
  { __typename?: 'Query' }
  & { coins: Array<(
    { __typename?: 'Coin' }
    & Pick<Coin, 'name'>
  )> }
);

export type TransactionByIdQueryVariables = Exact<{
  coin: Scalars['String'];
  txid: Scalars['String'];
}>;


export type TransactionByIdQuery = (
  { __typename?: 'Query' }
  & { coin: Maybe<(
    { __typename?: 'Coin' }
    & Pick<Coin, 'name'>
    & { transaction: Maybe<(
      { __typename?: 'Transaction' }
      & { coin: (
        { __typename?: 'Coin' }
        & Pick<Coin, 'name'>
      ), inputs: (
        { __typename?: 'PaginatedTransactionInputResponse' }
        & { items: Array<(
          { __typename?: 'TransactionInput' }
          & { spentOutput: Maybe<(
            { __typename?: 'TransactionOutput' }
            & Pick<TransactionOutput, 'txid' | 'n' | 'spendingIndex' | 'value'>
            & { scriptPubKey: (
              { __typename?: 'ScriptPubKey' }
              & { addresses: Maybe<Array<(
                { __typename?: 'Address' }
                & Pick<Address, 'address'>
                & { coin: (
                  { __typename?: 'Coin' }
                  & Pick<Coin, 'name'>
                ), guestimatedWallet: (
                  { __typename?: 'AddressCluster' }
                  & Pick<AddressCluster, 'clusterId'>
                ) }
              )>> }
            ) }
          )> }
        )> }
      ), outputs: (
        { __typename?: 'PaginatedTransactionOutputResponse' }
        & { items: Array<(
          { __typename?: 'TransactionOutput' }
          & Pick<TransactionOutput, 'value' | 'n' | 'spendingTxid' | 'spendingIndex'>
          & { scriptPubKey: (
            { __typename?: 'ScriptPubKey' }
            & { addresses: Maybe<Array<(
              { __typename?: 'Address' }
              & Pick<Address, 'address'>
              & { coin: (
                { __typename?: 'Coin' }
                & Pick<Coin, 'name'>
              ), guestimatedWallet: (
                { __typename?: 'AddressCluster' }
                & Pick<AddressCluster, 'clusterId'>
              ) }
            )>> }
          ) }
        )> }
      ) }
    )> }
  )> }
);

export type SearchNumberQueryVariables = Exact<{
  query: Scalars['Int'];
}>;


export type SearchNumberQuery = (
  { __typename?: 'Query' }
  & { coins: Array<(
    { __typename?: 'Coin' }
    & Pick<Coin, 'name'>
    & { blockByHeight: Maybe<(
      { __typename?: 'BlockHash' }
      & Pick<BlockHash, 'height' | 'hash'>
      & { coin: (
        { __typename?: 'Coin' }
        & Pick<Coin, 'name'>
      ) }
    )> }
  )> }
);

export type SearchStringQueryVariables = Exact<{
  query: Scalars['String'];
}>;


export type SearchStringQuery = (
  { __typename?: 'Query' }
  & { coins: Array<(
    { __typename?: 'Coin' }
    & Pick<Coin, 'name'>
    & { address: (
      { __typename?: 'Address' }
      & Pick<Address, 'address'>
      & { coin: (
        { __typename?: 'Coin' }
        & Pick<Coin, 'name'>
      ), balances: (
        { __typename?: 'PaginatedAddressBalanceResponse' }
        & { items: Array<(
          { __typename?: 'AddressBalance' }
          & Pick<AddressBalance, 'balance' | 'timestamp'>
        )> }
      ) }
    ), transaction: Maybe<(
      { __typename?: 'Transaction' }
      & Pick<Transaction, 'txid' | 'height'>
      & { coin: (
        { __typename?: 'Coin' }
        & Pick<Coin, 'name'>
      ) }
    )>, block: Maybe<(
      { __typename?: 'Block' }
      & Pick<Block, 'hash' | 'height'>
      & { coin: (
        { __typename?: 'Coin' }
        & Pick<Coin, 'name'>
      ) }
    )> }
  )> }
);

export type TransactionInputsQueryVariables = Exact<{
  coin: Scalars['String'];
  txid: Scalars['String'];
}>;


export type TransactionInputsQuery = (
  { __typename?: 'Query' }
  & { coin: Maybe<(
    { __typename?: 'Coin' }
    & Pick<Coin, 'name'>
    & { transaction: Maybe<(
      { __typename?: 'Transaction' }
      & Pick<Transaction, 'txid'>
      & { coin: (
        { __typename?: 'Coin' }
        & Pick<Coin, 'name'>
      ), inputs: (
        { __typename?: 'PaginatedTransactionInputResponse' }
        & { items: Array<(
          { __typename?: 'TransactionInput' }
          & Pick<TransactionInput, 'coinbase'>
          & { spentOutput: Maybe<(
            { __typename?: 'TransactionOutput' }
            & Pick<TransactionOutput, 'txid' | 'n' | 'value'>
            & { scriptPubKey: (
              { __typename?: 'ScriptPubKey' }
              & { addresses: Maybe<Array<(
                { __typename?: 'Address' }
                & Pick<Address, 'address'>
                & { coin: (
                  { __typename?: 'Coin' }
                  & Pick<Coin, 'name'>
                ), guestimatedWallet: (
                  { __typename?: 'AddressCluster' }
                  & Pick<AddressCluster, 'clusterId'>
                  & { coin: (
                    { __typename?: 'Coin' }
                    & Pick<Coin, 'name'>
                  ) }
                ) }
              )>> }
            ) }
          )> }
        )> }
      ) }
    )> }
  )> }
);

export type TransactionOutputsQueryVariables = Exact<{
  coin: Scalars['String'];
  txid: Scalars['String'];
}>;


export type TransactionOutputsQuery = (
  { __typename?: 'Query' }
  & { coin: Maybe<(
    { __typename?: 'Coin' }
    & Pick<Coin, 'name'>
    & { transaction: Maybe<(
      { __typename?: 'Transaction' }
      & Pick<Transaction, 'txid'>
      & { coin: (
        { __typename?: 'Coin' }
        & Pick<Coin, 'name'>
      ), outputs: (
        { __typename?: 'PaginatedTransactionOutputResponse' }
        & { items: Array<(
          { __typename?: 'TransactionOutput' }
          & Pick<TransactionOutput, 'value' | 'n'>
          & { spendingInput: Maybe<(
            { __typename?: 'TransactionInput' }
            & Pick<TransactionInput, 'spendingTxid' | 'spendingIndex'>
          )>, scriptPubKey: (
            { __typename?: 'ScriptPubKey' }
            & { addresses: Maybe<Array<(
              { __typename?: 'Address' }
              & Pick<Address, 'address'>
              & { coin: (
                { __typename?: 'Coin' }
                & Pick<Coin, 'name'>
              ), guestimatedWallet: (
                { __typename?: 'AddressCluster' }
                & Pick<AddressCluster, 'clusterId'>
                & { coin: (
                  { __typename?: 'Coin' }
                  & Pick<Coin, 'name'>
                ) }
              ) }
            )>> }
          ) }
        )> }
      ) }
    )> }
  )> }
);

export type TransactionById2QueryVariables = Exact<{
  coin: Scalars['String'];
  txid: Scalars['String'];
}>;


export type TransactionById2Query = (
  { __typename?: 'Query' }
  & { coin: Maybe<(
    { __typename?: 'Coin' }
    & Pick<Coin, 'name'>
    & { transaction: Maybe<(
      { __typename?: 'Transaction' }
      & Pick<Transaction, 'txid' | 'inputCount' | 'outputCount'>
      & { coin: (
        { __typename?: 'Coin' }
        & Pick<Coin, 'name'>
      ) }
    )> }
  )> }
);

export type WalletQueryVariables = Exact<{
  coin: Scalars['String'];
  address: Scalars['String'];
}>;


export type WalletQuery = (
  { __typename?: 'Query' }
  & { coin: Maybe<(
    { __typename?: 'Coin' }
    & Pick<Coin, 'name'>
    & { address: (
      { __typename?: 'Address' }
      & Pick<Address, 'address'>
      & { coin: (
        { __typename?: 'Coin' }
        & Pick<Coin, 'name'>
      ), guestimatedWallet: (
        { __typename?: 'AddressCluster' }
        & Pick<AddressCluster, 'clusterId'>
        & { details: Maybe<(
          { __typename?: 'AddressClusterDetails' }
          & Pick<AddressClusterDetails, 'balance'>
        )> }
      ) }
    ) }
  )> }
);

export type WalletAddressesQueryVariables = Exact<{
  coin: Scalars['String'];
  address: Scalars['String'];
  limit?: Maybe<Scalars['Int']>;
  cursor?: Maybe<AddressCursor>;
}>;


export type WalletAddressesQuery = (
  { __typename?: 'Query' }
  & { coin: Maybe<(
    { __typename?: 'Coin' }
    & Pick<Coin, 'name'>
    & { address: (
      { __typename?: 'Address' }
      & Pick<Address, 'address'>
      & { coin: (
        { __typename?: 'Coin' }
        & Pick<Coin, 'name'>
      ), guestimatedWallet: (
        { __typename?: 'AddressCluster' }
        & Pick<AddressCluster, 'clusterId'>
        & { addresses: (
          { __typename?: 'PaginatedAddressResponse' }
          & { items: Array<(
            { __typename?: 'Address' }
            & Pick<Address, 'address'>
            & { coin: (
              { __typename?: 'Coin' }
              & Pick<Coin, 'name'>
            ) }
          )> }
        ) }
      ) }
    ) }
  )> }
);

export type WalletTransactionsQueryVariables = Exact<{
  coin: Scalars['String'];
  address: Scalars['String'];
  limit?: Maybe<Scalars['Int']>;
  cursor?: Maybe<ClusterTransactionCursor>;
}>;


export type WalletTransactionsQuery = (
  { __typename?: 'Query' }
  & { coin: Maybe<(
    { __typename?: 'Coin' }
    & Pick<Coin, 'name'>
    & { address: (
      { __typename?: 'Address' }
      & Pick<Address, 'address'>
      & { coin: (
        { __typename?: 'Coin' }
        & Pick<Coin, 'name'>
      ), guestimatedWallet: (
        { __typename?: 'AddressCluster' }
        & Pick<AddressCluster, 'clusterId'>
        & { transactions: (
          { __typename?: 'PaginatedClusterTransactionResponse' }
          & { items: Array<(
            { __typename?: 'ClusterTransaction' }
            & Pick<ClusterTransaction, 'timestamp' | 'balanceChange'>
            & { confirmedTransaction: (
              { __typename?: 'ConfirmedTransaction' }
              & Pick<ConfirmedTransaction, 'txid' | 'height' | 'txN'>
              & { coin: (
                { __typename?: 'Coin' }
                & Pick<Coin, 'name'>
              ) }
            ) }
          )> }
        ) }
      ) }
    ) }
  )> }
);


export const AddressOverviewDocument = gql`
    query AddressOverview($coin: String!, $address: String!) {
  coin(name: $coin) {
    name
    address(address: $address) {
      address
      coin {
        name
      }
      guestimatedWallet {
        clusterId
      }
      unconfirmedTxCount
    }
  }
}
    `;

/**
 * __useAddressOverviewQuery__
 *
 * To run a query within a React component, call `useAddressOverviewQuery` and pass it any options that fit your needs.
 * When your component renders, `useAddressOverviewQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAddressOverviewQuery({
 *   variables: {
 *      coin: // value for 'coin'
 *      address: // value for 'address'
 *   },
 * });
 */
export function useAddressOverviewQuery(baseOptions: Apollo.QueryHookOptions<AddressOverviewQuery, AddressOverviewQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AddressOverviewQuery, AddressOverviewQueryVariables>(AddressOverviewDocument, options);
      }
export function useAddressOverviewLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AddressOverviewQuery, AddressOverviewQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AddressOverviewQuery, AddressOverviewQueryVariables>(AddressOverviewDocument, options);
        }
export type AddressOverviewQueryHookResult = ReturnType<typeof useAddressOverviewQuery>;
export type AddressOverviewLazyQueryHookResult = ReturnType<typeof useAddressOverviewLazyQuery>;
export type AddressOverviewQueryResult = Apollo.QueryResult<AddressOverviewQuery, AddressOverviewQueryVariables>;
export const AddressTransactionsDocument = gql`
    query AddressTransactions($coin: String!, $address: String!, $cursor: AddressTransactionCursor, $limit: Int) {
  coin(name: $coin) {
    name
    address(address: $address) {
      address
      coin {
        name
      }
      confirmedTransactions(limit: $limit, cursor: $cursor) {
        items {
          timestamp
          height
          txN
          confirmedTransaction {
            height
            txN
            txid
            coin {
              name
            }
          }
          balanceChange
          balanceAfterBlock
        }
      }
    }
  }
}
    `;

/**
 * __useAddressTransactionsQuery__
 *
 * To run a query within a React component, call `useAddressTransactionsQuery` and pass it any options that fit your needs.
 * When your component renders, `useAddressTransactionsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAddressTransactionsQuery({
 *   variables: {
 *      coin: // value for 'coin'
 *      address: // value for 'address'
 *      cursor: // value for 'cursor'
 *      limit: // value for 'limit'
 *   },
 * });
 */
export function useAddressTransactionsQuery(baseOptions: Apollo.QueryHookOptions<AddressTransactionsQuery, AddressTransactionsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AddressTransactionsQuery, AddressTransactionsQueryVariables>(AddressTransactionsDocument, options);
      }
export function useAddressTransactionsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AddressTransactionsQuery, AddressTransactionsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AddressTransactionsQuery, AddressTransactionsQueryVariables>(AddressTransactionsDocument, options);
        }
export type AddressTransactionsQueryHookResult = ReturnType<typeof useAddressTransactionsQuery>;
export type AddressTransactionsLazyQueryHookResult = ReturnType<typeof useAddressTransactionsLazyQuery>;
export type AddressTransactionsQueryResult = Apollo.QueryResult<AddressTransactionsQuery, AddressTransactionsQueryVariables>;
export const BlockDocument = gql`
    query block($coin: String!, $hash: String!, $cursor: ConfirmedTransactionCursor, $limit: Int) {
  coin(name: $coin) {
    name
    block(hash: $hash) {
      hash
      txCount
      coin {
        name
      }
      transactions(limit: $limit, cursor: $cursor) {
        items {
          height
          txid
          transaction {
            txid
            coin {
              name
            }
            inputCount
            outputCount
            fee
          }
          txN
          coin {
            name
          }
        }
      }
    }
  }
}
    `;

/**
 * __useBlockQuery__
 *
 * To run a query within a React component, call `useBlockQuery` and pass it any options that fit your needs.
 * When your component renders, `useBlockQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useBlockQuery({
 *   variables: {
 *      coin: // value for 'coin'
 *      hash: // value for 'hash'
 *      cursor: // value for 'cursor'
 *      limit: // value for 'limit'
 *   },
 * });
 */
export function useBlockQuery(baseOptions: Apollo.QueryHookOptions<BlockQuery, BlockQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<BlockQuery, BlockQueryVariables>(BlockDocument, options);
      }
export function useBlockLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<BlockQuery, BlockQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<BlockQuery, BlockQueryVariables>(BlockDocument, options);
        }
export type BlockQueryHookResult = ReturnType<typeof useBlockQuery>;
export type BlockLazyQueryHookResult = ReturnType<typeof useBlockLazyQuery>;
export type BlockQueryResult = Apollo.QueryResult<BlockQuery, BlockQueryVariables>;
export const AvailableCoinsDocument = gql`
    query availableCoins {
  coins {
    name
  }
}
    `;

/**
 * __useAvailableCoinsQuery__
 *
 * To run a query within a React component, call `useAvailableCoinsQuery` and pass it any options that fit your needs.
 * When your component renders, `useAvailableCoinsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAvailableCoinsQuery({
 *   variables: {
 *   },
 * });
 */
export function useAvailableCoinsQuery(baseOptions?: Apollo.QueryHookOptions<AvailableCoinsQuery, AvailableCoinsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AvailableCoinsQuery, AvailableCoinsQueryVariables>(AvailableCoinsDocument, options);
      }
export function useAvailableCoinsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AvailableCoinsQuery, AvailableCoinsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AvailableCoinsQuery, AvailableCoinsQueryVariables>(AvailableCoinsDocument, options);
        }
export type AvailableCoinsQueryHookResult = ReturnType<typeof useAvailableCoinsQuery>;
export type AvailableCoinsLazyQueryHookResult = ReturnType<typeof useAvailableCoinsLazyQuery>;
export type AvailableCoinsQueryResult = Apollo.QueryResult<AvailableCoinsQuery, AvailableCoinsQueryVariables>;
export const TransactionByIdDocument = gql`
    query transactionById($coin: String!, $txid: String!) {
  coin(name: $coin) {
    name
    transaction(txid: $txid) {
      coin {
        name
      }
      inputs(limit: 300) {
        items {
          spentOutput {
            txid
            n
            spendingIndex
            value
            scriptPubKey {
              addresses {
                address
                coin {
                  name
                }
                guestimatedWallet {
                  clusterId
                }
              }
            }
          }
        }
      }
      outputs(limit: 300) {
        items {
          value
          n
          scriptPubKey {
            addresses {
              address
              coin {
                name
              }
              guestimatedWallet {
                clusterId
              }
            }
          }
          spendingTxid
          spendingIndex
        }
      }
    }
  }
}
    `;

/**
 * __useTransactionByIdQuery__
 *
 * To run a query within a React component, call `useTransactionByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useTransactionByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTransactionByIdQuery({
 *   variables: {
 *      coin: // value for 'coin'
 *      txid: // value for 'txid'
 *   },
 * });
 */
export function useTransactionByIdQuery(baseOptions: Apollo.QueryHookOptions<TransactionByIdQuery, TransactionByIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<TransactionByIdQuery, TransactionByIdQueryVariables>(TransactionByIdDocument, options);
      }
export function useTransactionByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<TransactionByIdQuery, TransactionByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<TransactionByIdQuery, TransactionByIdQueryVariables>(TransactionByIdDocument, options);
        }
export type TransactionByIdQueryHookResult = ReturnType<typeof useTransactionByIdQuery>;
export type TransactionByIdLazyQueryHookResult = ReturnType<typeof useTransactionByIdLazyQuery>;
export type TransactionByIdQueryResult = Apollo.QueryResult<TransactionByIdQuery, TransactionByIdQueryVariables>;
export const SearchNumberDocument = gql`
    query searchNumber($query: Int!) {
  coins {
    name
    blockByHeight(height: $query) {
      height
      hash
      coin {
        name
      }
    }
  }
}
    `;

/**
 * __useSearchNumberQuery__
 *
 * To run a query within a React component, call `useSearchNumberQuery` and pass it any options that fit your needs.
 * When your component renders, `useSearchNumberQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSearchNumberQuery({
 *   variables: {
 *      query: // value for 'query'
 *   },
 * });
 */
export function useSearchNumberQuery(baseOptions: Apollo.QueryHookOptions<SearchNumberQuery, SearchNumberQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SearchNumberQuery, SearchNumberQueryVariables>(SearchNumberDocument, options);
      }
export function useSearchNumberLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SearchNumberQuery, SearchNumberQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SearchNumberQuery, SearchNumberQueryVariables>(SearchNumberDocument, options);
        }
export type SearchNumberQueryHookResult = ReturnType<typeof useSearchNumberQuery>;
export type SearchNumberLazyQueryHookResult = ReturnType<typeof useSearchNumberLazyQuery>;
export type SearchNumberQueryResult = Apollo.QueryResult<SearchNumberQuery, SearchNumberQueryVariables>;
export const SearchStringDocument = gql`
    query searchString($query: String!) {
  coins {
    name
    address(address: $query) {
      address
      coin {
        name
      }
      balances {
        items {
          balance
          timestamp
        }
      }
    }
    transaction(txid: $query) {
      txid
      coin {
        name
      }
      height
    }
    block(hash: $query) {
      hash
      height
      coin {
        name
      }
    }
  }
}
    `;

/**
 * __useSearchStringQuery__
 *
 * To run a query within a React component, call `useSearchStringQuery` and pass it any options that fit your needs.
 * When your component renders, `useSearchStringQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSearchStringQuery({
 *   variables: {
 *      query: // value for 'query'
 *   },
 * });
 */
export function useSearchStringQuery(baseOptions: Apollo.QueryHookOptions<SearchStringQuery, SearchStringQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SearchStringQuery, SearchStringQueryVariables>(SearchStringDocument, options);
      }
export function useSearchStringLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SearchStringQuery, SearchStringQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SearchStringQuery, SearchStringQueryVariables>(SearchStringDocument, options);
        }
export type SearchStringQueryHookResult = ReturnType<typeof useSearchStringQuery>;
export type SearchStringLazyQueryHookResult = ReturnType<typeof useSearchStringLazyQuery>;
export type SearchStringQueryResult = Apollo.QueryResult<SearchStringQuery, SearchStringQueryVariables>;
export const TransactionInputsDocument = gql`
    query transactionInputs($coin: String!, $txid: String!) {
  coin(name: $coin) {
    name
    transaction(txid: $txid) {
      txid
      coin {
        name
      }
      inputs {
        items {
          coinbase
          spentOutput {
            txid
            n
            value
            scriptPubKey {
              addresses {
                address
                coin {
                  name
                }
                guestimatedWallet {
                  clusterId
                  coin {
                    name
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
    `;

/**
 * __useTransactionInputsQuery__
 *
 * To run a query within a React component, call `useTransactionInputsQuery` and pass it any options that fit your needs.
 * When your component renders, `useTransactionInputsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTransactionInputsQuery({
 *   variables: {
 *      coin: // value for 'coin'
 *      txid: // value for 'txid'
 *   },
 * });
 */
export function useTransactionInputsQuery(baseOptions: Apollo.QueryHookOptions<TransactionInputsQuery, TransactionInputsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<TransactionInputsQuery, TransactionInputsQueryVariables>(TransactionInputsDocument, options);
      }
export function useTransactionInputsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<TransactionInputsQuery, TransactionInputsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<TransactionInputsQuery, TransactionInputsQueryVariables>(TransactionInputsDocument, options);
        }
export type TransactionInputsQueryHookResult = ReturnType<typeof useTransactionInputsQuery>;
export type TransactionInputsLazyQueryHookResult = ReturnType<typeof useTransactionInputsLazyQuery>;
export type TransactionInputsQueryResult = Apollo.QueryResult<TransactionInputsQuery, TransactionInputsQueryVariables>;
export const TransactionOutputsDocument = gql`
    query transactionOutputs($coin: String!, $txid: String!) {
  coin(name: $coin) {
    name
    transaction(txid: $txid) {
      txid
      coin {
        name
      }
      outputs {
        items {
          value
          n
          spendingInput {
            spendingTxid
            spendingIndex
          }
          scriptPubKey {
            addresses {
              address
              coin {
                name
              }
              guestimatedWallet {
                clusterId
                coin {
                  name
                }
              }
            }
          }
        }
      }
    }
  }
}
    `;

/**
 * __useTransactionOutputsQuery__
 *
 * To run a query within a React component, call `useTransactionOutputsQuery` and pass it any options that fit your needs.
 * When your component renders, `useTransactionOutputsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTransactionOutputsQuery({
 *   variables: {
 *      coin: // value for 'coin'
 *      txid: // value for 'txid'
 *   },
 * });
 */
export function useTransactionOutputsQuery(baseOptions: Apollo.QueryHookOptions<TransactionOutputsQuery, TransactionOutputsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<TransactionOutputsQuery, TransactionOutputsQueryVariables>(TransactionOutputsDocument, options);
      }
export function useTransactionOutputsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<TransactionOutputsQuery, TransactionOutputsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<TransactionOutputsQuery, TransactionOutputsQueryVariables>(TransactionOutputsDocument, options);
        }
export type TransactionOutputsQueryHookResult = ReturnType<typeof useTransactionOutputsQuery>;
export type TransactionOutputsLazyQueryHookResult = ReturnType<typeof useTransactionOutputsLazyQuery>;
export type TransactionOutputsQueryResult = Apollo.QueryResult<TransactionOutputsQuery, TransactionOutputsQueryVariables>;
export const TransactionById2Document = gql`
    query transactionById2($coin: String!, $txid: String!) {
  coin(name: $coin) {
    name
    transaction(txid: $txid) {
      txid
      inputCount
      outputCount
      coin {
        name
      }
    }
  }
}
    `;

/**
 * __useTransactionById2Query__
 *
 * To run a query within a React component, call `useTransactionById2Query` and pass it any options that fit your needs.
 * When your component renders, `useTransactionById2Query` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTransactionById2Query({
 *   variables: {
 *      coin: // value for 'coin'
 *      txid: // value for 'txid'
 *   },
 * });
 */
export function useTransactionById2Query(baseOptions: Apollo.QueryHookOptions<TransactionById2Query, TransactionById2QueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<TransactionById2Query, TransactionById2QueryVariables>(TransactionById2Document, options);
      }
export function useTransactionById2LazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<TransactionById2Query, TransactionById2QueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<TransactionById2Query, TransactionById2QueryVariables>(TransactionById2Document, options);
        }
export type TransactionById2QueryHookResult = ReturnType<typeof useTransactionById2Query>;
export type TransactionById2LazyQueryHookResult = ReturnType<typeof useTransactionById2LazyQuery>;
export type TransactionById2QueryResult = Apollo.QueryResult<TransactionById2Query, TransactionById2QueryVariables>;
export const WalletDocument = gql`
    query Wallet($coin: String!, $address: String!) {
  coin(name: $coin) {
    name
    address(address: $address) {
      address
      coin {
        name
      }
      guestimatedWallet {
        clusterId
        details {
          balance
        }
      }
    }
  }
}
    `;

/**
 * __useWalletQuery__
 *
 * To run a query within a React component, call `useWalletQuery` and pass it any options that fit your needs.
 * When your component renders, `useWalletQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useWalletQuery({
 *   variables: {
 *      coin: // value for 'coin'
 *      address: // value for 'address'
 *   },
 * });
 */
export function useWalletQuery(baseOptions: Apollo.QueryHookOptions<WalletQuery, WalletQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<WalletQuery, WalletQueryVariables>(WalletDocument, options);
      }
export function useWalletLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<WalletQuery, WalletQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<WalletQuery, WalletQueryVariables>(WalletDocument, options);
        }
export type WalletQueryHookResult = ReturnType<typeof useWalletQuery>;
export type WalletLazyQueryHookResult = ReturnType<typeof useWalletLazyQuery>;
export type WalletQueryResult = Apollo.QueryResult<WalletQuery, WalletQueryVariables>;
export const WalletAddressesDocument = gql`
    query WalletAddresses($coin: String!, $address: String!, $limit: Int, $cursor: AddressCursor) {
  coin(name: $coin) {
    name
    address(address: $address) {
      address
      coin {
        name
      }
      guestimatedWallet {
        clusterId
        addresses(cursor: $cursor, limit: $limit) {
          items {
            address
            coin {
              name
            }
          }
        }
      }
    }
  }
}
    `;

/**
 * __useWalletAddressesQuery__
 *
 * To run a query within a React component, call `useWalletAddressesQuery` and pass it any options that fit your needs.
 * When your component renders, `useWalletAddressesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useWalletAddressesQuery({
 *   variables: {
 *      coin: // value for 'coin'
 *      address: // value for 'address'
 *      limit: // value for 'limit'
 *      cursor: // value for 'cursor'
 *   },
 * });
 */
export function useWalletAddressesQuery(baseOptions: Apollo.QueryHookOptions<WalletAddressesQuery, WalletAddressesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<WalletAddressesQuery, WalletAddressesQueryVariables>(WalletAddressesDocument, options);
      }
export function useWalletAddressesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<WalletAddressesQuery, WalletAddressesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<WalletAddressesQuery, WalletAddressesQueryVariables>(WalletAddressesDocument, options);
        }
export type WalletAddressesQueryHookResult = ReturnType<typeof useWalletAddressesQuery>;
export type WalletAddressesLazyQueryHookResult = ReturnType<typeof useWalletAddressesLazyQuery>;
export type WalletAddressesQueryResult = Apollo.QueryResult<WalletAddressesQuery, WalletAddressesQueryVariables>;
export const WalletTransactionsDocument = gql`
    query WalletTransactions($coin: String!, $address: String!, $limit: Int, $cursor: ClusterTransactionCursor) {
  coin(name: $coin) {
    name
    address(address: $address) {
      address
      coin {
        name
      }
      guestimatedWallet {
        clusterId
        transactions(cursor: $cursor, limit: $limit) {
          items {
            confirmedTransaction {
              txid
              height
              txN
              coin {
                name
              }
            }
            timestamp
            balanceChange
          }
        }
      }
    }
  }
}
    `;

/**
 * __useWalletTransactionsQuery__
 *
 * To run a query within a React component, call `useWalletTransactionsQuery` and pass it any options that fit your needs.
 * When your component renders, `useWalletTransactionsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useWalletTransactionsQuery({
 *   variables: {
 *      coin: // value for 'coin'
 *      address: // value for 'address'
 *      limit: // value for 'limit'
 *      cursor: // value for 'cursor'
 *   },
 * });
 */
export function useWalletTransactionsQuery(baseOptions: Apollo.QueryHookOptions<WalletTransactionsQuery, WalletTransactionsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<WalletTransactionsQuery, WalletTransactionsQueryVariables>(WalletTransactionsDocument, options);
      }
export function useWalletTransactionsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<WalletTransactionsQuery, WalletTransactionsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<WalletTransactionsQuery, WalletTransactionsQueryVariables>(WalletTransactionsDocument, options);
        }
export type WalletTransactionsQueryHookResult = ReturnType<typeof useWalletTransactionsQuery>;
export type WalletTransactionsLazyQueryHookResult = ReturnType<typeof useWalletTransactionsLazyQuery>;
export type WalletTransactionsQueryResult = Apollo.QueryResult<WalletTransactionsQuery, WalletTransactionsQueryVariables>;
export type AddressKeySpecifier = ('coin' | 'address' | 'guestimatedWallet' | 'ohlc' | 'unconfirmedTransactions' | 'unconfirmedTxCount' | 'unconfirmedBalanceChange' | 'confirmedTransactions' | 'balances' | AddressKeySpecifier)[];
export type AddressFieldPolicy = {
	coin?: FieldPolicy<any> | FieldReadFunction<any>,
	address?: FieldPolicy<any> | FieldReadFunction<any>,
	guestimatedWallet?: FieldPolicy<any> | FieldReadFunction<any>,
	ohlc?: FieldPolicy<any> | FieldReadFunction<any>,
	unconfirmedTransactions?: FieldPolicy<any> | FieldReadFunction<any>,
	unconfirmedTxCount?: FieldPolicy<any> | FieldReadFunction<any>,
	unconfirmedBalanceChange?: FieldPolicy<any> | FieldReadFunction<any>,
	confirmedTransactions?: FieldPolicy<any> | FieldReadFunction<any>,
	balances?: FieldPolicy<any> | FieldReadFunction<any>
};
export type AddressBalanceKeySpecifier = ('balance' | 'timestamp' | AddressBalanceKeySpecifier)[];
export type AddressBalanceFieldPolicy = {
	balance?: FieldPolicy<any> | FieldReadFunction<any>,
	timestamp?: FieldPolicy<any> | FieldReadFunction<any>
};
export type AddressBalanceChangeKeySpecifier = ('address' | 'balanceChange' | AddressBalanceChangeKeySpecifier)[];
export type AddressBalanceChangeFieldPolicy = {
	address?: FieldPolicy<any> | FieldReadFunction<any>,
	balanceChange?: FieldPolicy<any> | FieldReadFunction<any>
};
export type AddressClusterKeySpecifier = ('clusterId' | 'coin' | 'transactions' | 'addresses' | 'dailyBalanceChanges' | 'details' | AddressClusterKeySpecifier)[];
export type AddressClusterFieldPolicy = {
	clusterId?: FieldPolicy<any> | FieldReadFunction<any>,
	coin?: FieldPolicy<any> | FieldReadFunction<any>,
	transactions?: FieldPolicy<any> | FieldReadFunction<any>,
	addresses?: FieldPolicy<any> | FieldReadFunction<any>,
	dailyBalanceChanges?: FieldPolicy<any> | FieldReadFunction<any>,
	details?: FieldPolicy<any> | FieldReadFunction<any>
};
export type AddressClusterBalanceChangeKeySpecifier = ('guestimatedWallet' | 'balanceChange' | AddressClusterBalanceChangeKeySpecifier)[];
export type AddressClusterBalanceChangeFieldPolicy = {
	guestimatedWallet?: FieldPolicy<any> | FieldReadFunction<any>,
	balanceChange?: FieldPolicy<any> | FieldReadFunction<any>
};
export type AddressClusterDailyBalanceChangeKeySpecifier = ('date' | 'balanceChange' | AddressClusterDailyBalanceChangeKeySpecifier)[];
export type AddressClusterDailyBalanceChangeFieldPolicy = {
	date?: FieldPolicy<any> | FieldReadFunction<any>,
	balanceChange?: FieldPolicy<any> | FieldReadFunction<any>
};
export type AddressClusterDetailsKeySpecifier = ('balance' | AddressClusterDetailsKeySpecifier)[];
export type AddressClusterDetailsFieldPolicy = {
	balance?: FieldPolicy<any> | FieldReadFunction<any>
};
export type AddressClusterRichlistKeySpecifier = ('cluster' | 'balance' | AddressClusterRichlistKeySpecifier)[];
export type AddressClusterRichlistFieldPolicy = {
	cluster?: FieldPolicy<any> | FieldReadFunction<any>,
	balance?: FieldPolicy<any> | FieldReadFunction<any>
};
export type AddressTransactionKeySpecifier = ('timestamp' | 'height' | 'txN' | 'balanceChange' | 'balanceAfterBlock' | 'confirmedTransaction' | AddressTransactionKeySpecifier)[];
export type AddressTransactionFieldPolicy = {
	timestamp?: FieldPolicy<any> | FieldReadFunction<any>,
	height?: FieldPolicy<any> | FieldReadFunction<any>,
	txN?: FieldPolicy<any> | FieldReadFunction<any>,
	balanceChange?: FieldPolicy<any> | FieldReadFunction<any>,
	balanceAfterBlock?: FieldPolicy<any> | FieldReadFunction<any>,
	confirmedTransaction?: FieldPolicy<any> | FieldReadFunction<any>
};
export type BlockKeySpecifier = ('hash' | 'height' | 'size' | 'version' | 'versionHex' | 'merkleRoot' | 'time' | 'medianTime' | 'nonce' | 'bits' | 'difficulty' | 'chainWork' | 'previousBlockHash' | 'txCount' | 'coin' | 'transactions' | BlockKeySpecifier)[];
export type BlockFieldPolicy = {
	hash?: FieldPolicy<any> | FieldReadFunction<any>,
	height?: FieldPolicy<any> | FieldReadFunction<any>,
	size?: FieldPolicy<any> | FieldReadFunction<any>,
	version?: FieldPolicy<any> | FieldReadFunction<any>,
	versionHex?: FieldPolicy<any> | FieldReadFunction<any>,
	merkleRoot?: FieldPolicy<any> | FieldReadFunction<any>,
	time?: FieldPolicy<any> | FieldReadFunction<any>,
	medianTime?: FieldPolicy<any> | FieldReadFunction<any>,
	nonce?: FieldPolicy<any> | FieldReadFunction<any>,
	bits?: FieldPolicy<any> | FieldReadFunction<any>,
	difficulty?: FieldPolicy<any> | FieldReadFunction<any>,
	chainWork?: FieldPolicy<any> | FieldReadFunction<any>,
	previousBlockHash?: FieldPolicy<any> | FieldReadFunction<any>,
	txCount?: FieldPolicy<any> | FieldReadFunction<any>,
	coin?: FieldPolicy<any> | FieldReadFunction<any>,
	transactions?: FieldPolicy<any> | FieldReadFunction<any>
};
export type BlockHashKeySpecifier = ('hash' | 'height' | 'coin' | 'block' | BlockHashKeySpecifier)[];
export type BlockHashFieldPolicy = {
	hash?: FieldPolicy<any> | FieldReadFunction<any>,
	height?: FieldPolicy<any> | FieldReadFunction<any>,
	coin?: FieldPolicy<any> | FieldReadFunction<any>,
	block?: FieldPolicy<any> | FieldReadFunction<any>
};
export type ClusterTransactionKeySpecifier = ('timestamp' | 'height' | 'txN' | 'balanceChange' | 'confirmedTransaction' | ClusterTransactionKeySpecifier)[];
export type ClusterTransactionFieldPolicy = {
	timestamp?: FieldPolicy<any> | FieldReadFunction<any>,
	height?: FieldPolicy<any> | FieldReadFunction<any>,
	txN?: FieldPolicy<any> | FieldReadFunction<any>,
	balanceChange?: FieldPolicy<any> | FieldReadFunction<any>,
	confirmedTransaction?: FieldPolicy<any> | FieldReadFunction<any>
};
export type CoinKeySpecifier = ('name' | 'bip44_index' | 'bip44_symbol' | 'date' | 'mempool' | 'address' | 'transaction' | 'transactionInput' | 'transactionOutput' | 'confirmedTransaction' | 'blocks' | 'blockByHeight' | 'block' | 'clusterRichlist' | CoinKeySpecifier)[];
export type CoinFieldPolicy = {
	name?: FieldPolicy<any> | FieldReadFunction<any>,
	bip44_index?: FieldPolicy<any> | FieldReadFunction<any>,
	bip44_symbol?: FieldPolicy<any> | FieldReadFunction<any>,
	date?: FieldPolicy<any> | FieldReadFunction<any>,
	mempool?: FieldPolicy<any> | FieldReadFunction<any>,
	address?: FieldPolicy<any> | FieldReadFunction<any>,
	transaction?: FieldPolicy<any> | FieldReadFunction<any>,
	transactionInput?: FieldPolicy<any> | FieldReadFunction<any>,
	transactionOutput?: FieldPolicy<any> | FieldReadFunction<any>,
	confirmedTransaction?: FieldPolicy<any> | FieldReadFunction<any>,
	blocks?: FieldPolicy<any> | FieldReadFunction<any>,
	blockByHeight?: FieldPolicy<any> | FieldReadFunction<any>,
	block?: FieldPolicy<any> | FieldReadFunction<any>,
	clusterRichlist?: FieldPolicy<any> | FieldReadFunction<any>
};
export type ConfirmedTransactionKeySpecifier = ('height' | 'txN' | 'txid' | 'coin' | 'blockHash' | 'transaction' | ConfirmedTransactionKeySpecifier)[];
export type ConfirmedTransactionFieldPolicy = {
	height?: FieldPolicy<any> | FieldReadFunction<any>,
	txN?: FieldPolicy<any> | FieldReadFunction<any>,
	txid?: FieldPolicy<any> | FieldReadFunction<any>,
	coin?: FieldPolicy<any> | FieldReadFunction<any>,
	blockHash?: FieldPolicy<any> | FieldReadFunction<any>,
	transaction?: FieldPolicy<any> | FieldReadFunction<any>
};
export type DateKeySpecifier = ('coin' | 'date' | 'richList' | 'topGainers' | 'topLosers' | 'topClusterGainers' | 'topClusterLosers' | DateKeySpecifier)[];
export type DateFieldPolicy = {
	coin?: FieldPolicy<any> | FieldReadFunction<any>,
	date?: FieldPolicy<any> | FieldReadFunction<any>,
	richList?: FieldPolicy<any> | FieldReadFunction<any>,
	topGainers?: FieldPolicy<any> | FieldReadFunction<any>,
	topLosers?: FieldPolicy<any> | FieldReadFunction<any>,
	topClusterGainers?: FieldPolicy<any> | FieldReadFunction<any>,
	topClusterLosers?: FieldPolicy<any> | FieldReadFunction<any>
};
export type MempoolKeySpecifier = ('coin' | 'totalFees' | 'txCount' | 'transactions' | MempoolKeySpecifier)[];
export type MempoolFieldPolicy = {
	coin?: FieldPolicy<any> | FieldReadFunction<any>,
	totalFees?: FieldPolicy<any> | FieldReadFunction<any>,
	txCount?: FieldPolicy<any> | FieldReadFunction<any>,
	transactions?: FieldPolicy<any> | FieldReadFunction<any>
};
export type MutationKeySpecifier = ('sendRawTransaction' | MutationKeySpecifier)[];
export type MutationFieldPolicy = {
	sendRawTransaction?: FieldPolicy<any> | FieldReadFunction<any>
};
export type OHLCKeySpecifier = ('open' | 'high' | 'low' | 'close' | 'timestamp' | OHLCKeySpecifier)[];
export type OHLCFieldPolicy = {
	open?: FieldPolicy<any> | FieldReadFunction<any>,
	high?: FieldPolicy<any> | FieldReadFunction<any>,
	low?: FieldPolicy<any> | FieldReadFunction<any>,
	close?: FieldPolicy<any> | FieldReadFunction<any>,
	timestamp?: FieldPolicy<any> | FieldReadFunction<any>
};
export type PaginatedAddressBalanceChangeResponseKeySpecifier = ('items' | 'hasMore' | PaginatedAddressBalanceChangeResponseKeySpecifier)[];
export type PaginatedAddressBalanceChangeResponseFieldPolicy = {
	items?: FieldPolicy<any> | FieldReadFunction<any>,
	hasMore?: FieldPolicy<any> | FieldReadFunction<any>
};
export type PaginatedAddressBalanceResponseKeySpecifier = ('items' | 'hasMore' | PaginatedAddressBalanceResponseKeySpecifier)[];
export type PaginatedAddressBalanceResponseFieldPolicy = {
	items?: FieldPolicy<any> | FieldReadFunction<any>,
	hasMore?: FieldPolicy<any> | FieldReadFunction<any>
};
export type PaginatedAddressBlockHashtResponseKeySpecifier = ('items' | 'hasMore' | PaginatedAddressBlockHashtResponseKeySpecifier)[];
export type PaginatedAddressBlockHashtResponseFieldPolicy = {
	items?: FieldPolicy<any> | FieldReadFunction<any>,
	hasMore?: FieldPolicy<any> | FieldReadFunction<any>
};
export type PaginatedAddressClusterBalanceChangeResponseKeySpecifier = ('items' | 'hasMore' | PaginatedAddressClusterBalanceChangeResponseKeySpecifier)[];
export type PaginatedAddressClusterBalanceChangeResponseFieldPolicy = {
	items?: FieldPolicy<any> | FieldReadFunction<any>,
	hasMore?: FieldPolicy<any> | FieldReadFunction<any>
};
export type PaginatedAddressClusterDailyBalanceChangeResponseKeySpecifier = ('items' | 'hasMore' | PaginatedAddressClusterDailyBalanceChangeResponseKeySpecifier)[];
export type PaginatedAddressClusterDailyBalanceChangeResponseFieldPolicy = {
	items?: FieldPolicy<any> | FieldReadFunction<any>,
	hasMore?: FieldPolicy<any> | FieldReadFunction<any>
};
export type PaginatedAddressClusterRichlistResponseKeySpecifier = ('items' | 'hasMore' | PaginatedAddressClusterRichlistResponseKeySpecifier)[];
export type PaginatedAddressClusterRichlistResponseFieldPolicy = {
	items?: FieldPolicy<any> | FieldReadFunction<any>,
	hasMore?: FieldPolicy<any> | FieldReadFunction<any>
};
export type PaginatedAddressResponseKeySpecifier = ('items' | 'hasMore' | PaginatedAddressResponseKeySpecifier)[];
export type PaginatedAddressResponseFieldPolicy = {
	items?: FieldPolicy<any> | FieldReadFunction<any>,
	hasMore?: FieldPolicy<any> | FieldReadFunction<any>
};
export type PaginatedAddressTransactionResponseKeySpecifier = ('items' | 'hasMore' | PaginatedAddressTransactionResponseKeySpecifier)[];
export type PaginatedAddressTransactionResponseFieldPolicy = {
	items?: FieldPolicy<any> | FieldReadFunction<any>,
	hasMore?: FieldPolicy<any> | FieldReadFunction<any>
};
export type PaginatedClusterTransactionResponseKeySpecifier = ('items' | 'hasMore' | PaginatedClusterTransactionResponseKeySpecifier)[];
export type PaginatedClusterTransactionResponseFieldPolicy = {
	items?: FieldPolicy<any> | FieldReadFunction<any>,
	hasMore?: FieldPolicy<any> | FieldReadFunction<any>
};
export type PaginatedConfirmedTransactionResponseKeySpecifier = ('items' | 'hasMore' | PaginatedConfirmedTransactionResponseKeySpecifier)[];
export type PaginatedConfirmedTransactionResponseFieldPolicy = {
	items?: FieldPolicy<any> | FieldReadFunction<any>,
	hasMore?: FieldPolicy<any> | FieldReadFunction<any>
};
export type PaginatedOHLCResponseKeySpecifier = ('items' | 'hasMore' | PaginatedOHLCResponseKeySpecifier)[];
export type PaginatedOHLCResponseFieldPolicy = {
	items?: FieldPolicy<any> | FieldReadFunction<any>,
	hasMore?: FieldPolicy<any> | FieldReadFunction<any>
};
export type PaginatedRichlistResponseKeySpecifier = ('items' | 'hasMore' | PaginatedRichlistResponseKeySpecifier)[];
export type PaginatedRichlistResponseFieldPolicy = {
	items?: FieldPolicy<any> | FieldReadFunction<any>,
	hasMore?: FieldPolicy<any> | FieldReadFunction<any>
};
export type PaginatedTransactionInputResponseKeySpecifier = ('items' | 'hasMore' | PaginatedTransactionInputResponseKeySpecifier)[];
export type PaginatedTransactionInputResponseFieldPolicy = {
	items?: FieldPolicy<any> | FieldReadFunction<any>,
	hasMore?: FieldPolicy<any> | FieldReadFunction<any>
};
export type PaginatedTransactionOutputResponseKeySpecifier = ('items' | 'hasMore' | PaginatedTransactionOutputResponseKeySpecifier)[];
export type PaginatedTransactionOutputResponseFieldPolicy = {
	items?: FieldPolicy<any> | FieldReadFunction<any>,
	hasMore?: FieldPolicy<any> | FieldReadFunction<any>
};
export type PaginatedUnconfirmedAddressTransactionResponseKeySpecifier = ('items' | 'hasMore' | PaginatedUnconfirmedAddressTransactionResponseKeySpecifier)[];
export type PaginatedUnconfirmedAddressTransactionResponseFieldPolicy = {
	items?: FieldPolicy<any> | FieldReadFunction<any>,
	hasMore?: FieldPolicy<any> | FieldReadFunction<any>
};
export type PaginatedUnconfirmedTransactionResponseKeySpecifier = ('items' | 'hasMore' | PaginatedUnconfirmedTransactionResponseKeySpecifier)[];
export type PaginatedUnconfirmedTransactionResponseFieldPolicy = {
	items?: FieldPolicy<any> | FieldReadFunction<any>,
	hasMore?: FieldPolicy<any> | FieldReadFunction<any>
};
export type QueryKeySpecifier = ('coins' | 'coin' | QueryKeySpecifier)[];
export type QueryFieldPolicy = {
	coins?: FieldPolicy<any> | FieldReadFunction<any>,
	coin?: FieldPolicy<any> | FieldReadFunction<any>
};
export type RichListKeySpecifier = ('address' | 'balance' | 'balanceChange' | RichListKeySpecifier)[];
export type RichListFieldPolicy = {
	address?: FieldPolicy<any> | FieldReadFunction<any>,
	balance?: FieldPolicy<any> | FieldReadFunction<any>,
	balanceChange?: FieldPolicy<any> | FieldReadFunction<any>
};
export type ScriptPubKeyKeySpecifier = ('asm' | 'hex' | 'reqSigs' | 'type' | 'addresses' | ScriptPubKeyKeySpecifier)[];
export type ScriptPubKeyFieldPolicy = {
	asm?: FieldPolicy<any> | FieldReadFunction<any>,
	hex?: FieldPolicy<any> | FieldReadFunction<any>,
	reqSigs?: FieldPolicy<any> | FieldReadFunction<any>,
	type?: FieldPolicy<any> | FieldReadFunction<any>,
	addresses?: FieldPolicy<any> | FieldReadFunction<any>
};
export type ScriptSigKeySpecifier = ('asm' | 'hex' | ScriptSigKeySpecifier)[];
export type ScriptSigFieldPolicy = {
	asm?: FieldPolicy<any> | FieldReadFunction<any>,
	hex?: FieldPolicy<any> | FieldReadFunction<any>
};
export type SendRawTransactionResultKeySpecifier = ('txid' | SendRawTransactionResultKeySpecifier)[];
export type SendRawTransactionResultFieldPolicy = {
	txid?: FieldPolicy<any> | FieldReadFunction<any>
};
export type TransactionKeySpecifier = ('txid' | 'height' | 'txN' | 'size' | 'version' | 'lockTime' | 'fee' | 'inputCount' | 'outputCount' | 'coin' | 'blockHash' | 'inputs' | 'outputs' | TransactionKeySpecifier)[];
export type TransactionFieldPolicy = {
	txid?: FieldPolicy<any> | FieldReadFunction<any>,
	height?: FieldPolicy<any> | FieldReadFunction<any>,
	txN?: FieldPolicy<any> | FieldReadFunction<any>,
	size?: FieldPolicy<any> | FieldReadFunction<any>,
	version?: FieldPolicy<any> | FieldReadFunction<any>,
	lockTime?: FieldPolicy<any> | FieldReadFunction<any>,
	fee?: FieldPolicy<any> | FieldReadFunction<any>,
	inputCount?: FieldPolicy<any> | FieldReadFunction<any>,
	outputCount?: FieldPolicy<any> | FieldReadFunction<any>,
	coin?: FieldPolicy<any> | FieldReadFunction<any>,
	blockHash?: FieldPolicy<any> | FieldReadFunction<any>,
	inputs?: FieldPolicy<any> | FieldReadFunction<any>,
	outputs?: FieldPolicy<any> | FieldReadFunction<any>
};
export type TransactionInputKeySpecifier = ('sequence' | 'txid' | 'vout' | 'coinbase' | 'scriptSig' | 'spendingTxid' | 'spendingIndex' | 'coin' | 'spentOutput' | 'transaction' | TransactionInputKeySpecifier)[];
export type TransactionInputFieldPolicy = {
	sequence?: FieldPolicy<any> | FieldReadFunction<any>,
	txid?: FieldPolicy<any> | FieldReadFunction<any>,
	vout?: FieldPolicy<any> | FieldReadFunction<any>,
	coinbase?: FieldPolicy<any> | FieldReadFunction<any>,
	scriptSig?: FieldPolicy<any> | FieldReadFunction<any>,
	spendingTxid?: FieldPolicy<any> | FieldReadFunction<any>,
	spendingIndex?: FieldPolicy<any> | FieldReadFunction<any>,
	coin?: FieldPolicy<any> | FieldReadFunction<any>,
	spentOutput?: FieldPolicy<any> | FieldReadFunction<any>,
	transaction?: FieldPolicy<any> | FieldReadFunction<any>
};
export type TransactionOutputKeySpecifier = ('txid' | 'n' | 'value' | 'scriptPubKey' | 'spendingTxid' | 'spendingIndex' | 'coin' | 'spendingInput' | 'transaction' | TransactionOutputKeySpecifier)[];
export type TransactionOutputFieldPolicy = {
	txid?: FieldPolicy<any> | FieldReadFunction<any>,
	n?: FieldPolicy<any> | FieldReadFunction<any>,
	value?: FieldPolicy<any> | FieldReadFunction<any>,
	scriptPubKey?: FieldPolicy<any> | FieldReadFunction<any>,
	spendingTxid?: FieldPolicy<any> | FieldReadFunction<any>,
	spendingIndex?: FieldPolicy<any> | FieldReadFunction<any>,
	coin?: FieldPolicy<any> | FieldReadFunction<any>,
	spendingInput?: FieldPolicy<any> | FieldReadFunction<any>,
	transaction?: FieldPolicy<any> | FieldReadFunction<any>
};
export type UnconfirmedAddressTransactionKeySpecifier = ('timestamp' | 'txid' | 'balanceChange' | 'transaction' | UnconfirmedAddressTransactionKeySpecifier)[];
export type UnconfirmedAddressTransactionFieldPolicy = {
	timestamp?: FieldPolicy<any> | FieldReadFunction<any>,
	txid?: FieldPolicy<any> | FieldReadFunction<any>,
	balanceChange?: FieldPolicy<any> | FieldReadFunction<any>,
	transaction?: FieldPolicy<any> | FieldReadFunction<any>
};
export type UnconfirmedTransactionKeySpecifier = ('txid' | 'timestamp' | 'coin' | 'transaction' | UnconfirmedTransactionKeySpecifier)[];
export type UnconfirmedTransactionFieldPolicy = {
	txid?: FieldPolicy<any> | FieldReadFunction<any>,
	timestamp?: FieldPolicy<any> | FieldReadFunction<any>,
	coin?: FieldPolicy<any> | FieldReadFunction<any>,
	transaction?: FieldPolicy<any> | FieldReadFunction<any>
};
export type TypedTypePolicies = TypePolicies & {
	Address?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | AddressKeySpecifier | (() => undefined | AddressKeySpecifier),
		fields?: AddressFieldPolicy,
	},
	AddressBalance?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | AddressBalanceKeySpecifier | (() => undefined | AddressBalanceKeySpecifier),
		fields?: AddressBalanceFieldPolicy,
	},
	AddressBalanceChange?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | AddressBalanceChangeKeySpecifier | (() => undefined | AddressBalanceChangeKeySpecifier),
		fields?: AddressBalanceChangeFieldPolicy,
	},
	AddressCluster?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | AddressClusterKeySpecifier | (() => undefined | AddressClusterKeySpecifier),
		fields?: AddressClusterFieldPolicy,
	},
	AddressClusterBalanceChange?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | AddressClusterBalanceChangeKeySpecifier | (() => undefined | AddressClusterBalanceChangeKeySpecifier),
		fields?: AddressClusterBalanceChangeFieldPolicy,
	},
	AddressClusterDailyBalanceChange?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | AddressClusterDailyBalanceChangeKeySpecifier | (() => undefined | AddressClusterDailyBalanceChangeKeySpecifier),
		fields?: AddressClusterDailyBalanceChangeFieldPolicy,
	},
	AddressClusterDetails?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | AddressClusterDetailsKeySpecifier | (() => undefined | AddressClusterDetailsKeySpecifier),
		fields?: AddressClusterDetailsFieldPolicy,
	},
	AddressClusterRichlist?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | AddressClusterRichlistKeySpecifier | (() => undefined | AddressClusterRichlistKeySpecifier),
		fields?: AddressClusterRichlistFieldPolicy,
	},
	AddressTransaction?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | AddressTransactionKeySpecifier | (() => undefined | AddressTransactionKeySpecifier),
		fields?: AddressTransactionFieldPolicy,
	},
	Block?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | BlockKeySpecifier | (() => undefined | BlockKeySpecifier),
		fields?: BlockFieldPolicy,
	},
	BlockHash?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | BlockHashKeySpecifier | (() => undefined | BlockHashKeySpecifier),
		fields?: BlockHashFieldPolicy,
	},
	ClusterTransaction?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | ClusterTransactionKeySpecifier | (() => undefined | ClusterTransactionKeySpecifier),
		fields?: ClusterTransactionFieldPolicy,
	},
	Coin?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | CoinKeySpecifier | (() => undefined | CoinKeySpecifier),
		fields?: CoinFieldPolicy,
	},
	ConfirmedTransaction?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | ConfirmedTransactionKeySpecifier | (() => undefined | ConfirmedTransactionKeySpecifier),
		fields?: ConfirmedTransactionFieldPolicy,
	},
	Date?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | DateKeySpecifier | (() => undefined | DateKeySpecifier),
		fields?: DateFieldPolicy,
	},
	Mempool?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | MempoolKeySpecifier | (() => undefined | MempoolKeySpecifier),
		fields?: MempoolFieldPolicy,
	},
	Mutation?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | MutationKeySpecifier | (() => undefined | MutationKeySpecifier),
		fields?: MutationFieldPolicy,
	},
	OHLC?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | OHLCKeySpecifier | (() => undefined | OHLCKeySpecifier),
		fields?: OHLCFieldPolicy,
	},
	PaginatedAddressBalanceChangeResponse?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | PaginatedAddressBalanceChangeResponseKeySpecifier | (() => undefined | PaginatedAddressBalanceChangeResponseKeySpecifier),
		fields?: PaginatedAddressBalanceChangeResponseFieldPolicy,
	},
	PaginatedAddressBalanceResponse?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | PaginatedAddressBalanceResponseKeySpecifier | (() => undefined | PaginatedAddressBalanceResponseKeySpecifier),
		fields?: PaginatedAddressBalanceResponseFieldPolicy,
	},
	PaginatedAddressBlockHashtResponse?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | PaginatedAddressBlockHashtResponseKeySpecifier | (() => undefined | PaginatedAddressBlockHashtResponseKeySpecifier),
		fields?: PaginatedAddressBlockHashtResponseFieldPolicy,
	},
	PaginatedAddressClusterBalanceChangeResponse?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | PaginatedAddressClusterBalanceChangeResponseKeySpecifier | (() => undefined | PaginatedAddressClusterBalanceChangeResponseKeySpecifier),
		fields?: PaginatedAddressClusterBalanceChangeResponseFieldPolicy,
	},
	PaginatedAddressClusterDailyBalanceChangeResponse?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | PaginatedAddressClusterDailyBalanceChangeResponseKeySpecifier | (() => undefined | PaginatedAddressClusterDailyBalanceChangeResponseKeySpecifier),
		fields?: PaginatedAddressClusterDailyBalanceChangeResponseFieldPolicy,
	},
	PaginatedAddressClusterRichlistResponse?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | PaginatedAddressClusterRichlistResponseKeySpecifier | (() => undefined | PaginatedAddressClusterRichlistResponseKeySpecifier),
		fields?: PaginatedAddressClusterRichlistResponseFieldPolicy,
	},
	PaginatedAddressResponse?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | PaginatedAddressResponseKeySpecifier | (() => undefined | PaginatedAddressResponseKeySpecifier),
		fields?: PaginatedAddressResponseFieldPolicy,
	},
	PaginatedAddressTransactionResponse?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | PaginatedAddressTransactionResponseKeySpecifier | (() => undefined | PaginatedAddressTransactionResponseKeySpecifier),
		fields?: PaginatedAddressTransactionResponseFieldPolicy,
	},
	PaginatedClusterTransactionResponse?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | PaginatedClusterTransactionResponseKeySpecifier | (() => undefined | PaginatedClusterTransactionResponseKeySpecifier),
		fields?: PaginatedClusterTransactionResponseFieldPolicy,
	},
	PaginatedConfirmedTransactionResponse?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | PaginatedConfirmedTransactionResponseKeySpecifier | (() => undefined | PaginatedConfirmedTransactionResponseKeySpecifier),
		fields?: PaginatedConfirmedTransactionResponseFieldPolicy,
	},
	PaginatedOHLCResponse?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | PaginatedOHLCResponseKeySpecifier | (() => undefined | PaginatedOHLCResponseKeySpecifier),
		fields?: PaginatedOHLCResponseFieldPolicy,
	},
	PaginatedRichlistResponse?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | PaginatedRichlistResponseKeySpecifier | (() => undefined | PaginatedRichlistResponseKeySpecifier),
		fields?: PaginatedRichlistResponseFieldPolicy,
	},
	PaginatedTransactionInputResponse?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | PaginatedTransactionInputResponseKeySpecifier | (() => undefined | PaginatedTransactionInputResponseKeySpecifier),
		fields?: PaginatedTransactionInputResponseFieldPolicy,
	},
	PaginatedTransactionOutputResponse?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | PaginatedTransactionOutputResponseKeySpecifier | (() => undefined | PaginatedTransactionOutputResponseKeySpecifier),
		fields?: PaginatedTransactionOutputResponseFieldPolicy,
	},
	PaginatedUnconfirmedAddressTransactionResponse?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | PaginatedUnconfirmedAddressTransactionResponseKeySpecifier | (() => undefined | PaginatedUnconfirmedAddressTransactionResponseKeySpecifier),
		fields?: PaginatedUnconfirmedAddressTransactionResponseFieldPolicy,
	},
	PaginatedUnconfirmedTransactionResponse?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | PaginatedUnconfirmedTransactionResponseKeySpecifier | (() => undefined | PaginatedUnconfirmedTransactionResponseKeySpecifier),
		fields?: PaginatedUnconfirmedTransactionResponseFieldPolicy,
	},
	Query?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | QueryKeySpecifier | (() => undefined | QueryKeySpecifier),
		fields?: QueryFieldPolicy,
	},
	RichList?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | RichListKeySpecifier | (() => undefined | RichListKeySpecifier),
		fields?: RichListFieldPolicy,
	},
	ScriptPubKey?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | ScriptPubKeyKeySpecifier | (() => undefined | ScriptPubKeyKeySpecifier),
		fields?: ScriptPubKeyFieldPolicy,
	},
	ScriptSig?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | ScriptSigKeySpecifier | (() => undefined | ScriptSigKeySpecifier),
		fields?: ScriptSigFieldPolicy,
	},
	SendRawTransactionResult?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | SendRawTransactionResultKeySpecifier | (() => undefined | SendRawTransactionResultKeySpecifier),
		fields?: SendRawTransactionResultFieldPolicy,
	},
	Transaction?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | TransactionKeySpecifier | (() => undefined | TransactionKeySpecifier),
		fields?: TransactionFieldPolicy,
	},
	TransactionInput?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | TransactionInputKeySpecifier | (() => undefined | TransactionInputKeySpecifier),
		fields?: TransactionInputFieldPolicy,
	},
	TransactionOutput?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | TransactionOutputKeySpecifier | (() => undefined | TransactionOutputKeySpecifier),
		fields?: TransactionOutputFieldPolicy,
	},
	UnconfirmedAddressTransaction?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | UnconfirmedAddressTransactionKeySpecifier | (() => undefined | UnconfirmedAddressTransactionKeySpecifier),
		fields?: UnconfirmedAddressTransactionFieldPolicy,
	},
	UnconfirmedTransaction?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | UnconfirmedTransactionKeySpecifier | (() => undefined | UnconfirmedTransactionKeySpecifier),
		fields?: UnconfirmedTransactionFieldPolicy,
	}
};