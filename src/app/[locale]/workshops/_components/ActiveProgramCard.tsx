import React from "react";
import { Calendar, MapPin, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/routing";
import { WorkshopCardFragmentFragment } from "@/gql/graphql";

export interface ActiveProgramContent {
    aboutTitle: string;
    keyElementsTitle: string;
    facultyTitle: string;
    registrationTitle: string;
    includesNote: string;
    registerButton: string;
    brochureButton: string;
    currencySymbol: string;
}

interface ActiveProgramCardProps {
    program: WorkshopCardFragmentFragment;
    content: ActiveProgramContent;
}

export function ActiveProgramCard({ program, content }: ActiveProgramCardProps) {
    return (
        <section className="relative w-full py-32 bg-surface px-6 lg:px-16 border-t border-border">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-8">
                    <div>
                        <h2 className="font-serif text-4xl md:text-5xl text-foreground mb-4">
                            {program.title}
                        </h2>
                        <div className="flex flex-wrap items-center gap-6 font-sans text-sm font-bold uppercase tracking-widest text-accent">
                            <span className="flex items-center gap-2"><Calendar size={16} /> {program.dates}</span>
                            <span className="flex items-center gap-2"><MapPin size={16} /> {program.location}</span>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    <div className="lg:col-span-8 bg-background border border-border p-10 md:p-14 flex flex-col justify-between">
                        <div>
                            <h3 className="font-serif text-3xl text-foreground mb-6">{content.aboutTitle}</h3>
                            <p className="font-sans text-foreground/80 leading-relaxed text-lg mb-12">
                                {program.description}
                            </p>

                            <h4 className="font-serif text-2xl text-foreground mb-6">{content.keyElementsTitle}</h4>
                            <ul className="flex flex-col gap-4">
                                {program.highlights?.map((item: string | null, i: number) => (
                                    <li key={i} className="flex items-start gap-4 font-sans text-foreground/70">
                                        <div className="w-1.5 h-1.5 rounded-full bg-accent mt-2 shrink-0" />
                                        <span className="leading-relaxed">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    <div className="lg:col-span-4 flex flex-col gap-8">
                        <div className="bg-secondary text-secondary-foreground p-10 border border-border/10">
                            <div className="flex items-center gap-3 mb-6">
                                <Users size={20} className="text-accent" />
                                <h3 className="font-serif text-2xl">{content.facultyTitle}</h3>
                            </div>
                            <ul className="flex flex-col gap-4">
                                {program.scholars?.map((scholar: string | null, i: number) => (
                                    <li key={i} className="font-sans text-sm text-background/80 border-b border-background/10 pb-4 last:border-0 last:pb-0">
                                        {scholar || ''}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="bg-background border border-border p-10">
                            <h3 className="font-serif text-2xl text-foreground mb-2">{content.registrationTitle}</h3>
                            <div className="font-sans text-3xl text-foreground mb-6">{content.currencySymbol} {program.price}</div>
                            <p className="font-sans text-xs text-foreground/60 leading-relaxed mb-8">
                                {content.includesNote}
                            </p>

                            <div className="flex flex-col gap-4">
                                {program.formLink && (
                                    <Button variant="primary" asChild className="w-full uppercase tracking-widest">
                                        <Link href={program.formLink} target="_blank" rel="noopener noreferrer">
                                            {content.registerButton}
                                        </Link>
                                    </Button>
                                )}

                                {program.brochureLink && (
                                    <Button variant="outline" asChild className="w-full uppercase tracking-widest">
                                        <Link href={program.brochureLink} target="_blank" rel="noopener noreferrer" download>
                                            {content.brochureButton}
                                        </Link>
                                    </Button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section >
    );
}