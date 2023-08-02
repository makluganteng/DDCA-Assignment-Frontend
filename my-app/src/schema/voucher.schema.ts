export interface GetVoucher {
  id: number;
  gift_card_name: string;
  gift_card_price: number;
  gift_card_image_url: string;
  category_name: string;
}

export interface BuyVoucher {
  email: string;
  voucherName: string;
  voucherId: number;
}
