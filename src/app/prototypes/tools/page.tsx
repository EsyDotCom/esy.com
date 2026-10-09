import { redirect } from 'next/navigation';

// The bare /prototypes/tools opens the first take.
export default function ToolsProtoIndex() {
  redirect('/prototypes/tools/directory/');
}
