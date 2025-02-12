import { getDonation } from '@/lib/actions/donations.actions';
import ChatComponent from '@/components/chat/ChatComponent';
import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';

export default async function DonationChatPage({ 
  params 
}: { 
  params: { donationId: string } 
}) {
  const session = await getServerSession();
  const donation = await getDonation(params.donationId);

  // Check access rights
  if (!session?.user?._id || 
      (donation.donorId._id.toString() !== session.user._id &&
       donation.beneficiaryId._id.toString() !== session.user._id)) {
    redirect('/');
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">
        Discussion - Donation de {donation.amount}€
      </h1>
      <ChatComponent 
        channelId={`donation-${donation._id}`}
        members={[
          donation.donorId._id.toString(),
          donation.beneficiaryId._id.toString()
        ]}
      />
    </div>
  );
} 