import Dashboard from '@/components/Dashboard/dashboard/dashboard'
import { getSession } from '@/lib/auth';
import { redirect } from 'next/navigation';

export default async function DashboardPage() {
  const session = await getSession();

  if (!session) {
    redirect('/auth/login');
  }

  return (
    <div>
      <Dashboard
        userName={session.name}
        uniqueId={session.uniqueId}
      />
    </div>
  )
}