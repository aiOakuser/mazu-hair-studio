import type { DayHours } from "@/lib/types";

export function HoursTable({ hours }: { hours: DayHours[] }) {
  return (
    <table className="text-sm w-full">
      <tbody>
        {hours.map((row) => (
          <tr key={row.day} className="border-b border-border last:border-b-0">
            <th scope="row" className="py-2 pr-6 text-left font-medium text-ink">
              {row.day}
            </th>
            <td className="py-2 text-text-secondary">
              {row.open && row.close ? `${row.open} - ${row.close}` : "Closed"}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
