import type { StaffMember } from "@/lib/types";

export function StaffPanel({ staff }: { staff: StaffMember[] }) {
  if (staff.length === 0) {
    return (
      <p className="text-sm text-text-secondary py-12 text-center">
        Staff booking is coming soon — use the Services tab to book by service for now.
      </p>
    );
  }

  return (
    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {staff.map((member) => (
        <li key={member.id} className="border border-border p-5">
          <p className="font-semibold text-ink">{member.name}</p>
          {member.title && <p className="text-sm text-text-secondary">{member.title}</p>}
        </li>
      ))}
    </ul>
  );
}
