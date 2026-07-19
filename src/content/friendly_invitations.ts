import { getInvitationLinks, sendInvitations, isInvitationPosibile } from './logic/invitation_logic';

let invitationThreshold: number = 20000000;

async function fetchData(element: HTMLElement) {
    const rows = element.querySelectorAll<HTMLTableRowElement>('tr') as NodeListOf<HTMLTableRowElement>;
    if (!rows) {
        return;
    }

    const trimedRows = Array.from(rows).slice(1, rows.length - 1); // remove header and navigator rows
    if (!isInvitationPosibile(trimedRows)) {
        addMesaageToPage('Brak Ogłoszeń');
        return;
    }

    const invitationList = await getInvitationLinks(trimedRows, invitationThreshold);
    if (invitationList.length <= 0) {
        addMesaageToPage('Brak Ogłoszeń');
        return;
    }

    await addInvitationButton(invitationList);
}

function addMesaageToPage(message: string) {
    const ul = addRightMenuItemToPanel();
    if (!ul) {
        return;
    }

    const div = document.createElement('div');
    const span = document.createElement('span');
    span.textContent = message;
    span.style.fontWeight = 'bold';

    div.appendChild(span);
    ul.lastChild?.appendChild(div);
}

/**
 * Dodaje przycisk "Wyślij zaproszenia" do nagłówka panelu.
 */
async function addInvitationButton(invitationList: { invitationLink: string; teamId: string }[]) {
    const ul = addRightMenuItemToPanel();
    if (!ul) {
        return;
    }

    const div = document.createElement('div');
    const span = document.createElement('span');

    span.textContent = 'Wyślij zaproszenia';
    span.style.cursor = 'pointer';
    span.style.textDecoration = 'underline';

    span.addEventListener('click', async () => {
        span.style.color = 'blue';
        const isSuccess = await sendInvitations(invitationList);
        if (isSuccess) {
            span.textContent = 'Zaproszenia dostarczone';
            span.style.color = 'green';
        }
    });

    div.appendChild(span);
    ul.lastChild?.appendChild(div);
}

function addRightMenuItemToPanel() {
    const panelHeading = document.querySelector('.panel-heading');
    if (!panelHeading) {
        return;
    }

    const ul = panelHeading.querySelector('ul');
    if (!ul) {
        return;
    }

    const li = document.createElement('li');

    ul.style.display = 'flex';
    li.style.marginLeft = 'auto';
    li.style.paddingTop = '5px';
    li.style.fontWeight = 'bold';

    ul.appendChild(li);

    return ul;
}

export function waitForElement(selector: string, callback: (elem: HTMLElement) => void) {
    const observer = new MutationObserver((mutations, obs) => {
        const element = document.querySelector<HTMLElement>(selector);
        if (!element) {
            return;
        }

        const tr = element.querySelector('tr');
        if (tr) {
            obs.disconnect();
            callback(element);
            return;
        }
    });

    observer.observe(document.body, { childList: true, subtree: true });
}

// Inicjalizacja: pobierz ustawienia i uruchom obserwatora
if (typeof chrome !== 'undefined' && chrome.storage && chrome.storage.local) {
    chrome.storage.local.get('invitationThreshold', (result) => {
        if (result.invitationThreshold) {
            invitationThreshold = Number(result.invitationThreshold);
        }
        waitForElement('table.table.table-striped tbody', (elem) => {
            fetchData(elem);
        });
    });
}
