import { UserIcon } from 'lucide-react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

interface FeedbackCardProps {
  name: string;
  feedback: string;
}

export default function FeedbackCard({ name, feedback }: FeedbackCardProps) {
  return (
    <Card className="h-full w-full border-0 bg-[#F5F5F5] px-4 py-4 shadow-none sm:px-6 sm:py-4 lg:px-8 lg:py-8">
      <CardHeader className="flex flex-row items-center gap-4 p-0">
        <Avatar className="size-10 sm:size-[50px]">
          <AvatarFallback className="bg-[#F5F5F5] text-[#1E2C32]">
            <UserIcon className="size-6" />
          </AvatarFallback>
        </Avatar>
        <CardTitle className="text-[20px] font-bold leading-none text-[#1E2C32] sm:text-[24px] lg:text-[32px]">
          {name}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0 pt-6">
        <p className="whitespace-pre-line text-[14px] font-normal leading-relaxed text-[#1E2C32] sm:text-[16px] lg:text-[20px]">
          {feedback}
        </p>
      </CardContent>
    </Card>
  );
}
