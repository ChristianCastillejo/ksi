export type TenantId = "ksi" | "delhi" | "srinagar";


export function getTenant(domain: string | null | undefined): TenantId {
    if (!domain) return "srinagar";

    const normalizedDomain = domain.toLowerCase();

    if (normalizedDomain.includes("kashmirshaivainstitute")) {
        return "ksi";
    }

    if (normalizedDomain.includes("ishwarashram.in") || normalizedDomain.includes("delhi")) {
        return "delhi";
    }

    return "srinagar";
}

export function getTenantName(tenant: TenantId): string {
    const names: Record<TenantId, string> = {
        ksi: "Kashmir Shaiva Institute",
        delhi: "Ishwar Ashram Delhi",
        srinagar: "Ishwar Ashram Trust",
    };
    return names[tenant];
}