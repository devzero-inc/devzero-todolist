import handleApiError from "@/lib/handleApiError";
import axios from "axios";
import { AxiosResponse } from "axios";
import { NextApiRequest, NextApiResponse } from "next";

const getTodo = () => async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const {
      query: { user },
    } = req;
    const response: AxiosResponse = await axios.get(
      `${process.env.TODOLIST_APP_SVC_HOSTPORT || "http://localhost:6000"}/users/${user}/todos`
    );
    res.status(response.status || 200).json(response.data);
  } catch (error: any) {
    console.log(error);
    handleApiError(error, res);
  }
};

export default getTodo();
