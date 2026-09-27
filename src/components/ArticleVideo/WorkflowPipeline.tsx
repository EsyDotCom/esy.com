/* The workflow a video walks through, as numbered stages in a row (the last
 * one filled). Moved out of the old video page (src/app/engineer/[slug]/
 * client.tsx, retired 2026-09-27) so the framed video page keeps it for
 * articles that declare `stages`; styled by class instead of inline, and it
 * scrolls sideways on a phone rather than squeezing. */

import type { WorkflowStage } from '@/data/agentic-videos';

export default function WorkflowPipeline({ stages }: { stages: WorkflowStage[] }) {
  return (
    <section className="av-pipeline" aria-label="Workflow pipeline">
      <p className="av-pipeline-label">Workflow pipeline</p>
      <ol className="av-pipeline-steps">
        {stages.map((stage, i) => (
          <li key={stage.label} className={i === stages.length - 1 ? 'av-pipeline-step av-pipeline-step--last' : 'av-pipeline-step'}>
            <span className="av-pipeline-num" aria-hidden="true">{i + 1}</span>
            <span className="av-pipeline-name">{stage.label}</span>
            {stage.sublabel && <span className="av-pipeline-sub">{stage.sublabel}</span>}
          </li>
        ))}
      </ol>
    </section>
  );
}
