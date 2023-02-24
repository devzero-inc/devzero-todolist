import handleApiError from "@/lib/handleApiError";
import axios from "axios";
import { AxiosResponse } from "axios";
import { NextApiRequest, NextApiResponse } from "next";

const createUser = () => async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const response: AxiosResponse = await axios.post(
      `http://${process.env.API_HOST || "localhost"}:5000/users`,
      req.body
    );
    res.status(response.status || 200).json(response.data);
  } catch (error: any) {
    console.log(error);
    handleApiError(error, res);
  }
};

export default createUser();
