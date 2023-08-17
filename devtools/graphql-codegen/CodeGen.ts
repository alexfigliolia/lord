import path from "path";
import { promisify } from "util";
import { exec } from "child_process";

export class CodeGen {
  private static execute = promisify(exec);

  public static async run() {
    await this.getSchema();
    await this.generateTypes();
  }

  private static getSchema() {
    return this.execute(
      `npx apollo service:download --endpoint=http://localhost:4000/ ${this.schemaPath}`,
    );
  }

  private static generateTypes() {
    return this.execute(
      `npx apollo codegen:generate "src/lib/schema" --localSchemaFile=${this.schemaPath} --target=typescript --tagName=gql --outputFlat --includes ${this.source}/**/*.gql.ts`,
    );
  }

  private static get source() {
    return path.resolve(process.cwd(), "src");
  }

  private static get schemaPath() {
    return path.resolve(process.cwd(), "src/lib/schema/graphql-schema.json");
  }
}
