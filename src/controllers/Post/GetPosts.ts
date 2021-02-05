import { RequestContext, ResponseContext } from "../../types/ExpressTypes";
import Async from "../../middleware/Async";
import { NextFunction } from "express";
import { InlineType } from "../../utils/InlineType";
import { IPostResponse } from "../../types/ResponseTypes";
import { Post } from "../../database";

export const GetPostsFunction = Async(async (req: RequestContext, res: ResponseContext, _: NextFunction) => {
  const posts = await Post.findMany({
    include: { author: { select: { email: true, name: true, id: true } }, votes: true },
  });

  res.status(200).json(
    InlineType<IPostResponse>({ message: "Posts are received successfully!", success: true, posts })
  );
});
