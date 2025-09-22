export class DateHelper {
  static GetLastUpdateThursday() {
    const now = new Date();
    const date = now.getDate(); // numer dnia w miesiącu np 28
    let daysToBeSubtracted = 0; // dni do odliczenia
    const weekendDay = now.getDay(); //1-poniedziałek,..

    if (weekendDay > 4) {
      daysToBeSubtracted = weekendDay - 4;
      //console.log(weekendDay - 4);
    } else if (weekendDay < 4) {
      daysToBeSubtracted = weekendDay + 4;
    }

    now.setDate(date - daysToBeSubtracted); // zawsze ustawiaj czwartek
    now.setHours(12, 0, 0, 0);

    return now; // czwartek godzina 12:00 (10:00 UTC+0)
  }
}
