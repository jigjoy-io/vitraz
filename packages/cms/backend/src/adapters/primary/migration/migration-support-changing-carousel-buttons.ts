import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, ScanCommand, UpdateCommand } from '@aws-sdk/lib-dynamodb';
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { errorHandler } from '@packages/apigw-error-handler';

const client = new DynamoDBClient({});
const ddbDocClient = DynamoDBDocumentClient.from(client);
const tableName = process.env.PAGE_TABLE;

export async function addButtonsFieldMigrationHandler(
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> {
  try {
    const scanParams = {
      TableName: tableName,
    };

    const scanResult = await ddbDocClient.send(new ScanCommand(scanParams));
    const items = scanResult.Items || [];

    for (const item of items) {
      const config = item.config?.L || [];
      let needsUpdate = true;

      config.forEach((configItem: any) => {
        if (configItem.L?.some((field: any) => field.S === "buttons")) {
          needsUpdate = false;
        }
      });

      if (needsUpdate) {
        config.push({
          L: [
            { S: "buttons" }
          ],
        });

        const updateParams = {
          TableName: tableName,
          Key: { id: item.id },
          UpdateExpression: 'SET #config = :config',
          ExpressionAttributeNames: {
            '#config': 'config',
          },
          ExpressionAttributeValues: {
            ':config': config,
          },
        };

        await ddbDocClient.send(new UpdateCommand(updateParams));
      }
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Migration completed successfully' }),
    };
  } catch (error) {
    return errorHandler(error);
  }
}
