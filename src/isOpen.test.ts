import { getIsOpen } from './utilities/days';

describe('Is Open Test', function () {
  it("should tell me if it's open", () => {
    const dates = [
      { hour: 11, minute: 30, open: true },
      { hour: 11, minute: 31, open: true },
      { hour: 14, minute: 0, open: false },
      { hour: 14, minute: 1, open: false },
      { hour: 14, minute: 35, open: false },

      // [11, 31, true],
      // [14, 0, false],
      // [14, 1, false],
    ];

    for (const { hour, minute, open: shouldBeOpen } of dates) {
      const isOpen = getIsOpen(
        new Date(2023, 0, 31, hour, minute),
        '11:30',
        '14:00'
      );
      // getIsOpen(new Date(2023, 0, 31, hour, minute), '18:30', '22:00');

      expect(isOpen).toEqual(shouldBeOpen);
    }
  });

  it("should tell me if it's open 2", () => {
    const dates = [
      // { hour: 14, minute: 0, open: false },
      { hour: 10, minute: 30, open: true },

      // [11, 31, true],
      // [14, 0, false],
      // [14, 1, false],
    ];

    for (const { hour, minute, open: shouldBeOpen } of dates) {
      const isOpen = getIsOpen(
        new Date(2023, 0, 30, hour, minute),
        '10:10',
        '10:50'
      );

      expect(isOpen).toEqual(shouldBeOpen);
    }
  });
});
