export function isInvitationPosibile(rows: HTMLTableRowElement[]) {
    let invitation = null;

    for (const row of Array.from(rows)) {
        invitation = row.querySelector<HTMLAnchorElement>('a[href*="friendlies/action/"]')?.href;
        if (invitation) {
            return true;
        }
    }

    return false;
}

export async function getInvitationLinks(
    rows: HTMLTableRowElement[],
    threshold: number,
): Promise<{ invitationLink: string; teamId: string }[]> {
    const invitationList: { invitationLink: string; teamId: string }[] = [];
    let invitation: { invitationLink: string; teamId: string } | null = null;
    for (const row of Array.from(rows)) {
        invitation = await getInvitationLink(row, threshold);
        if (invitation) {
            invitationList.push(invitation);
        }
    }

    return invitationList;
}

/**
 * Przetwarza pojedynczy wiersz tabeli - sprawdza wartość drużyny i zwraca link do zaproszenia.
 * Wyodrębnione do osobnej funkcji dla łatwiejszego testowania.
 */
async function getInvitationLink(
    row: HTMLTableRowElement,
    threshold: number,
): Promise<{ invitationLink: string; teamId: string } | null> {
    // Używamy *= zamiast ^= aby obsłużyć zarówno linki relatywne, jak i absolutne (np. w testach)
    const link = row.querySelector<HTMLAnchorElement>('a[href*="app/team/"]');
    if (!link) {
        return { invitationLink: '', teamId: '' };
    }

    const parts = link.href.split('/');
    const teamId = parts[parts.length - 1];

    try {
        const res = await fetch(`https://sokker.org/api/team/${teamId}/stats`);
        const data = await res.json();
        const teamValue = data.players.totalValue.value;

        if (teamValue <= threshold) {
            const invitation = row.querySelector<HTMLAnchorElement>('a[href*="friendlies/action/"]')?.href ?? '';

            return invitation === '' ? null : { invitationLink: invitation, teamId: teamId };
        }
    } catch (err) {
        console.error('Błąd podczas pobierania linku do zaproszenia:', err);
    }
    return null;
}

export async function sendInvitations(invitationList: { invitationLink: string; teamId: string }[]): Promise<boolean> {
    const responseStatuses: boolean[] = [];

    for (const inviteData of invitationList) {
        responseStatuses.push(await sendInvitation(inviteData.invitationLink, inviteData.teamId));
    }

    return responseStatuses.every((x) => x === true);
}

async function sendInvitation(invitationLink: string, teamId: string): Promise<boolean> {
    if (invitationLink) {
        try {
            const response = await fetch(invitationLink, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
            });
            if (!response.ok) {
                throw new Error(`Response status: ${response.status}`);
            }

            return response.ok;
            //const result = await response.json();
        } catch (err) {
            console.error(`Błąd podczas wysyłania zaproszenia dla zepołu ${teamId}:`, err);
        }
    }
    return false;
}
