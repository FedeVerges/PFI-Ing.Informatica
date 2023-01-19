export interface NotificationDto {
  type: string;
  transactionHash?: string;
  status?: string;
  networkId?: number;
  connected?: boolean;
  blockchainName?: string;
}
