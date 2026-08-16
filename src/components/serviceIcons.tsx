/** Small line-icons shown per service, keyed by category. */

function IconBase({ children }: { children: React.ReactNode }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      {children}
    </svg>
  );
}

function HeadSpaIcon() {
  return (
    <IconBase>
      <path
        d="M12 3.5c2.7 3.6 5.3 7 5.3 10.2a5.3 5.3 0 1 1-10.6 0c0-3.2 2.6-6.6 5.3-10.2Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </IconBase>
  );
}

function ScissorsIcon() {
  return (
    <IconBase>
      <circle cx="6.3" cy="6.3" r="2.2" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="6.3" cy="17.7" r="2.2" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M8.2 7.6 20 19M8.2 16.4 20 5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </IconBase>
  );
}

function ColorBrushIcon() {
  return (
    <IconBase>
      <path
        d="M14.5 3.5 20 9l-8 8-3-3-1.5 4.5L4 20l1.5-3.5L9 15l-3-3 8-8Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </IconBase>
  );
}

function SparkleIcon() {
  return (
    <IconBase>
      <path
        d="M12 3.5l1.9 5.3 5.3 1.9-5.3 1.9-1.9 5.3-1.9-5.3-5.3-1.9 5.3-1.9L12 3.5Z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
    </IconBase>
  );
}

function SpiralIcon() {
  return (
    <IconBase>
      <path
        d="M12 20c-4.4 0-8-3.4-8-7.6A6.9 6.9 0 0 1 11 5.7a5.4 5.4 0 0 1 5.6 5.4 4.2 4.2 0 0 1-4.3 4.2 3.3 3.3 0 0 1-3.4-3.3 2.6 2.6 0 0 1 2.6-2.6"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </IconBase>
  );
}

function SmoothingIcon() {
  return (
    <IconBase>
      <path
        d="M4 8.5c1.8-1.8 2.7 1.8 4.5 0s2.7-1.8 4.5 0 2.7 1.8 4.5 0"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path d="M4 16h16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </IconBase>
  );
}

function RazorIcon() {
  return (
    <IconBase>
      <rect x="4.5" y="10" width="11" height="4" rx="1" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M15.5 12H19M9 10V7a2 2 0 0 1 2-2h1a2 2 0 0 1 2 2v3"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </IconBase>
  );
}

function TreatmentIcon() {
  return (
    <IconBase>
      <path
        d="M12 19.5s-6.5-4.1-8.6-8.2A4.6 4.6 0 0 1 12 6.3a4.6 4.6 0 0 1 8.6 5c-2.1 4.1-8.6 8.2-8.6 8.2Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </IconBase>
  );
}

function BlowDryerIcon() {
  return (
    <IconBase>
      <path
        d="M4.5 9a5 5 0 0 1 5-5h2.5a3 3 0 0 1 3 3v1H18l2 2.5-2 1.5h-3.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      <path d="M9.5 12 7 19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </IconBase>
  );
}

function StarIcon() {
  return (
    <IconBase>
      <path
        d="M12 3.5l2.6 5.5 6 .7-4.4 4.1 1.2 5.9-5.4-3-5.4 3 1.2-5.9-4.4-4.1 6-.7L12 3.5Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </IconBase>
  );
}

const CATEGORY_ICONS: Record<string, () => React.JSX.Element> = {
  "Head Spa": HeadSpaIcon,
  Haircut: ScissorsIcon,
  Color: ColorBrushIcon,
  Highlights: SparkleIcon,
  Perm: SpiralIcon,
  "Keratin / Smoothing": SmoothingIcon,
  Men: RazorIcon,
  Treatments: TreatmentIcon,
  "The Others": BlowDryerIcon,
  "Junior services": StarIcon,
};

export function ServiceCategoryIcon({ category }: { category: string }) {
  const Icon = CATEGORY_ICONS[category] ?? SparkleIcon;
  return <Icon />;
}
