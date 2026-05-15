// app/api/cms/[[...tool]]/page.tsx
export { metadata, viewport } from "next-sanity/studio";

import Studio from "./_studio";

export default function StudioPage() {
  return <Studio />;
}
