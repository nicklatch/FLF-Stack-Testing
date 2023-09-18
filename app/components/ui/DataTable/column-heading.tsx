export interface ColumnHeadingProps {
  headingText: string;
}

export function ColumnHeading({ headingText }: ColumnHeadingProps) {
  return <div className="font-bold text-left">{headingText}</div>;
}
