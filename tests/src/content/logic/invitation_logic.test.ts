/**
 * @jest-environment jsdom
 */

// Ważny wpis! musi byc podany i musi byc na samej górze pliku!
// inaczej testy beda uruchomionne bezposrednio w srodowisku 'node' (które jest domyślne),
// zamiast w środowisku przeglądarkowym (jsdom).

import {
    getInvitationLinks,
    isInvitationPosibile,
    sendInvitations,
} from '../../../../src/content/logic/invitation_logic';

describe('Invitation Logic', () => {
    let mockRows: HTMLTableRowElement[];
    const THRESHOLD = 20000000;

    beforeEach(() => {
        document.body.innerHTML = `
          <table>
             <tr id="test-row">
               <td><a href="https://sokker.org/app/team/12345">Drużyna Testowa</a></td>
               <td><a href="https://sokker.org/friendlies/action/999">Zaproś</a></td>
             </tr>
          </table>
        `;
        mockRows = Array.from(document.querySelectorAll<HTMLTableRowElement>('tr'));

        global.fetch = jest.fn();
        console.log = jest.fn();
        console.error = jest.fn();
    });

    afterEach(() => {
        jest.resetAllMocks();
    });

    describe('Method getInvitationLinks', () => {
        it('powinien zwrócic link do zaproszenia, gdy wartość drużyny jest poniżej progu', async () => {
            //Arrange
            (global.fetch as jest.Mock).mockResolvedValueOnce({
                json: async () => ({ id: 12345, players: { totalValue: { value: 10000000 } } }),
            });

            //Act
            const result = await getInvitationLinks(mockRows, THRESHOLD);

            //Assert
            expect(global.fetch).toHaveBeenCalledTimes(1);
            expect(global.fetch).toHaveBeenNthCalledWith(1, expect.stringContaining('/api/team/12345/stats'));
            expect(result).toStrictEqual([
                {
                    invitationLink: 'https://sokker.org/friendlies/action/999',
                    teamId: '12345',
                },
            ]);
        });

        it('powinien zwrócic null, gdy fetch po statystyki druzyny nie zwrócił linku do zaproszenia', async () => {
            //Arrange
            document.body.innerHTML = `
              <table>
                <tr id="test-row">
                  <td><a href="https://sokker.org/app/team/12345">Drużyna Testowa</a></td>
                  <td><a href="https://sokker.org/league/leagueID/1234">VIII Liga</a></td>
                </tr>
              </table>
            `;
            mockRows = Array.from(document.querySelectorAll<HTMLTableRowElement>('tr'));

            (global.fetch as jest.Mock).mockResolvedValueOnce({
                json: async () => ({ id: 12345, players: { totalValue: { value: 10000000 } } }),
            });

            //Act
            const result = await getInvitationLinks(mockRows, THRESHOLD);

            //Assert
            expect(global.fetch).toHaveBeenCalledTimes(1);
            expect(global.fetch).toHaveBeenNthCalledWith(1, expect.stringContaining('/api/team/12345/stats'));
            expect(result).toStrictEqual([]);
        });

        it('powinien zwrócic null, gdy wartość drużyny przekracza próg', async () => {
            //Arrange
            (global.fetch as jest.Mock).mockResolvedValueOnce({
                json: async () => ({ id: 12345, players: { totalValue: { value: 50000000 } } }),
            });

            //Act
            const result = await getInvitationLinks(mockRows, THRESHOLD);

            //Assert
            expect(global.fetch).toHaveBeenCalledTimes(1);
            expect(global.fetch).toHaveBeenNthCalledWith(1, expect.stringContaining('/api/team/12345/stats'));
            expect(result).toStrictEqual([]);
        });

        it('powinien zostac obsluzony exception, gdy metohoda fetch zwroci nieoczekiwany bład', async () => {
            //Arrange
            (global.fetch as jest.Mock).mockRejectedValue(new Error('Async error message'));

            //Act
            const result = await getInvitationLinks(mockRows, THRESHOLD);

            //Assert
            expect(global.fetch).toHaveBeenCalledTimes(1);
            expect(global.fetch).toHaveBeenNthCalledWith(1, expect.stringContaining('/api/team/12345/stats'));
            expect(console.error).toHaveBeenCalledWith(
                'Błąd podczas pobierania linku do zaproszenia:',
                new Error('Async error message'),
            );
            expect(result).toStrictEqual([]);
        });
    });

    describe('Method isInvitationPosibile ', () => {
        it('powinien zwrócic true, gdy istnieje przynajmniej 1 wiersz posiadający link do zaproszenia', async () => {
            //Arrange
            document.body.innerHTML = `
              <table id="test-table">
                <tr id="test-row-1">
                  <td><a href="https://sokker.org/app/team/12345">Drużyna Testowa</a></td>
                </tr>
                <tr id="test-row-2">
                  <td><a href="https://sokker.org/app/team/12345">Drużyna Testowa</a></td>
                  <td><a href="https://sokker.org/friendlies/action/999">Zaproś</a></td>
                </tr>
              </table>
            `;
            mockRows = Array.from(document.querySelectorAll<HTMLTableRowElement>('tr'));

            //Act
            const result = await isInvitationPosibile(mockRows);

            //Assert
            expect(result).toBeTruthy();
        });

        it('powinien zwrócic false, gdy nie istnieje ani jeden wiersz z linkiem do zaproszenia', async () => {
            //Arrange
            document.body.innerHTML = `
              <table>
                <tr id="test-row">
                  <td><a href="https://sokker.org/app/team/12345">Drużyna Testowa</a></td>
                </tr>
              </table>
            `;
            mockRows = Array.from(document.querySelectorAll<HTMLTableRowElement>('tr'));

            //Act
            const result = await isInvitationPosibile(mockRows);

            //Assert
            expect(result).toBeFalsy();
        });
    });

    describe('Method sendInvitations', () => {
        it('powinien zwrócic true, gdy wszystkie invitation link są wypełnione', async () => {
            //Arrange
            (global.fetch as jest.Mock).mockResolvedValue({
                ok: true,
                status: 200,
                json: async () => ({}),
            });

            const invitations: { invitationLink: string; teamId: string }[] = [
                { invitationLink: 'https://sokker.org/friendlies/action/999', teamId: '1234' },
                { invitationLink: 'https://sokker.org/friendlies/action/012', teamId: '8272' },
            ];

            //Act
            const result = await sendInvitations(invitations);

            //Assert
            expect(global.fetch).toHaveBeenCalledTimes(2);
            expect(global.fetch).toHaveBeenNthCalledWith(1, 'https://sokker.org/friendlies/action/999', {
                headers: { 'Content-Type': 'application/json' },
                method: 'POST',
            });
            expect(global.fetch).toHaveBeenNthCalledWith(2, 'https://sokker.org/friendlies/action/012', {
                headers: { 'Content-Type': 'application/json' },
                method: 'POST',
            });
            expect(result).toBeTruthy();
        });

        it('powinien zwrócic false, gdy fetch zwróci odpowiedz różną od ok', async () => {
            //Arrange
            (global.fetch as jest.Mock).mockResolvedValueOnce({
                ok: false,
                status: 404,
                statusText: 'Page Not Found',
                json: () => ({}),
            });

            const invitations: { invitationLink: string; teamId: string }[] = [
                { invitationLink: 'https://sokker.org/friendlies/action/999', teamId: '1234' },
            ];

            //Act
            const result = await sendInvitations(invitations);

            //Assert
            expect(global.fetch).toHaveBeenCalledTimes(1);
            expect(global.fetch).toHaveBeenNthCalledWith(1, 'https://sokker.org/friendlies/action/999', {
                headers: { 'Content-Type': 'application/json' },
                method: 'POST',
            });
            expect(console.error).toHaveBeenCalledWith(
                'Błąd podczas wysyłania zaproszenia dla zepołu 1234:',
                Error(`Response status: 404`),
            );
            expect(result).toBeFalsy();
        });

        it('powinien zwrócic false, gdy metoda fetch zwróci nieoczekiwany bład', async () => {
            //Arrange
            (global.fetch as jest.Mock).mockResolvedValue({
                ok: false,
                status: 500,
                statusText: 'Internel Server Error',
                json: () => ({}),
            });

            const invitations: { invitationLink: string; teamId: string }[] = [
                { invitationLink: 'https://sokker.org/friendlies/action/999', teamId: '1234' },
            ];

            //Act
            const result = await sendInvitations(invitations);

            //Assert
            expect(global.fetch).toHaveBeenCalledTimes(1);
            expect(global.fetch).toHaveBeenNthCalledWith(1, 'https://sokker.org/friendlies/action/999', {
                headers: { 'Content-Type': 'application/json' },
                method: 'POST',
            });
            expect(console.error).toHaveBeenCalledWith(
                'Błąd podczas wysyłania zaproszenia dla zepołu 1234:',
                Error(`Response status: 500`),
            );
            expect(result).toBeFalsy();
        });
    });
});
