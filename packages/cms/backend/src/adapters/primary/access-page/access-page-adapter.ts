import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { ValidationError } from "@errors/validation-error";
import { errorHandler } from "@packages/apigw-error-handler";
import { ReturnPageDto } from "@dto/page/page";
import Responses from "@utils/api-responses";
import { accessPageUseCase } from "@use-cases/access-page";
import { isValidUUID } from "@utils/is-valid-uuid";

/**
 * Access to production page
 * @param id page id
 * @returns
 */
export async function accessPageHandler({
  pathParameters,
}: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> {
  try {
    if (!pathParameters || !pathParameters?.id)
      throw new ValidationError("no id in the path parameters of the event");

    const { id } = pathParameters;

    if (!isValidUUID(id)) {
      return Responses._404({ message: `Invalid UUID: ${id}` });
    }

    console.log(`requested page: ${id}`);

    const page: ReturnPageDto = await accessPageUseCase(id);

    console.log(`page fetched: ${JSON.stringify(page)}`);

    return Responses._200(page);
  } catch (error) {
    return errorHandler(error);
  }
}
