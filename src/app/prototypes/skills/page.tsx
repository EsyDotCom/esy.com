import { redirect } from 'next/navigation';

// The skills prototypes open on H, the take that shipped as /skills.
export default function SkillsPrototypesIndex() {
  redirect('/prototypes/skills/h/');
}
