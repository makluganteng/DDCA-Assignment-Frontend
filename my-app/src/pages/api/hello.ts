// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { AdminLogin } from "@/schema/admin.schema";
import { Subscriber } from "@/schema/subscriber.schema";
import { BuyVoucher } from "@/schema/voucher.schema";
import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";
import config from "next/config";

type Data = {
  name: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  res.status(200).json({ name: "John Doe" });
}

export const postData = async (data: FormData) => {
  try {
    const url =
      "http://testdb.us-east-1.elasticbeanstalk.com/api/gift/createGift";
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        "Access-Control-Allow-Origin": "*", // Required for CORS support to work
      },
    };

    if (process.env.NODE_ENV === "development") {
      const result = await axios.post(
        "http://localhost:8000/api/gift/createGift",
        data,
        config
      );
      return result;
    }
    const result = await axios.post(url, data, config);

    return result;
  } catch (e) {
    throw new Error("Failed");
  }
};

export const getGifts = async () => {
  try {
    const url = "http://testdb.us-east-1.elasticbeanstalk.com/api/gift";
    const config = {
      headers: {
        "Access-Control-Allow-Origin": "*", // Required for CORS support to work
      },
    };
    if (process.env.NODE_ENV === "development") {
      const result = await axios.get("http://localhost:8000/api/gift", config);
      return result;
    }
    const result = await axios.get(url, config);
    return result;
  } catch (e) {
    throw new Error("Failed");
  }
};

export const deleteGift = async (id: string) => {
  try {
    const url = `http://testdb.us-east-1.elasticbeanstalk.com/api/gift/deleteVoucher/${id}`;
    const config = {
      headers: {
        "Access-Control-Allow-Origin": "*", // Required for CORS support to work
      },
    };
    if (process.env.NODE_ENV === "development") {
      const result = await axios.post(
        `http://localhost:8000/api/gift/deleteVoucher/${id}`,
        config
      );
      return result;
    }
    const result = await axios.delete(url, config);
    return result;
  } catch (e) {
    throw new Error("Failed");
  }
};

export const updateGift = async (id: string, data: FormData) => {
  try {
    const url = `http://testdb.us-east-1.elasticbeanstalk.com/api/gift/updateVoucher/${id}`;
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        "Access-Control-Allow-Origin": "*", // Required for CORS support to work
      },
    };
    if (process.env.NODE_ENV === "development") {
      const result = await axios.post(
        `http://localhost:8000/api/gift/updateVoucher/${id}`,
        data,
        config
      );
      return result;
    }
    const result = await axios.put(url, data, config);
    return result;
  } catch (e) {
    throw new Error("Failed");
  }
};

export const adminLogin = async (data: AdminLogin) => {
  try {
    const url = `http://testdb.us-east-1.elasticbeanstalk.com/api/admin/login`;
    const config = {
      headers: {
        "Access-Control-Allow-Origin": "*", // Required for CORS support to work
      },
    };

    if (process.env.NODE_ENV === "development") {
      const result = await axios.post(
        `http://localhost:8000/api/admin/login`,
        data,
        config
      );
      return result;
    }
    const result = await axios.post(url, data, config);
    return result;
  } catch (e) {
    throw new Error("Failed");
  }
};

export const getCategory = async () => {
  try {
    const url = `http://testdb.us-east-1.elasticbeanstalk.com/api/gift/getCategory`;
    const config = {
      headers: {
        "Access-Control-Allow-Origin": "*", // Required for CORS support to work
      },
    };

    if (process.env.NODE_ENV === "development") {
      const result = await axios.get(
        `http://localhost:8000/api/gift/getCategory`,
        config
      );
      return result;
    }

    const result = await axios.get(url, config);
    return result;
  } catch (e) {
    throw new Error("Failed");
  }
};

export const getVoucher = async (id: string) => {
  try {
    const url = `http://testdb.us-east-1.elasticbeanstalk.com/api/gift/getVoucher/${id}`;
    const config = {
      headers: {
        "Access-Control-Allow-Origin": "*", // Required for CORS support to work
      },
    };
    if (process.env.NODE_ENV === "development") {
      const result = await axios.get(
        `http://localhost:8000/api/gift/getVoucher/${id}`,
        config
      );
      return result;
    }
    const result = await axios.get(url, config);
    return result;
  } catch (e) {
    throw new Error("Failed");
  }
};

export const buyVoucher = async (data: BuyVoucher) => {
  try {
    const url = `http://testdb.us-east-1.elasticbeanstalk.com/api/gift/buyVoucher`;
    const config = {
      headers: {
        "Access-Control-Allow-Origin": "*", // Required for CORS support to work
      },
    };
    if (process.env.NODE_ENV === "development") {
      const result = await axios.post(
        `http://localhost:8000/api/gift/buyVoucher`,
        data,
        config
      );
      return result;
    }
    const result = await axios.post(url, data, config);
    return result;
  } catch (e) {
    throw new Error("Failed");
  }
};

export const getNewest = async () => {
  try {
    const url = `http://testdb.us-east-1.elasticbeanstalk.com/api/gift/getVoucherNewest`;
    const config = {
      headers: {
        "Access-Control-Allow-Origin": "*", // Required for CORS support to work
      },
    };
    if (process.env.NODE_ENV === "development") {
      const result = await axios.get(
        `http://localhost:8000/api/gift/getVoucherNewest`,
        config
      );
      return result;
    }
    const result = await axios.get(url, config);
    return result;
  } catch (e) {
    throw new Error("Failed");
  }
};

export const getVoucherByCategory = async (category: string) => {
  try {
    const url = `http://testdb.us-east-1.elasticbeanstalk.com/api/gift/getCategoryByName/${category}`;
    const config = {
      headers: {
        "Access-Control-Allow-Origin": "*", // Required for CORS support to work
      },
    };
    if (process.env.NODE_ENV === "development") {
      const result = await axios.get(
        `http://localhost:8000/api/gift/getCategoryByName/${category}`,
        config
      );
      return result;
    }
    const result = await axios.get(url, config);
    return result;
  } catch (e) {
    throw new Error("Failed");
  }
};

export const addSubscriber = async (data: Subscriber) => {
  try {
    const url = `http://testdb.us-east-1.elasticbeanstalk.com/api/subscription/addSubscription`;
    const config = {
      headers: {
        "Access-Control-Allow-Origin": "*", // Required for CORS support to work
      },
    };
    if (process.env.NODE_ENV === "development") {
      const result = await axios.post(
        `http://localhost:8000/api/subscription/addSubscription`,
        data,
        config
      );
      return result;
    }
    const result = await axios.post(url, config);
    return result;
  } catch (e) {
    throw new Error("Failed");
  }
};
