import { WEEK_IN_MILISECONDS } from '../constants';

export class DateHelper {
  static GetUpdateThursday() {
    const today = new Date();
    today.setUTCHours(8, 0, 0, 0);
    const date = today.getDate(); // numer dnia w miesiącu np 28
    const dayOfTheWeek = today.getDay(); //0 = niedziela, 1 = poniedziałek, ..., 4 = czwartek
    const daysToBeSubtracted =
      dayOfTheWeek > 4 ? dayOfTheWeek - 4 : dayOfTheWeek < 4 ? dayOfTheWeek + 3 : 0; // dni do odliczenia

    today.setDate(date - daysToBeSubtracted); // zawsze ustawiaj czwartek

    return today.toISOString(); // czwartek - '2025-10-02T08:00:00.000Z'
  }

  static ShouldUpdateStorage(lastUpdateDayFromLocalStorage: string) {
    // lastUpdateDayFromLocalStorage = '2025-10-02T08:00:00.000Z'
    const lastUpdateThrusday = new Date(lastUpdateDayFromLocalStorage); // lastUpdateThrusday = '2025-10-02T08:00:00.000'
    const updateThrusday = new Date(this.GetUpdateThursday()); // 2025-10-02T06:00:00.000Z
    const now = new Date();

    if (updateThrusday.getTime() > lastUpdateThrusday.getTime()) {
      return updateThrusday.getTime() <= now.getTime();
    }

    console.log('Days to update: ' + this.getDaysToUpdate(lastUpdateThrusday, now));

    return false;
  }

  static getDaysToUpdate(lastUpdateDate: Date, today: Date) {
    const diff = today.getTime() - lastUpdateDate.getTime();
    return new Date(WEEK_IN_MILISECONDS - diff).getDate() - 1;
  }
}

// static ShouldUpdateStorage(lastUpdateDayFromLocalStorage: string){
//  const lastUpdateDate = new Date(lastUpdateDayFromLocalStorage);
//   console.log(`from storage: ${lastUpdateDayFromLocalStorage}`);
//   console.log(`converted from storage: ${lastUpdateDate}`);

//   const now = new Date();
//   now.setHours(8, 0, 0, 0);

//     console.log(now);
//     console.log(lastUpdateDate);

//   const diff = now.getTime() - lastUpdateDate.getTime();
//   console.log(diff);

//   console.log('Days to update: ' + this.getDaysToUpdate(diff));

//   // czy minal tydzien od ostatniego update'u lub czy kolejny czwartek po updatcie
//   return WEEK_IN_MILISECONDS - diff <= 0;
// }
