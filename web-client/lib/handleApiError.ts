import { NextApiResponse } from "next";

export type ApiErrorType = {
  response: any;
};

export default function handleApiError(
  error: ApiErrorType,
  res: NextApiResponse
) {
  try {
    const {
      status,
      statusText,
      data: { ErrorMessage },
    } = error.response;
    return res.status(status || 500).json({
      status,
      statusText,
      message: ErrorMessage,
    });
  } catch {
    console.log(error);
  }
}
