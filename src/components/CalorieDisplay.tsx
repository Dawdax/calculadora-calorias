interface CalorieDisplayProps {
  calories: number;
  text: string;
  color: string;
}

export default function CalorieDisplay({
  calories,
  text,
  color,
}: CalorieDisplayProps) {
  return (
    <>
      <p className="text-white font-bold rounded-full grid grid-cols-1 text-center">
        <span className={`text-4xl pb-2  ${color}`}> {calories}</span>
        {text}
      </p>
    </>
  );
}
