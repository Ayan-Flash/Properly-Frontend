import PropertyDetailPage from '@/components/Dashboard/property/[id]/id';

export default async function PropertyDetailRoute({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    return <PropertyDetailPage params={{ id }} />;
}

