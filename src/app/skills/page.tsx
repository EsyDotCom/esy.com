import { redirect } from 'next/navigation';

// While the takes are being compared, /skills opens round 4's first: E's page
// with the chat simulator.
export default function SkillsIndex() {
  redirect('/skills/h/');
}
