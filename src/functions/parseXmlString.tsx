export function ParseXmlString(xmlString: string): Record<string, string> {
  const regex =
    /<componentData id="([^"]+)"><data id="text" value="([^"]+)"\/><\/componentData>/g;
  let match;
  const result: Record<string, string> = {};

  while ((match = regex.exec(xmlString)) !== null) {
    const [, componentId, value] = match;
    result[componentId] = value;
  }

  return result;
}

export default ParseXmlString;
