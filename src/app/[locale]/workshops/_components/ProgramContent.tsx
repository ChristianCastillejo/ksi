import React from "react";
import { WaitlistSection, WaitlistContent } from "./WaitlistSection";
import { ActiveProgramCard, ActiveProgramContent } from "./ActiveProgramCard";
import { WorkshopCardFragmentFragment } from "@/gql/graphql";

interface ProgramContentProps {
    promise: Promise<WorkshopCardFragmentFragment | null>;
    waitlistContent: WaitlistContent;
    activeProgramContent: ActiveProgramContent;
}

export async function ProgramContent({ promise, waitlistContent, activeProgramContent }: ProgramContentProps) {
    const program = await promise;

    if (!program) {
        return <WaitlistSection content={waitlistContent} />;
    }

    return <ActiveProgramCard program={program} content={activeProgramContent} />;
}