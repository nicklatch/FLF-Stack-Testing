import type { V2_MetaFunction } from '@remix-run/node';
import { Button } from '~/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '~/components/ui/card';

type CardProps = React.ComponentProps<typeof Card>;

export const meta: V2_MetaFunction = () => {
  return [{ title: 'Remix Testing' }];
};

export default function Index({ className, ...props }: CardProps) {
  return (
    <Card className='flex flex-col items-center p-1 text-center gap-2'>
      <CardHeader>
        <CardTitle>Login</CardTitle>
        <CardDescription>Login to your FastLane Fusion Account</CardDescription>
      </CardHeader>
      <CardContent></CardContent>
      <CardFooter>
      </CardFooter>
    </Card>
  );
}
