"use client";

import { type Infographic } from "@/data/infographics";
import InfographicArtifactWrapper from "@/components/InfographicArtifact/InfographicArtifactWrapper";

interface Props {
  infographic: Infographic;
}

export default function InfographicDetailClient({ infographic }: Props) {
  return <InfographicArtifactWrapper infographic={infographic} />;
}
