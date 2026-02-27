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
    <Card className="h-full w-full border-0 bg-[#F5F5F5] px-10 py-[30px] shadow-none">
      <CardHeader className="flex flex-row items-center gap-4 p-0">
        <Avatar className="size-[50px]">
          <AvatarFallback className="bg-[#F5F5F5] text-[#1E2C32]">
            <UserIcon className="size-6" />
          </AvatarFallback>
        </Avatar>
        <CardTitle className="text-[32px] font-bold leading-none text-[#1E2C32]">
          {name}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0 pt-6">
        <p className="whitespace-pre-line text-[20px] font-normal leading-relaxed text-[#1E2C32]">
          {feedback}
        </p>
      </CardContent>
    </Card>
  );
}
