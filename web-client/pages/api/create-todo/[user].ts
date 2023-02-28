import handleApiError from "@/lib/handleApiError";
import axios from "axios";
import { AxiosResponse } from "axios";
import { NextApiRequest, NextApiResponse } from "next";

const createTodo = () => async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const {
      query: { user },
    } = req;
    const response: AxiosResponse = await axios.post(
      `${process.env.TODOLIST_APP_SVC_HOSTPORT || "http://localhost:6000"}/users/${user}/todos`,
      req.body
    );
    res.status(response.status || 200).json(response.data);
  } catch (error: any) {
    console.log(error);
    handleApiError(error, res);
  }
};

export default createTodo();
