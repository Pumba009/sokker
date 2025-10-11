import { DateHelper } from '../../../src/utils/date_helper';

describe('DateHelper', () => {
  // beforeAll(() => {
  //   jest.useFakeTimers();
  //   jest.setSystemTime(new Date('2025-10-04T22:21:00.000Z'));
  // });

  afterAll(() => {
    jest.useRealTimers();
  });

  describe('GetUpdateThursday', () => {
    it('jest sobota 2 dzien po czwartku, zwroc date wtecz 2 dni', () => {
      jest.useFakeTimers().setSystemTime(new Date('2025-10-04T12:21:00.000Z')); // fakujemy date i godzine

      const expectedDate = '2025-10-02T08:00:00.000Z'; //czwartek 2 pazdziernika
      const date = DateHelper.GetUpdateThursday();

      expect(expectedDate).toBe(date);
    });

    it('jest sroda dzien przed czwartkiem, zwroc date wtecz 6 dni', () => {
      jest.useFakeTimers().setSystemTime(new Date('2025-10-01T12:21:00.000Z')); // fakujemy date i godzine

      const expectedDate = '2025-09-25T08:00:00.000Z'; // czwartek 25 wrzesnia (wrzesien ma 30 dni)
      const date = DateHelper.GetUpdateThursday();

      expect(expectedDate).toBe(date);
    });

    it('jest po godzinie 23', () => {
      jest.useFakeTimers().setSystemTime(new Date('2025-10-04T23:21:00.000Z')); //sobota

      const expectedDate = '2025-10-02T08:00:00.000Z'; //czwartek 2 pazdziernika
      const date = DateHelper.GetUpdateThursday();

      expect(expectedDate).toBe(date);
    });
  });

  describe('ShouldUpdateStorage', () => {
    it('jest sobota - ostatni zapisany updated do storage 2 dni temu, powinien zwrocic false', () => {
      jest.useFakeTimers().setSystemTime(new Date('2025-10-04T08:00:00.000Z')); //sobota

      const lastUpdateDateFromStorage = '2025-10-02T08:00:00.000Z'; //ostatni zapisany update (data ostatniego updatu)
      const isUpdateDayToStorage = DateHelper.ShouldUpdateStorage(lastUpdateDateFromStorage);

      expect(isUpdateDayToStorage).toBeFalsy();
    });

    it('jest sobota - ostatni zapisany updated do storage 9 dni temu w czwartek, powinien zwrocic true', () => {
      jest.useFakeTimers().setSystemTime(new Date('2025-10-04T08:00:00.000Z')); //sobota

      const lastUpdateDateFromStorage = '2025-09-25T08:00:00.000Z'; //ostatni zapisany update (data ostatniego updatu)
      const isUpdateDayToStorage = DateHelper.ShouldUpdateStorage(lastUpdateDateFromStorage);

      expect(isUpdateDayToStorage).toBeTruthy();
    });

    it('jest sroda dzien przedupdatem - ostatni zapisany updated do storage 6 dni temu w czwartek, powinien zwrocic false', () => {
      jest.useFakeTimers().setSystemTime(new Date('2025-10-01T08:00:00.000Z')); //sroda

      const lastUpdateDateFromStorage = '2025-09-25T08:00:00.000Z'; //ostatni zapisany update (data ostatniego updatu)
      const isUpdateDayToStorage = DateHelper.ShouldUpdateStorage(lastUpdateDateFromStorage);

      expect(isUpdateDayToStorage).toBeFalsy();
    });

    it('jest sroda po godzinie 23 - ostatni zapisany updated do storage 6 dni temu w czwartek, powinien zwrocic false', () => {
      jest.useFakeTimers().setSystemTime(new Date('2025-10-01T23:15:00.000Z')); //sroda

      const lastUpdateDateFromStorage = '2025-09-25T08:00:00.000Z'; //ostatni zapisany update (data ostatniego updatu)
      const isUpdateDayToStorage = DateHelper.ShouldUpdateStorage(lastUpdateDateFromStorage);

      expect(isUpdateDayToStorage).toBeFalsy();
    });

    it('jest czwartek - ostatni zapisany updated do storage 7 dni temu, powinien zwrocic true', () => {
      jest.useFakeTimers().setSystemTime(new Date('2025-10-02T08:00:00.000Z')); //czwartek

      const lastUpdateDateFromStorage = '2025-09-25T08:00:00.000Z'; //ostatni zapisany update (data ostatniego updatu)
      const isUpdateDayToStorage = DateHelper.ShouldUpdateStorage(lastUpdateDateFromStorage);

      expect(isUpdateDayToStorage).toBeTruthy();
    });

    it('jest czwartek godzina do updatu - ostatni zapisany updated do storage 7 dni temu, powinien zwrocic true', () => {
      jest.useFakeTimers().setSystemTime(new Date('2025-10-02T07:00:00.000Z')); //czwartek

      const lastUpdateDateFromStorage = '2025-09-25T08:00:00.000Z'; //ostatni zapisany update (data ostatniego updatu)
      const isUpdateDayToStorage = DateHelper.ShouldUpdateStorage(lastUpdateDateFromStorage);

      expect(isUpdateDayToStorage).toBeFalsy();
    });
  });
});

// describe('testy', () => {
//   it('test', () => {
//     jest.useFakeTimers().setSystemTime(new Date('2025-10-04T12:21:00.000'));

//      const now = new Date();
//      now.setDate(date2.getDate() - 2);
//      now.setUTCHours(8, 0, 0);
//     expect(5).toBe( now.getDay());
//     expect('2025-10-02T08:00:00.000Z').toBe(now.toISOString());
//   });
// });

// describe("StorageManager", () => {
//   it("powinien tworzyć nowy storage jeśli pusty", () => {
//     localStorage.clear();
//     StorageManager.updateToStorage({ id: "1", name: "Jan", score: 10 });
//     const stored = JSON.parse(localStorage.getItem("players")!);
//     expect(stored.length).toBe(1);
//   });
// });
