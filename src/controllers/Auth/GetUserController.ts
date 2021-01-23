import { RequestContext, ResponseContext } from "../../types/ExpressTypes";
import Async from "../../middleware/Async";
import { NextFunction } from "express";
import { InlineType } from "../../utils/InlineType";
import { ResponseJson } from "../../types/ResponseJsonType";
import _ from "lodash";

export const GetUserFunction = Async(async (req: RequestContext, res: ResponseContext, next: NextFunction) => {
  const filteredUser = _.omit(req.user, ["password", "isActivated"]);

  res.status(201).json(
    InlineType<ResponseJson>({ message: "User info is received successfully!", success: true, user: filteredUser })
  );
});
