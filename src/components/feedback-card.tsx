import { SquareUserRoundIcon } from 'lucide-react';

interface FeedbackCardProps {
  name: string;
  feedback: string;
}

export default function FeedbackCard({ name, feedback }: FeedbackCardProps) {
  return (
    <figure className="flex w-[300px] shrink-0 flex-col bg-[#f5f5f5] p-6 sm:w-[390px] sm:p-8">
      <div className="flex items-center gap-3.5">
        <SquareUserRoundIcon
          className="size-9 shrink-0 text-[#a3a3a3]"
          strokeWidth={1.6}
        />
        <figcaption className="text-2xl font-bold leading-none text-[#1E2C32] sm:text-[28px]">
          {name}
        </figcaption>
      </div>
      <blockquote className="mt-5 text-[15px] leading-relaxed text-[#5b5b5b] sm:mt-6 sm:text-base">
        &ldquo;{feedback}&rdquo;
      </blockquote>
    </figure>
  );
}
