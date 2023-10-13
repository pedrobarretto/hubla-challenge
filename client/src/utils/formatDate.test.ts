import { formatDate } from "./";

describe("formatDate Function", () => {
  it("formats a date string in the expected format", () => {
    const dateStr = "2023-10-20T14:30:00.000Z";

    const formattedDate = formatDate(dateStr);

    expect(formattedDate).toBe("20/10/2023 11:30");
  });

  it("pads single-digit day and month with leading zeros", () => {
    const dateStr = "2023-05-07T09:05:00.000Z";

    const formattedDate = formatDate(dateStr);

    expect(formattedDate).toBe("07/05/2023 06:05");
  });

  it("formats a date string with different values", () => {
    const dateStr = "2022-12-31T23:59:59.000Z";

    const formattedDate = formatDate(dateStr);

    expect(formattedDate).toBe("31/12/2022 20:59");
  });

  it("handles various date and time values", () => {
    const dateStr1 = "2023-02-15T08:30:00.000Z";
    const dateStr2 = "2024-10-05T18:45:00.000Z";

    const formattedDate1 = formatDate(dateStr1);
    const formattedDate2 = formatDate(dateStr2);

    expect(formattedDate1).toBe("15/02/2023 05:30");
    expect(formattedDate2).toBe("05/10/2024 15:45");
  });
});
