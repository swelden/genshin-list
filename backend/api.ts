import "server-only";

import * as genshindb from "genshin-db";
import * as z from "zod";

interface MyRequest {
  folder: `${genshindb.Folder}`;
  query: string;
  data?: genshindb.QueryOptions;
}

/**
 * Ensures all calls to genshin-db go through data validation.
 */
export function api<TSchema extends z.ZodTypeAny>(
  requestData: MyRequest,
  responseSchema: TSchema,
) {
  const response = genshindb[requestData.folder](
    requestData.query,
    requestData.data,
  );

  // https://github.com/colinhacks/zod/issues/2153#issuecomment-1457357067
  return responseSchema.parse(response) as z.infer<TSchema>;
}
