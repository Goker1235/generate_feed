/* import path from "path";
import validator from "xsd-schema-validator";

export function validateFeed(xml: string): Promise<{ ok: boolean; errors?: any }> {
  const xsdPath = path.join(process.cwd(), "src/xsd/feed.xsd");

  return new Promise((resolve) => {
    validator.validateXML(
      xml,
      xsdPath,
      { 
        noJavaHelper: true,
    callback: (err, result) => {
        if (err) {
          resolve({ ok: false, errors: err });
          return;
        }

        if (!result.valid) {
          resolve({ ok: false, errors: result.messages });
          return;
        }

        resolve({ ok: true });
      }
    };
}
*/