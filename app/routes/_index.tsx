import type { V2_MetaFunction } from '@remix-run/node';
import { Button } from '~/components/ui/button';

export const meta: V2_MetaFunction = () => {
  return [
    { title: 'Remix Testing' },
    { name: 'description', content: 'Welcome to Remix!' },
  ];
};

export default function Index() {
  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', lineHeight: '1.8' }}>
      <Button>Button</Button>
    </div>
  );
}
